import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Injectable()
export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula("Spiderman 4", 2019, 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Spiderman.JPG/800px-Spiderman.JPG'),
            new Pelicula('Los vengadores Endgame', 2018, 'https://imagenes.heraldo.es/files/image_990_v1/files/fp/uploads/imagenes/2019/03/15/marvel-lanza-el-nuevo-trailer-de-la-ultima-pelicula-de-los-vengadores.r_d.370-221.png'),
            new Pelicula('Batman vs Superman', 2015, 'https://i1.wp.com/www.vinilonegro.com/wp-content/uploads/2016/03/Batman-v-Superman-3-e1459165974655.jpg?fit=600%2C400&ssl=1'),
          ]
    }

    holaMundo(){
        return 'Hola mundo desde un servicio de Angular!'
    }

    getPeliculas(){
        return this.peliculas;
    }
}