<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ecole extends Model
{
    protected $fillable = [
        'nom',
        'pays',
        'ville',
        'description'
    ];

    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }
}