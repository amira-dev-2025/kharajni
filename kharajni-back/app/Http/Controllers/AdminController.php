<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\Ecole;
use App\Models\Candidature;
use App\Models\Document;

class AdminController extends Controller
{
    public function stats()
    {
        return response()->json([

            'etudiants' => Etudiant::count(),

            'ecoles' => Ecole::count(),

            'candidatures' => Candidature::count(),

            'documents' => Document::count(),

            'dernieres_candidatures' => Candidature::with([
                'etudiant:id,nom,prenom',
                'ecole:id,nom'
            ])
            ->latest()
            ->take(5)
            ->get(),

            'derniers_etudiants' => Etudiant::latest()
                ->take(5)
                ->get(),
        ]);
    }
}