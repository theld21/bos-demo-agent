<?php

namespace App\Modules\Core\Services;

use App\Modules\Core\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function login(array $credentials): array
    {
        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $tokenExpiration = $credentials['remember_me'] ?? false
            ? now()->addDays(30)
            : now()->addDays(3);

        $accessToken = $user->createToken('access_token', ['*'], $tokenExpiration)->plainTextToken;
        $refreshToken = $user->createToken('refresh_token', ['*'], now()->addDays(30))->plainTextToken;

        return [
            'user' => $user,
            'access_token' => $accessToken,
            'refresh_token' => $refreshToken,
        ];
    }

    public function logout(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    public function logoutAllDevices(User $user): void
    {
        $user->tokens()->delete();
    }

    public function refreshToken(User $user): array
    {
        $user->currentAccessToken()->delete();

        $newToken = $user->createToken('access_token', ['*'], now()->addDays(3))->plainTextToken;

        return [
            'access_token' => $newToken,
        ];
    }
}
