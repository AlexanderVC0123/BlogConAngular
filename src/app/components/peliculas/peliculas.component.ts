import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/peliculas.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo:String;
  public peliculas: Pelicula[];
  public favorita: Pelicula;
  public fecha:any;

  constructor(
    private _peliculaService: PeliculaService
  ) { 
    this.titulo = "Componente peliculas";
    this.peliculas = this._peliculaService.getPeliculas();
    // this.cantPeliculas = this.peliculas.length
    this.fecha = new Date(2020, 8, 12)
  }

  //se ejecuta cuando ejecutamos nuestro componente después de lanzar el contructor
  ngOnInit(): void {
    console.log(this.peliculas)
    console.log('Componente iniciado')
    console.log(this._peliculaService.holaMundo())
  }

  ngDoCheck(){
    console.log('DoCheck lanzado')
  }

  cambiarTitulo(){
    this.titulo = "El titulo ha sido cambiado";
  }

  ngOnDestroy(){
    console.log('El componente se va a eliminar')
  }

  mostrarFavorita(event){
    this.favorita = event.pelicula;
  }

  

}
