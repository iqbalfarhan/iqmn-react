<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    public function __construct()
    {
        if (!auth()->user()->can('manage role')) {
            abort(403);
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('role/index', [
            'roles' => RoleResource::collection(Role::where('name', '!=', 'superadmin')->with('permissions')->get()),
            'permissions' => Permission::pluck('name')
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            "name" => 'required',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,name'
        ], [
            "name.required" => 'Nama role harus diisi',
            'permissions.required' => 'Harus pilih minimal satu permission',
            'permissions.*.exists' => 'Permission tidak ditemukan'
        ]);

        $role = Role::create($data);
        $role->syncPermissions($data['permissions']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        return Inertia::render('role/detail', [
            'role' => $role->load('permissions')
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role)
    {
        $data = $request->validate([
            "name" => 'required',
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,name'
        ], [
            "name.required" => 'Nama role harus diisi',
            'permissions.required' => 'Harus pilih minimal satu permission',
            'permissions.*.exists' => 'Permission tidak ditemukan'
        ]);

        $role->update($data);
        $role->syncPermissions($data['permissions']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        $role->delete();
    }
}
