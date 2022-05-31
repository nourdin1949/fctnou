export interface User {
    id:                number;
    username:          string;
    email:             string;
    perfil:            string;
    activo:            number;
    email_verified_at: string;
    foto:              number;
}
export interface RegisterUser {
    username:         string;
    password:         string;
    email:            string;
    confirm_password: string;
    activo:           string;
    perfil:           string;
}

export interface Empresa {
    id:                  number;
    nombreEmpresa:       string;
    provincia:           string;
    localidad:           string;
    calle:               string;
    cp:                  string;
    cif:                 string;
    telefono:            string;
    email:               string;
    dniRepresentante:    string;
    nombreRepresentante: string;
}

export interface Centro {
    codigo:         number;
    nombreCentro:   string;
    provincia:      string;
    localidad:      string;
    calle:          string;
    cp:             string;
    cif:            string;
    telefono:       number;
    email:          string;
    nombreDirector: string;
    
}

export interface Profesor {
    id:           number;
    nombreTutor:  string;
    dniTutor:     string;
    email:        string;
    codigoCentro: number;

}

export interface Curso {
    id:                 number;
    codigoCiclo:        string;
    familiaProfesional: string;
    cicloFormativo:     string;
    cursoAcademico:     string;
    nHoras:             number;
    tutor_id:           number;

}

export interface Responsable {
    id:                number;
    nombreResponsable: string;
    dniResponsable:    string;
    email:             string;
    empresa_id:        number;

}

export interface Alumno {
    id:             number;
    nombreAlumno:   string;
    dniAlumno:      string;
    curso_id:       number;
    provincia:      string;
    localidad:      string;
    calle:          string;
    cp:             number;
    email:          string;
    matriculado:    number;

}

export class FCTAlumno {
    id:                number;
    alumno_id:         number;
    empresa_id:        number;
    responsable_id:    number;
    tutor_id:          number;
    codigoCentro:      number;
    nombreAlumno:      string;
    nombreEmpresa:     string;
    nombreResponsable: string;
    nombreTutor:       string;
    codigoCiclo:       string;

}

export interface FCTAlumnoLista {
    id:             number;
    alumno_id:      number;
    empresa_id:     number;
    responsable_id: number;
    tutor_id:       number;
    codigoCentro:   number;
}

export interface Tarea {
    id:                  number;
    alumno_id:           string;
    descripcion:         string;
    orientacion:         string;
    tiempo:              string;
    fecha:               Date;
    dificultad:          string;
    observaciones:       string;
    validadoResponsable: number;
    validadoTutor:       number;
}


export interface Chat {
    id:         number;
    emisor:     string;
    mensaje:    string;
    receptor:   string;
    fecha:      Date;
}