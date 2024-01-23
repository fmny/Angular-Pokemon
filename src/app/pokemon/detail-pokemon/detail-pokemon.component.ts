import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { Observable, filter, from, map } from 'rxjs';



@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.css'
})
export class DetailPokemonComponent implements OnInit {

  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;
  
  constructor(
    private route : ActivatedRoute, 
    private router: Router,
    private pokemonService : PokemonService
    ) {}

  ngOnInit() {
    //paramMap: tableau des url
    //snapshot: état à l'instant t
    const pokemonId : string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.pokemonService.getPokemonById(+pokemonId)
      .subscribe(pokemon => this.pokemon = pokemon);
    }

  }

  goToPokemonList(){
    this.router.navigate(['/pokemons']);
  }

  goToEditPokemon(pokemon: Pokemon){
    this.router.navigate(['/edit/pokemon',pokemon.id]);
    console.log(pokemon.name);
    
    //test pour utiliser une Arrow fonction 
    let observable = from([1, 2, 3, 4, 5]).pipe(filter (x => x > 2 ), map(x => 2*x)); // Output: 3, 4, 5 */
    observable.subscribe(x => console.log(x)); //6,8,10

  } 

  deletePokemon (pokemon : Pokemon) {
    this.pokemonService.deletePokemonById(pokemon.id)
    .subscribe( () => this.goToPokemonList() );
  }
}

