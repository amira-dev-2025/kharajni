<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EcoleController;
use App\Http\Controllers\CandidatureController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ConseillerController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::post('/etudiants', [EtudiantController::class, 'store']);

// ETUDIANTS
Route::get('/etudiants/{etudiant}', [EtudiantController::class, 'show']);
Route::get('/admin/etudiants', [EtudiantController::class, 'index']);
Route::put('/admin/etudiants/{etudiant}', [EtudiantController::class, 'update']);
Route::delete('/admin/etudiants/{etudiant}', [EtudiantController::class, 'destroy']);
// ECOLES
Route::get('/ecoles', [EcoleController::class, 'index']);
Route::get('/ecoles/{ecole}', [EcoleController::class, 'show']);
Route::post('/admin/ecoles', [EcoleController::class, 'store']);
Route::put('/admin/ecoles/{ecole}', [EcoleController::class, 'update']);
Route::delete('/admin/ecoles/{ecole}', [EcoleController::class, 'destroy']);
// CANDIDATURES
Route::get('/candidatures/etudiant/{id}', [CandidatureController::class, 'byEtudiant']);
Route::post('/candidatures', [CandidatureController::class, 'store']);
Route::delete('/candidatures/{candidature}', [CandidatureController::class, 'destroy']);

// DOCUMENTS
Route::get('/documents/etudiant/{id}', [DocumentController::class, 'byEtudiant']);
Route::post('/documents/upload', [DocumentController::class, 'upload']);
Route::delete('/documents/{document}', [DocumentController::class, 'destroy']);

// ADMIN DASHBOARD
Route::get('/admin/stats', [App\Http\Controllers\AdminController::class, 'stats']);
Route::get(
    '/admin/candidatures',
    [CandidatureController::class, 'index']
);

Route::get(
    '/admin/documents',
    [DocumentController::class, 'index']
);



Route::get(
    '/admin/conseillers',
    [ConseillerController::class, 'index']
);

Route::post(
    '/admin/conseillers',
    [ConseillerController::class, 'store']
);

Route::put(
    '/admin/conseillers/{conseiller}',
    [ConseillerController::class, 'update']
);

Route::delete(
    '/admin/conseillers/{conseiller}',
    [ConseillerController::class, 'destroy']
);