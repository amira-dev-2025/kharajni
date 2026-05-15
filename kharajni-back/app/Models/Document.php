<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'etudiant_id',
        'type',
        'chemin_fichier',
        'nom_original'
    ];

    public function etudiant()
    {
        return $this->belongsTo(Etudiant::class);
    }
}