<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vols', function (Blueprint $table) {
            $table->id();
            $table->string('reference');
            $table->foreignId('voyageur_id')->constrained('voyageurs')->onDelete('cascade'); 
            $table->unsignedBigInteger('compagnies_aeriennes_id');
            $table->foreign('compagnies_aeriennes_id')->references('id')->on('compagnies_aeriennes')->onDelete('cascade');
            $table->dateTime('date_depart');
            $table->dateTime('date_arrivee');
            $table->string('aeroport_depart');
            $table->string('aeroport_arrivee');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vols');
    }
};
