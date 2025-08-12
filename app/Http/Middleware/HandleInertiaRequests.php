<?php

namespace App\Http\Middleware;

use App\Models\Tugas;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'inspire' => Inspiring::quotes()->random(),
            'auth' => [
                'user' => $request->user(),
                'roles' => $request->user()?->getRoleNames()->toArray() ?? [],
                'permissions' => $request->user()?->hasRole("superadmin") ? Permission::pluck('name')->toArray() :$request->user()?->getAllPermissions()->pluck('name')->toArray(),
                'tugas_count' => $this->getTugasCount(),
                'unpaid' => $request->user()?->pembayarans()->count(),
            ],
            'following' => $request->user()?->members ?? [],
            'notifikasis' => $request->user()?->notifikasis ?? [],
            'ziggy' => fn (): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    public function getTugasCount(): Int
    {
        $user = auth()->user();

        if ($user) {
            $group_ids = $user->members->pluck('id')->toArray();
            $tugas_count = Tugas::whereAvailable(true)->whereIn('group_id', $group_ids)->count();

            return $tugas_count;
        }
        return 0;
    }
}
