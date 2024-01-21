// import
import { Component, OnInit } from '@angular/core';
//module
import { MatDialogRef } from '@angular/material/dialog';
//services
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-dialog',
  templateUrl: './pokemon-dialog.component.html',
  styleUrls: ['./pokemon-dialog.component.scss']
})
export class PokemonDialogComponent implements OnInit {

  searchTerm: string = '';
  filteredPokemonList: any[] = [];
  pokemonData: any[] = [];
  addedPokemonList: any[] = [];
  selectedPokemon: any;

  constructor(
    private dialogRef: MatDialogRef<PokemonDialogComponent>
    , private pokemonService: PokemonService) {}

  ngOnInit() {
    this.pokemonService.getPokemonData().subscribe((data: any) => {
      this.pokemonData = data.cards;
      this.pokemonService.calculateHPForAllPokemon(this.pokemonData);
      this.pokemonService.calculateStrengthLevel(this.pokemonData);
      this.pokemonService.calculateWeaknessForAllPokemon(this.pokemonData);
    });
  }

  searchPokemon(): void {
    const filteredPokemon = this.pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
    pokemon.type.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    console.log('Filtered Pokemon:', filteredPokemon);

    this.pokemonData = filteredPokemon;
  }
  
  getPokemonDamage(pokemon: any): string {
    return pokemon.attacks && pokemon.attacks.length > 0 ? `${pokemon.attacks[0].damage}` : 'N/A';
  }
  onAddPokemon(): void {
  if (this.selectedPokemon) {
    this.dialogRef.close(this.selectedPokemon);
  }
}
  onPokemonSelected(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  getPokemonWeaknesses(pokemon: any): string {
    return pokemon.weaknesses && pokemon.weaknesses.length > 0 ? `${pokemon.weaknesses[0].type} x${pokemon.weaknesses[0].value}` : 'N/A';
  }
  
  calculateHPPercentage(hp: number): number {
    const maxValue = 100;
    const adjustedHP = Math.max(0, Math.min(hp, maxValue));
    return adjustedHP;
  }
  
  calculateProgressBarValue(value: number): number {
    return value / 2;
  }

  addPokemon(pokemon: any): void {
    console.log('Adding Pokemon:', pokemon);
    this.addedPokemonList.push(pokemon);
    console.log('Added Pokemon List:', this.addedPokemonList);
  }

}