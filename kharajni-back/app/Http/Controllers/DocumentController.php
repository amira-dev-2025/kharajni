<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    // GET
    public function byEtudiant($etudiantId)
    {
        $documents = Document::where(
            'etudiant_id',
            $etudiantId
        )->get();

        return response()->json($documents);
    }

    // POST
    public function upload(Request $request)
    {
        $request->validate([
            'etudiantId' => 'required|exists:etudiants,id',
            'type'       => 'required|string',
            'file'       => 'required|file|max:5120',
        ]);

        $path = $request
            ->file('file')
            ->store('documents', 'public');

        $document = Document::create([
            'etudiant_id' => $request->etudiantId,
            'type' => $request->type,
            'chemin_fichier' => $path,
            'nom_original' => $request
                ->file('file')
                ->getClientOriginalName(),
        ]);

        return response()->json($document, 201);
    }
public function index()
{
    return response()->json(

        Document::with('etudiant')->get()

    );
}
    // DELETE
    public function destroy(Document $document)
    {
        Storage::disk('public')->delete(
            $document->chemin_fichier
        );

        $document->delete();

        return response()->json(null, 204);
    }
}