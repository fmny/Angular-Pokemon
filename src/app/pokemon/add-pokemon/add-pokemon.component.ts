import { Component } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-add-pokemon',
  templateUrl: './add-pokemon.component.html',
  styleUrl: './add-pokemon.component.css'
})
export class AddPokemonComponent {

  pokemon : Pokemon;

  ngOnInit() {
    this.pokemon=new Pokemon();
  }

}
