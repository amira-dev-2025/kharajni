<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email'        => 'required|email',
            'mot_de_passe' => 'required',
            'role'        => 'required',
        ]);


        if ($request->role === 'admin') {

            $admin = Admin::where('email', $request->email)->first();

            if (
                !$admin ||
                !Hash::check($request->mot_de_passe, $admin->mot_de_passe)
            ) {
                return response()->json([
                    'message' => 'Email ou mot de passe incorrect'
                ], 401);
            }

            $token = $admin->createToken('auth_token')->plainTextToken;

            return response()->json([
                'token' => $token,

                'user' => [
                    'id'      => $admin->id,
                    'nom'     => $admin->nom,
                    'prenom'  => $admin->prenom,
                    'email'   => $admin->email,
                    'role'    => 'admin',
                ]
            ]);
        }

        $etudiant = Etudiant::where('email', $request->email)->first();

        if (!$etudiant || !Hash::check($request->mot_de_passe, $etudiant->mot_de_passe)) {
            return response()->json(['message' => 'Email ou mot de passe incorrect'], 401);
        }

        $token = $etudiant->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token'    => $token,
            'user' => [
                'id'      => $etudiant->id,
                'nom'     => $etudiant->nom,
                'prenom'  => $etudiant->prenom,
                'email'   => $etudiant->email,
                'role'    => 'etudiant',
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}