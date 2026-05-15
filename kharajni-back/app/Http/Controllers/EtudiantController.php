<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EtudiantController extends Controller
{
    public function index()
    {
        return response()->json(
            Etudiant::latest()->get()
        );}
    
    // POST /api/etudiants — inscription
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom'          => 'required|string|max:255',
            'prenom'       => 'required|string|max:255',
            'email'        => 'required|email|unique:etudiants',
            'mot_de_passe' => 'required|min:6',
        ]);

        $data['mot_de_passe'] = Hash::make($data['mot_de_passe']);

        $etudiant = Etudiant::create($data);

        return response()->json($etudiant, 201);
    }

    // GET /api/etudiants/{id}
    public function show(Etudiant $etudiant)
    {
        return response()->json($etudiant);
    }

    // PUT /api/etudiants/{id}
    public function update(Request $request, Etudiant $etudiant)
{
    $data = $request->validate([
        'nom'          => 'sometimes|string|max:255',
        'prenom'       => 'sometimes|string|max:255',
        'email'        => 'sometimes|email|unique:etudiants,email,' . $etudiant->id,
        'mot_de_passe' => 'nullable|min:6',
    ]);

    if (isset($data['mot_de_passe'])) {
        $data['mot_de_passe'] = Hash::make($data['mot_de_passe']);
    }

    $etudiant->update($data);

    return response()->json($etudiant);
}

    // DELETE /api/etudiants/{id}
    public function destroy(Etudiant $etudiant)
    {
        $etudiant->delete();
        return response()->json(null, 204);
    }
}