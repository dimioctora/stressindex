<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\User;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
        $company = Company::first();
        $admin = User::first() ?? [
            'name' => 'Budi Bagus Prasetyo',
            'email' => 'founder@roeindonesia.co.id'
        ];

        return response()->json([
            'company' => $company,
            'admin' => $admin
        ]);
    }
}
