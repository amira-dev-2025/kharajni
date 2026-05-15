<?php

namespace App\Http\Controllers;

use App\Models\Ecole;
use Illuminate\Http\Request;

class EcoleController extends Controller
{
    // GET /api/ecoles
    public function index()
    {
        return response()->json(Ecole::all());
    }

    // GET /api/ecoles/{id}
    public function show(Ecole $ecole)
    {
        return response()->json($ecole);
    }

    // POST /api/ecoles (admin)
    public function store(Request $request)
    {
        $data = $request->validate([
            'nom'         => 'required|string|max:255',
            'pays'        => 'required|string|max:255',
            'ville'       => 'nullable|string|max:255',
            'description' => 'nullable|string',
        ]);

        $ecole = Ecole::create($data);

        return response()->json($ecole, 201);
    }

    // PUT /api/ecoles/{id} (admin)
    public function update(Request $request, Ecole $ecole)
{
    $data = $request->validate([
        'nom'         => 'required|string|max:255',
        'pays'        => 'required|string|max:255',
        'ville'       => 'nullable|string|max:255',
        'description' => 'nullable|string',
    ]);

    $ecole->update($data);

    return response()->json($ecole);
}

    // DELETE /api/ecoles/{id} (admin)
    public function destroy(Ecole $ecole)
    {
        $ecole->delete();
        return response()->json(null, 204);
    }
}