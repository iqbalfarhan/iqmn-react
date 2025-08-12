<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialiteCallbackController extends Controller
{
    public function googleRedirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function githubRedirect()
    {
        return Socialite::driver('github')->redirect();
    }

    public function githubCallback()
    {
        $githubUser = Socialite::driver('github')->user();

        $user = User::updateOrCreate([
            'email' => $githubUser->email,
        ], [
            'github_id' => $githubUser->id,
            'name' => $githubUser->name,
            'github_token' => $githubUser->token,
            'github_refresh_token' => $githubUser->refreshToken,
            'photo' => $githubUser->getAvatar(),
            'last_login' => now()
        ]);

        if($user->getRoleNames()->count() == 0) {
            $user->assignRole('pelajar');
        }
    
        Auth::login($user);
    
        return redirect('/dashboard');
    }

    public function googleCallback()
    {
        $googleUser = Socialite::driver('google')->user();

        $user = User::updateOrCreate([
            'email' => $googleUser->email,
        ], [
            'google_id' => $googleUser->id,
            'name' => $googleUser->name,
            'google_token' => $googleUser->token,
            'google_refresh_token' => $googleUser->refreshToken,
            'photo' => $googleUser->getAvatar(),
            'last_login' => now()
        ]);

        if($user->getRoleNames()->count() == 0) {
            $user->assignRole('pelajar');
        }
    
        Auth::login($user);
    
        return redirect('/dashboard');
    }
}
