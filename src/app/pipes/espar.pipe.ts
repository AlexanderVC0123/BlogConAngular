//Crear pipe personalizada para saber si el año es par o impar
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'espar'
})

export class EsParPipe implements PipeTransform{

    transform(value:any){

        var espar = "no es par"
        if(value % 2 == 0){
            espar = "es un número par"
        }
        return "El año es: "+value+" y "+espar;
    }
}