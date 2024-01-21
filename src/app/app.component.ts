//import
import { Component, OnInit } from '@angular/core';
import { PokemonDialogComponent } from './pokemon-dialog/pokemon-dialog.component';

//module
import { MatDialog } from '@angular/material/dialog';

//services
import { PokemonService } from './pokemon.service';

const COLORS = {
  Psychic: '#f8a5c2',
  Fighting: '#f0932b',
  Fairy: '#c44569',
  Normal: '#f6e58d',
  Grass: '#badc58',
  Metal: '#95afc0',
  Water: '#3dc1d3',
  Lightning: '#f9ca24',
  Darkness: '#574b90',
  Colorless: '#FFF',
  Fire: '#eb4d4b',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  searchTerm: string = '';
  pokemonData: any[] = [];
  addedPokemonList: any[] = [];
  selectedPokemon: any;

  constructor(private dialog: MatDialog, private pokemonService: PokemonService) {}

  ngOnInit() {
    this.loadPokemonData();
  }

  openPokemonDialog(): void {
    const dialogRef = this.dialog.open(PokemonDialogComponent, {
      width: '1024px',
      height: '768px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('Dialog closed with result:', result);
      if (result) {
        this.addPokemon(result);
      }
    });
  }  
  loadPokemonData(): void {
    this.pokemonService.getPokemonData().subscribe(
      (data: any) => {
        this.pokemonData = data.cards;
      },
      (error) => {
        console.error('Error fetching Pokemon data:', error);
      }
    );
  }
  calculateHPPercentage(hp: number): string {
    const maxValue = 100;
    const adjustedHP = Math.max(0, Math.min(hp, maxValue));
    return `${adjustedHP}%`;
  }
  
  addPokemon(pokemon: any): void {
    console.log('Adding Pokemon:', pokemon);
    this.addedPokemonList.push(pokemon);
    console.log('Added Pokemon List:', this.addedPokemonList);
  }
  
  calculateProgressBarValue(value: number): number {
    return value / 2;
  }
  
  closePokemonCard(index: number): void {
    this.addedPokemonList.splice(index, 1);
  }
  
  deletePokemonCard(index: number): void {
    this.addedPokemonList.splice(index, 1);
  }
}