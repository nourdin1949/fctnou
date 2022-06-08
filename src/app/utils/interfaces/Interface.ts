/**
 * User
 */
export interface User {
    /**
    * id
    */
    id: number;
    /**
     * username
     */
    username: string;
    /**
     * email
     */
    email: string;
    /**
     * perfil
     */
    perfil: string;
    /**
     * activo
     */
    activo: number;
    /**
     * email verificado fecha
     */
    email_verified_at: string;
    /**
 
     * campo boolen 
     */
    foto: number;
}
/**
 * RegisterUser
 */
export interface RegisterUser {
    /**
     * username
     */
    username: string;
    /**
     * password
     */
    password: string;
    /**
     * email
     */
    email: string;
    /**
     * confirmacion de password
     */
    confirm_password: string;
    /**
     * activo
     */
    activo: string;
    /**
     * rol/perfil
     */
    perfil: string;
}
/**
 * Empresa
 */
export interface Empresa {
    /**
     * id empresa
     */
    id: number;
    /**
     * nombre empresa
     */
    nombreEmpresa: string;
    /**
     * provincia de la empresa
     */
    provincia: string;
    /**
     * localidad de la empresa
     */
    localidad: string;
    /**
     * calle de la empresa
     */
    calle: string;
    /**
     * codigo postal de la empresa
     */
    cp: string;
    /**
     * cif de la empresa
     */
    cif: string;
    /**
     * telefono de la empresa
     */
    telefono: string;
    /**
     * email de la empresa
     */
    email: string;
    /**
     * dni representante de la empresa
     */
    dniRepresentante: string;
    /**
     * nombre representante de la empresa
     */
    nombreRepresentante: string;
}
/**
 * Centro
 */
export interface Centro {
    /**
     * codido centro
     */
    codigo: number;
    /**
     * nombre centro
     */
    nombreCentro: string;
    /**
     * provincia
     */
    provincia: string;
    /**
     * localidad
     */
    localidad: string;
    /**
     * calle del centro
     */
    calle: string;
    /**
     * codigo psotal del centro
     */
    cp: string;
    /**
     * cif del centro
     */
    cif: string;
    /**
     * telefono del centro
     */
    telefono: number;
    /**
     * email del centro
     */
    email: string;
    /**
     * nombre director
     */
    nombreDirector: string;
}
/**
 * Profesor
 */
export interface Profesor {
    /**
     * id profesor
     */
    id: number;
    /**
     * nombre del tutor
     */
    nombreTutor: string;
    /**
     * dni tutor
     */
    dniTutor: string;
    /**
     * email tutor
     */
    email: string;
    /***
     * codigo centro
     */
    codigoCentro: number;

}
/**
 * Curso
 */
export interface Curso {
    /**
     * id 
     */
    id: number;
    /**
     * codigo ciclo
     */
    codigoCiclo: string;
    /**
     * familia profesional
     */
    familiaProfesional: string;
    /**
     * ciclo formativo del curso
     */
    cicloFormativo: string;
    /**
     * Año academico
     */
    cursoAcademico: string;
    /**
     * Numero horas practicas del curso
     */
    nHoras: number;
    /**
     * id del tutor
     */
    tutor_id: number;

}
/**
 * Responsable
 */
export interface Responsable {
    /**
     * id 
     */
    id: number;
    /**
     * nombre responsable
     */
    nombreResponsable: string;
    /**
     * dni responsable
     */
    dniResponsable: string;
    /**
     * email centro
     */
    email: string;
    /**
     * Id empresa
     */
    empresa_id: number;
}
/**
 * Alumno
 */
export interface Alumno {
    /**
     * id
     */
    id: number;
    /**
     * Nombre alumno
     */
    nombreAlumno: string;
    /**
     * dni alumno
     */
    dniAlumno: string;
    /**
     * id del curso
     */
    curso_id: number;
    /**
     * provincia 
     */
    provincia: string;
    /**
     * localidad
     */
    localidad: string;
    /**
     * calle
     */
    calle: string;
    /**
     * cp
     */
    cp: number;
    /**
     * email
     */
    email: string;
    /**
     * matriculado
     */
    matriculado: number;
}
/**
 * FCTAlumno
 */
export interface FCTAlumno {
    /**
     * id
     */
    id: number;
    /**
     * id alumno
     */
    alumno_id: number;
    /**
     * id empresa
     */
    empresa_id: number;
    /**
     * id responsable
     */
    responsable_id: number;
    /**
     * id tutor
     */
    tutor_id: number;
    /**
     * codigo centro
     */
    codigoCentro: number;
    /**
     * nombre alumno
     */
    nombreAlumno: string;
    /**
     * nombre empresa
     */
    nombreEmpresa: string;
    /**
     * nombre responsable
     */
    nombreResponsable: string;
    /**
     * nombre tutor
     */
    nombreTutor: string;
    /**
     * codigo ciclo
     */
    codigoCiclo: string;
}
/**
 * FCTAlumnoLista
 */
export interface FCTAlumnoLista {
    /**
     * id
     */
    id:             number;
    /**
     * id alumno
     */
    alumno_id:      number;
    /**
     * id empresa
     */
    empresa_id:     number;
    /**
     * id responsable
     */
    responsable_id: number;
    /**
     * id tutor
     */
    tutor_id:       number;
    /**
     * codigo centro
     */
    codigoCentro:   number;
}
/**
 * Tarea
 */
export interface Tarea {
    /**
     * id
     */
    id: number;
    /**
     * id alumno
     */
    alumno_id: string;
    /**
     * descripcion
     */
    descripcion: string;
    /**
     * orientacion
     */
    orientacion: string;
    /**
     * tiempo
     */
    tiempo: string;
    /**
     * fecha
     */
    fecha: Date;
    /**
     * dificultad
     */
    dificultad: string;
    /**
     * Observaciones
     */
    observaciones: string;
    /**
     * validacion responsable
     */
    validadoResponsable: number;
    /**
     * validacion tutor
     */
    validadoTutor: number;
}
/**
 * Chat
 */
export interface Chat {
    /**
     * id
     */
    id: number;
    /**
     * emisor
     */
    emisor: string;
    /**
     * mensaje
     */
    mensaje: string;
    /**
     * receptor
     */
    receptor: string;
    /**
     * fecha
     */
    fecha: Date;
}