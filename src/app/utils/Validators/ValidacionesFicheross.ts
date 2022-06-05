import { AbstractControl } from "@angular/forms";
import { of } from "rxjs";

// Validar fichero empresa
export class ValidarFileEmpresa{
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if( value!="" &&  value._fileNames!="empresas.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
// Validar fichero centro
export class ValidarFileCentros{
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="centros.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
// Validar fichero curso
export class ValidarFileCursos{
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="cursos.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
// Validar fichero alumno
export class ValidarFileAlumnos{
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="alumnos.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
// Validar fichero responsable
export class ValidarFileResponsables{
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="responsables.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
// Validar fichero tutor
export class ValidarFileTutores{
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" && value._fileNames!="tutores.csv"){
            return of({filevalidatorT: true})
        }
        return of(null)
    }
}
// Validar fichero imagen perfil
export class ValidarFileIMGPerfil{
    static  filevalidator(control:AbstractControl){
        const value =control.value  ;
        console.log(value)
        
        if(value!=""){
            let extension=value._fileNames.substring(value._fileNames.length-4 , ).toLowerCase() ;
            if(extension!=".png" && extension!=".jpg"  ){
                return of({filevalidatorImg: true})
            }
        }
        return of(null)
    }
}