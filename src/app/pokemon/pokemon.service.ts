import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of,catchError, tap  } from 'rxjs';



@Injectable()
export class PokemonService {

  constructor( private http: HttpClient ) {}

  getPokemonList() : Observable<Pokemon[]> {
    //return POKEMONS;
    return this.http.get<Pokemon[]>('api/pokemonApiList').pipe(
      tap((pokemonList) => console.table(pokemonList)),
      catchError( (error) => this.handleError(error, []))
    );
  }  

  getPokemonById(pokemonId : number) : Observable<Pokemon |undefined> {
    //return POKEMONS.find(pokemon => pokemon.id == pokemonId);
    return this.http.get<Pokemon>(`api/pokemonApiList/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, undefined))
      );
    }

  searchPokemonList(term: string) : Observable<Pokemon[]> {
    if(term.length<=1) {
      return of([]);
    }
    return this.http.get<Pokemon[]>( `api/pokemonApiList/?name=${term}`).pipe(
      tap((response) => this.log(response)),
      catchError((error) => this.handleError(error, []))
    );
  }

  updatePokemon (pokemon : Pokemon) : Observable<null> {
    const httpOption = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
  return this.http.put('api/pokemonApiList', pokemon, httpOption).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, null))
    );
  }

  addPokemon(pokemon: Pokemon) : Observable<Pokemon>{
    const httpOption = {
      headers : new HttpHeaders({'Content-Type': 'application/json'})
    };
  return this.http.post<Pokemon>('api/pokemonApiList', pokemon, httpOption).pipe(
    tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, null))
    );
  }

  deletePokemonById (pokemonId : number) : Observable<null> {
    return this.http.delete(`api/pokemonApiList/${pokemonId}`).pipe(
      tap((response) => this.log(response)),
    catchError((error) => this.handleError(error, null))
    );
  }

  private log(response: any) {
    console.table(response);
  }

  private handleError(error: Error, errorValue: [] | any) {
    console.error(error);
    return of(errorValue);
  }
 
  getPokemonTypeList(): string[] {
      return [
        'Plante',
        'Feu',
        'Eau',
        'Insecte',
        'Normal',
        'Electrik',
        'Poison',
        'Fée',
        'Vol',
        'Combat',
        'Psy'
      ];
    }

}
