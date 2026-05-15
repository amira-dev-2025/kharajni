<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasApiTokens;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mot_de_passe',
    ];

    protected $hidden = [
        'mot_de_passe',
    ];
}