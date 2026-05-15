<?php

namespace App\Http\Controllers;

use App\Models\Conseiller;
use Illuminate\Http\Request;

class ConseillerController extends Controller
{
    // GET ALL
    public function index()
    {
        return response()->json(

            Conseiller::latest()->get()

        );
    }

    // CREATE
    public function store(Request $request)
    {
        $data = $request->validate([

            'nom' => 'required',

            'prenom' => 'required',

            'email' => 'required|email|unique:conseillers',

            'telephone' => 'nullable',

            'specialite' => 'nullable',

            'mot_de_passe' => 'required|min:6',
        ]);

        $data['mot_de_passe'] = bcrypt(
            $data['mot_de_passe']
        );

        $conseiller = Conseiller::create($data);

        return response()->json(
            $conseiller,
            201
        );
    }

    // UPDATE
    public function update(
        Request $request,
        Conseiller $conseiller
    ) {

        $data = $request->validate([

            'nom' => 'required',

            'prenom' => 'required',

            'email' =>
                'required|email|unique:conseillers,email,' .
                $conseiller->id,

            'telephone' => 'nullable',

            'specialite' => 'nullable',
        ]);

        $conseiller->update($data);

        return response()->json($conseiller);
    }

    // DELETE
    public function destroy(
        Conseiller $conseiller
    ) {

        $conseiller->delete();

        return response()->json(null, 204);
    }
}