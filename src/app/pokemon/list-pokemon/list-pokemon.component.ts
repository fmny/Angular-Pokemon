import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrl: './list-pokemon.component.css'
})

export class ListPokemonComponent implements OnInit {
  
  pokemonList : Pokemon[];
  
  title = 'Liste de Pokemons';
  pokemonSelected : Pokemon | undefined;

  constructor(
    private router : Router, 
    private pokemonService : PokemonService
    ) {}

  ngOnInit(){
    this.pokemonService.getPokemonList()
    .subscribe(pokemonList => this.pokemonList = pokemonList);
  }

  goToPokemon(pokemon:Pokemon) {
    this.router.navigate(['/pokemons',pokemon.id]);
  }

}
