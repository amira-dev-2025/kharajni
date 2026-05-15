<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    protected $fillable = [
        'etudiant_id',
        'ecole_id',
        'statut'
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }

    public function ecole()
    {
        return $this->belongsTo(Ecole::class);
    }
}