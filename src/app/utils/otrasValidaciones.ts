import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { map, Observable, of } from "rxjs";
import { CentrosService } from "../components/Admin/centros/centros.service";
import { CsvService } from "../components/Admin/csv/csv.service";
import { EmpresasService } from "../components/Admin/empresas/empresas.service";
import { SharedService } from "../Shared/shared.service";
// Validar Email ROLES
export class customValidatorEmail {
  static customValidEmail(service: SharedService) {
    return (control: AbstractControl) => {
      const email = control.value;
      console.log(email)
      return service.validarEmail(email).pipe(
        map(response => {
          console.log(response)
          return response ? { validEmail: true } : null
        })
      );
    }
  }
}
// Validar DNI ROLES
export class customValidatordDni {
  static customValidDni(service: SharedService) {
    return (control: AbstractControl) => {
      const dni = control.value;
      console.log(dni)
      return service.validarDNI(dni).pipe(
        map(response => {
          console.log(response)
          return response ? { validDni: true } : null
        })
      );
    }
  }
}
// Validar DNI rol usuario determinado
export class customValidatordDniBYID {
  static customValidDni(service: SharedService, id: number) {
    return (control: AbstractControl) => {
      const dni = control.value;
      console.log(dni)
      return service.validarDNIByID(dni, id).pipe(
        map(response => {
          console.log(response)
          return response ? { validDni: true } : null
        })
      );
    }
  }
}
// Validar EMAIL rol usuario determinado
export class customValidatorEmailBYID {
  static customValidEmail(service: SharedService, id: number) {
    return (control: AbstractControl) => {
      const email = control.value;
      console.log(email, id)
      return service.validarEmailByID(email, id).pipe(
        map(response => {
          console.log(response)
          return response ? { validEmail: true } : null
        })
      );
    }
  }
}
// Validar letra del DNI
export class customValidatorFormatDNI {
  static customValidDNILETRA(control: AbstractControl){
    const dni = control.value;
    let numero = dni.substr(0, dni.length - 1);
    let letr = dni.substr(dni.length - 1, 1);
    numero = numero % 23;
    let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letra = letra.substring(numero, numero + 1);
    return letra != letr.toUpperCase() ? of({dniletterValid:true}) : of(null)
  }
}
// Validar CIF centro determinado
export class customValidatorCIFCentroBYID {
  static customValidCIFCentroBYID(service: CentrosService, id: number) {
    return (control: AbstractControl) => {
      const cif = control.value;
      console.log(cif, id)
      return service.checkifexistcifCentroByID(cif, id)
        .pipe(
          map(response => {
            console.log(response)
            return response ? { cifvalidID: true } : null
          })
      );
    }
  }
}
// Validar CIF Centro
export class customValidatorCIFCentro {
  static customValidCIFCentro(service: CentrosService) {
    return (control: AbstractControl) => {
      const cif = control.value;
      console.log(cif)
      return service.checkifexistcifCentro(cif)
        .pipe(
          map(response => {
            console.log(response)
            return response ? { cifvalid: true }: null
          })
      );
    }
  }
}
// Validar DNI Empresa
export class customValidatorDNIEmpresa {
  static customValidDNIEmpresa(service: EmpresasService) {
    return (control: AbstractControl) => {
      const dni = control.value;
      console.log(dni)
      return service.checkifEmpresaDNI(dni)
        .pipe(
          map(response => {
            console.log(response)
            return response ? { dniempresaValid: true }: null
          })
      );
    }
  }
}
// Validar DNI Empresa determinada
export class customValidatorDNIEmpresaBYID {
  static customValidDNIEmpresaBYID(service: EmpresasService, id:number) {
    return (control: AbstractControl) => {
      const dni = control.value;
      console.log(dni)
      return service.checkifEmpresaDNIBYID(dni, id)
        .pipe(
          map(response => {
            console.log(response)
            return response ? { dniempresaValid: true }: null
          })
      );
    }
  }
}
// Validar CIF Empresa
export class customValidatorCIFEmpresa {
  static customValidCIFEmpresa(service: EmpresasService) {
    return (control: AbstractControl) => {
      const cif = control.value;
      return service.checkifEmpresaCIF(cif)
        .pipe(
          map(response => {
            console.log(response)
            return response ? { cifempresaValid: true }: null
          })
      );
    }
  }
}
// Validar CIF Empresa determinada
export class customValidatorCIFEmpresaBYID {
  static customValidCIFEmpresaBYID(service: EmpresasService, id:number) {
    return (control: AbstractControl) => {
      const cif = control.value;
      return service.checkifEmpresaCIFBYID(cif, id)
        .pipe(
          map(response => {
            console.log(response)
            return response ? { cifempresaValid: true }: null
          })
      );
    }
  }
}
// Validar DNI Registro
export class customValidatorDNIRegistro {
  static customValidDNIRegistro(service: CsvService) {
    return (control: AbstractControl) => {
      const id = control.value;
      return service.checkifAlumnoPractica(id)
        .pipe(
          map(response => {
            return response ? { dniRegistroValid: true }: null
          })
      );
    }
  }
}