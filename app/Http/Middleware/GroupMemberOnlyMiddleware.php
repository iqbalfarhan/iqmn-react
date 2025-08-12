<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GroupMemberOnlyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        $group = $request->group;

        // Check if the user meets the allowed criteria
        // $isMember = $user->members()->where('group_id', $group->id)->exists();
        // $isGroupOwner = $group->user_id == $user->id;
        // $isSuperadmin = $user->hasRole('superadmin');

        $hasAccess = collect([
            $user->members()->where('group_id', $group->id)->exists(), // member
            $group->user_id === $user->id, // owner
            $user->hasRole('superadmin'), // superadmin
        ])->contains(true);

        if (!$hasAccess) {
            abort(403, 'You are not a member of this group.');
        }

        return $next($request);

    }
}
