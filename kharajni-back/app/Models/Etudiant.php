<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Etudiant extends Authenticatable
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
    ];

    protected $hidden = [
        'mot_de_passe',
        'remember_token',
    ];

    // Laravel utilise "password" par défaut
    // On lui indique notre colonne personnalisée
    public function getAuthPassword()
    {
        return $this->mot_de_passe;
    }

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class);
    }
}