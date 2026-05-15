<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Conseiller extends Model
{
    protected $fillable = [

        'nom',
        'prenom',
        'email',
        'telephone',
        'specialite',
        'mot_de_passe',
    ];

    protected $hidden = [
        'mot_de_passe'
    ];
}