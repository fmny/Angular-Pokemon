import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { Router } from '@angular/router';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.css'
})
export class SearchPokemonComponent implements OnInit {
  
  //{..."aa".."ab"..."abz".."ab".."abz"}
  //représente un flux de données qui évolue dans le temps
  //ici les touches du clavier tapés par l'utilisateur
  //{...pokemonList(a)...pokemonList(ab)...}
  /*Un Subject dans RxJS est à la fois un Observable et un Observer. 
  En tant qu'Observable, il peut émettre des valeurs, des erreurs ou 
  des notifications "complétées" vers ses abonnés. En tant qu'Observer, 
  il peut s'abonner à d'autres Observables*/ 

  searchTerms= new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor( private router : Router, 
    private pokemonService : PokemonService) {}

  ngOnInit():void {
  //le async de l'HTML permet de ne pas avoir 
  //à écrire la ligne ci-dessous
  //this.pokemons$.subscribe(pokemons => this.pokemons = pokemons)
    this.pokemons$ = this.searchTerms.pipe(
      //{..."aa".."ab"..."abz".."ab".."abz"}
      debounceTime(300),//opérateur qui attend 300ms avant d'envoyer la réponse
      //{..."aa".."ab"..."ab".."ab".."abz"} on va attendre un changement
      distinctUntilChanged(),
      //{..."aa".."abc"....} 
      switchMap(term => this.pokemonService.searchPokemonList(term))
      //concatMap , mergeMap, switchMap 
      //(la plupart du temps: annule les recherches précédentes et ne garde que la dernière)
    );

  }

  search(term: string) {
    //on pousse le nouveau terme de la recherche user dans l'objet searchTerms
    this.searchTerms.next(term);
  }

  goToDetail(pokemon: Pokemon) {
    const link =['/pokemons',pokemon.id];
    this.router.navigate(link);
  }

}
