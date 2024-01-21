import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  pokemonData: any[] = [];
  constructor(
    private http: HttpClient
    ) {}

  getPokemonData(): Observable<any> {
    return this.http.get('assets/cards.json');
  }
  calculateHPForAllPokemon(pokemons: any[]): void {
    const maxValue = 100;
    const minValue = 0;
    pokemons.forEach((pokemon) => {
      if (pokemon.hp !== undefined && !isNaN(pokemon.hp)) {
        const adjustedHP = Math.max(minValue, Math.min(pokemon.hp, maxValue));
        pokemon.hp = adjustedHP;
      }
    });
  }
  calculateStrengthLevel(pokemonData: any[]): void {
    const maxStrength = 100;
    const baseMultiplier = 50;
    pokemonData.forEach((pokemon) => {
      const attacksLength = pokemon.convertedRetreatCost || 0;
      const strengthLevel = Math.min(attacksLength * baseMultiplier, maxStrength);
      pokemon.strengthLevel = attacksLength > 2 ? 0 : strengthLevel;
    });
  }  
  calculateWeaknessForAllPokemon(pokemonData: any[]): void {
    pokemonData.forEach((pokemon) => {
      const damage = pokemon.damage;
      pokemon.calculatedDamage = this.calculateDamage(damage);
    });
  }
  calculateDamage(damage: string | undefined | null): number {
    let numericValue = 0;

    if (damage) {

      const match = damage.match(/\d+/);

      if (match) {

        numericValue = parseInt(match[0], 10);
      }
    }

    return numericValue;
  }

}