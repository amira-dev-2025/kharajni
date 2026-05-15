<?php

namespace App\Http\Controllers;

use App\Models\Candidature;
use Illuminate\Http\Request;

class CandidatureController extends Controller
{
    // GET /api/candidatures/etudiant/{etudiantId}
    public function byEtudiant($etudiantId)
    {
        $candidatures = Candidature::with('ecole')
            ->where('etudiant_id', $etudiantId)
            ->get();

        return response()->json($candidatures);
    }
    public function index()
{
    return response()->json(

        Candidature::with([
            'etudiant',
            'ecole'
        ])->get()

    );
}

    // POST /api/candidatures
    public function store(Request $request)
    {
        $data = $request->validate([
            'etudiant_id' => 'required|exists:etudiants,id',
            'ecole_id'    => 'required|exists:ecoles,id',
        ]);

        $candidature = Candidature::create([
            'etudiant_id' => $data['etudiant_id'],
            'ecole_id'    => $data['ecole_id'],
            'statut'      => 'en_attente',
        ]);

        return response()->json(
            $candidature->load('ecole'),
            201
        );
    }

    // DELETE /api/candidatures/{id}
    public function destroy(Candidature $candidature)
    {
        $candidature->delete();

        return response()->json(null, 204);
    }
}