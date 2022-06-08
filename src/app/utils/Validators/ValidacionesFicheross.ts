import { AbstractControl } from "@angular/forms";
import { of } from "rxjs";

/**
 * Validar fichero empresa
 */
export class ValidarFileEmpresa{
    /**
     * metodo para validar file empresa
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if( value!="" &&  value._fileNames!="empresas.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
/**
 * Validar fichero centro
 */
export class ValidarFileCentros{
    /**
     * metodo para validar file centro
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="centros.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
/**
 * Validar fichero curso
 */
export class ValidarFileCursos{
    /**
     * metodo para validar file curso
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="cursos.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
/**
 * Validar fichero alumno
 */
export class ValidarFileAlumnos{
    /**
     * metodo para validar file alumno
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="alumnos.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
/**
 * Validar fichero responsable
 */
export class ValidarFileResponsables{
    /**
     * metodo validar file responsable
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" &&  value._fileNames!="responsables.csv"){
            return of({filevalidator: true})
        }
        return of(null)
    }
}
/**
 * Validar fichero tutor
 */
export class ValidarFileTutores{
    /**
     * metodo validar file tutor
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value;
        if(value!="" && value._fileNames!="tutores.csv"){
            return of({filevalidatorT: true})
        }
        return of(null)
    }
}
/**
 * Validar fichero imagen perfil
 */
export class ValidarFileIMGPerfil{
    /**
     * Validar fichero imagen perfil
     * @param control 
     * @returns 
     */
    static  filevalidator(control:AbstractControl){
        const value =control.value  ;
        if(value!=""){
            let extension=value._fileNames.substring(value._fileNames.length-4 , ).toLowerCase() ;
            if(extension!=".png" && extension!=".jpg"  ){
                return of({filevalidatorImg: true})
            }
        }
        return of(null)
    }
}