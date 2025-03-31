<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed'
        ]);

        User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return response()->json([
            "status" => true,
            'message' => 'Successfully created user!'
        ]);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                "status" => false,
                'message' => 'Invalid login details'
            ]);
        }

        $user = Auth::user();
        $token = $user->createToken('my_token')->plainTextToken;

        return response()->json([
            "status" => true,
            'message' => 'Successfully login',
            'token' => $token
        ]);
    }

    public function user(Request $request)
    {
        return new UserResource($request->user());
    }


    public function logout()
    {
        Auth::logout();
        return response()->json([
            "status" => true,
            'message' => 'Successfully logout'
        ]);
    }
}