import { AbstractControl, FormGroup } from "@angular/forms";
import { map, of } from "rxjs";
import { CentrosService } from "../../components/Admin/centros/centros.service";
import { CsvService } from "../../components/Admin/csv/csv.service";
import { EmpresasService } from "../../components/Admin/empresas/empresas.service";
import { SharedService } from "../../Shared/shared.service";
/**
 * Validar Email ROLES
 */
export class customValidatorEmail {
  /**
   * metodo para validar email
   * @param service 
   * @returns 
   */
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
/**
 * Validar DNI ROLES
 */
export class customValidatordDni {
  /**
   * metodo para validar dni
   * @param service 
   * @returns 
   */
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
/**
 * Validar DNI rol usuario determinado
 */
export class customValidatordDniBYID {
  /**
   * metodo para validar dni
   * @param service 
   * @param id 
   * @returns 
   */
  static customValidDni(service: SharedService, id: number) {
    return (control: AbstractControl) => {
      const dni = control.value;
      return service.validarDNIByID(dni, id).pipe(
        map(response => {
          return response ? { validDni: true } : null
        })
      );
    }
  }
}
/**
 * Validar EMAIL rol usuario determinado
 */
export class customValidatorEmailBYID {
  /**
   * metodo para validar email
   * @param service 
   * @param id 
   * @returns 
   */
  static customValidEmail(service: SharedService, id: number) {
    return (control: AbstractControl) => {
      const email = control.value;
      return service.validarEmailByID(email, id).pipe(
        map(response => {
          return response ? { validEmail: true } : null
        })
      );
    }
  }
}
/**
 * Validar letra del DNI
 */
export class customValidatorFormatDNI {
  /**
   * metodo para validar formato dni
   * @param control 
   * @returns 
   */
  static customValidDNILETRA(control: AbstractControl) {
    const dni = control.value;
    let numero = dni.substr(0, dni.length - 1);
    let letr = dni.substr(dni.length - 1, 1);
    numero = numero % 23;
    let letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
    letra = letra.substring(numero, numero + 1);
    return letra != letr.toUpperCase() ? of({ dniletterValid: true }) : of(null)
  }
}
/**
 * Validar CIF centro determinado
 */
export class customValidatorCIFCentroBYID {
  /**
   * metodo para validar cif centro 
   * @param service 
   * @param id 
   * @returns 
   */
  static customValidCIFCentroBYID(service: CentrosService, id: number) {
    return (control: AbstractControl) => {
      const cif = control.value;
      return service.checkifexistcifCentroByID(cif, id)
        .pipe(
          map(response => {
            return response ? { cifvalidID: true } : null
          })
        );
    }
  }
}
/**
 * Validar CIF Centro
 */
export class customValidatorCIFCentro {
  /**
   * metodo para validar cif centro
   * @param service 
   * @returns 
   */
  static customValidCIFCentro(service: CentrosService) {
    return (control: AbstractControl) => {
      const cif = control.value;
      return service.checkifexistcifCentro(cif)
        .pipe(
          map(response => {
            return response ? { cifvalid: true } : null
          })
        );
    }
  }
}
/**
 * Validar DNI Empresa
 */
export class customValidatorDNIEmpresa {
  /**
   * metodo para validar dni empresa
   * @param service 
   * @returns 
   */
  static customValidDNIEmpresa(service: EmpresasService) {
    return (control: AbstractControl) => {
      const dni = control.value;
      return service.checkifEmpresaDNI(dni)
        .pipe(
          map(response => {
            return response ? { dniempresaValid: true } : null
          })
        );
    }
  }
}
/**
 * Validar DNI Empresa determinada
 */
export class customValidatorDNIEmpresaBYID {
  /**
   * metodo para validar dni empresa
   * @param service 
   * @param id 
   * @returns 
   */
  static customValidDNIEmpresaBYID(service: EmpresasService, id: number) {
    return (control: AbstractControl) => {
      const dni = control.value;
      return service.checkifEmpresaDNIBYID(dni, id)
        .pipe(
          map(response => {
            return response ? { dniempresaValid: true } : null
          })
        );
    }
  }
}
/**
 * Validar CIF Empresa
 */
export class customValidatorCIFEmpresa {
  /**
   * metodo para validar cif empresa
   * @param service 
   * @returns 
   */
  static customValidCIFEmpresa(service: EmpresasService) {
    return (control: AbstractControl) => {
      const cif = control.value;
      return service.checkifEmpresaCIF(cif)
        .pipe(
          map(response => {
            return response ? { cifempresaValid: true } : null
          })
        );
    }
  }
}
/**
 * Validar CIF Empresa determinada
 */
export class customValidatorCIFEmpresaBYID {
  /**
   * metodo para validar cif empresa
   * @param service 
   * @param id 
   * @returns 
   */
  static customValidCIFEmpresaBYID(service: EmpresasService, id: number) {
    return (control: AbstractControl) => {
      const cif = control.value;
      return service.checkifEmpresaCIFBYID(cif, id)
        .pipe(
          map(response => {
            return response ? { cifempresaValid: true } : null
          })
        );
    }
  }
}
/**
 * Validar DNI Registro
 */
export class customValidatorDNIRegistro {
  /**
   * metodo para validar dni registro
   * @param service 
   * @returns 
   */
  static customValidDNIRegistro(service: CsvService) {
    return (control: AbstractControl) => {
      const id = control.value;
      return service.checkifAlumnoPractica(id)
        .pipe(
          map(response => {
            return response ? { dniRegistroValid: true } : null
          })
        );
    }
  }
}
/**
 * Validar DNI username alta
 */
export class customValidatorDNIRegistroAlta {
  /**
   * metodo para validar dni alta
   * @param service 
   * @returns 
   */
  static customValidDNIRegistroAlta(service: CsvService) {
    return (control: AbstractControl) => {
      const dni = control.value;
      return service.checkifUsersExist(dni)
        .pipe(
          map(response => {
            return response ? { dniAltaValid: true } : null
          })
        );
    }
  }
}
/**
 * Validar FechaDesde menor que FechaHasta
 */
export class customValidatorFecha {
  /**
   * metodo para validar fecha
   * @param fechaDesdeParam 
   * @param fechaHastaParam 
   * @returns 
   */
  static customValidFecha(fechaDesdeParam: string, fechaHastaParam: string) {
    return (formGroup: FormGroup) => {

      const fechaDesde = formGroup.controls[fechaDesdeParam];

      const fechaHasta = formGroup.controls[fechaHastaParam];

      if (fechaHasta.errors && !fechaHasta.errors['customValidFecha']) {
        // return si otro validator encuentra error  matchingControl
        return;
      }
      if (fechaDesde.value > fechaHasta.value) {
        fechaHasta.setErrors({ Mayor: true });
      } else {
        fechaHasta.setErrors(null);
      }
    }
  };
}
/**
 * Validar Localidad respecto a Provincia 
 */
export class customValidatorLocalidad {
  /**
   * metodo para validar localidad
   * @param localidadParam 
   * @param provinciaParam 
   * @returns 
   */
  static customValidLocalidad(localidadParam: any, provinciaParam: any) {
    let arrayBuffer: any = []
    return (formGroup: FormGroup) => {
      const localidadC = formGroup.controls[localidadParam];

      const provinciaC = formGroup.controls[provinciaParam];
      if (provinciaC.errors || (localidadC.errors && !localidadC.errors['validLocalidad'])) {
        // return si otro validator encuentra error  matchingControl
        return 
      }
      var xhr = new XMLHttpRequest();
      if (localidadC.value != "" && provinciaC.value != "" && !provinciaC.errors) {
        xhr.addEventListener("readystatechange", function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let array: any = xhr.responseText.trim()
            array = array.split('\n')
            let aux: any = []
            let conta = 0
            //@ts-ignore
            for (let i = 0; i < array.length; i++) {
              aux[conta] = JSON.stringify(array[i]).split(';')
              let provincia: string = aux[conta][0]
              let localidad: string = aux[conta][1]
              let provinciaCampo: string = provinciaC.value
              let localidadCampo: string = localidadC.value
              provincia = provincia.replace("\"", '')
              conta++
              if (provincia.toLowerCase() == provinciaCampo.toLowerCase() && localidad.toLowerCase() == localidadCampo.toLowerCase()) {
                return localidadC.setErrors(null);
              }
            };
          }
        });
        xhr.open("GET", "http://localhost:1949/assets/csv/codigospostales.csv", true);
        xhr.send();
        return localidadC.setErrors({ validLocalidad: true });
      }
      return localidadC.setErrors(null);
    };
  }
}
/**
 * Validar Codigo Postal respecto a Localidad 
 */
export class customValidatorCodigoPostal {
  /**
   * metodo para validar codigo postal
   * @param localidadParam 
   * @param cpParam 
   * @returns 
   */
  static customValidCodigoPôstal(localidadParam: any, cpParam: any) {
  
    return (formGroup: FormGroup) => {
      const localidadC = formGroup.controls[localidadParam];

      const cpC = formGroup.controls[cpParam];
     
      var xhr = new XMLHttpRequest();
      if (localidadC.value != "" && cpC.value != ""  ) {
        xhr.addEventListener("readystatechange", function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let array: any = xhr.responseText.trim()
            array = array.split('\n')
            let aux: any = []
            for (let i = 0; i < array.length; i++) {
              aux[0] = JSON.stringify(array[i]).split(';')
              let cp: string = aux[0][2]
              let localidad: string = aux[0][1]
              let cpCampo: string = cpC.value
              let localidadCampo: string = localidadC.value
              if (cp == cpCampo && localidad == localidadCampo) {
                return cpC.setErrors(null);
              }
            };
          }
        });
        xhr.open("GET", "http://localhost:1949/assets/csv/codigospostales.csv", true);
        xhr.send();
        return cpC.setErrors({ validCp: true });
      }
      return cpC.setErrors(null);
    };
  }
}
/**
 * Validar Provincia 
 */
export class customValidatorProvincia {
    /**
     * metodo para validar provincia
     * @param provinciaParam 
     * @returns 
     */
  static customValidProvincia(provinciaParam: string) {
    let arrayBuffer: any = []
    return (formGroup: FormGroup) => {
      let encontrado: boolean = false
      const provinciaValor = formGroup.controls[provinciaParam]
      var xhr = new XMLHttpRequest();
      if (provinciaValor.value != "" && !provinciaValor.errors) {
        xhr.addEventListener("readystatechange", function () {
          if (xhr.readyState == 4 && xhr.status == 200) {
            let array: any = xhr.responseText.trim()
            array = array.split('\n')
            let aux: any = []
            for (let i = 0; i < array.length; i++) {
              aux[0] = JSON.stringify(array[i]).split(';')
              let provincia: string = aux[0][0]
              let provinciaCampo: string = provinciaValor.value
              provincia = provincia.replace("\"", '')
              if (provincia.toLowerCase() == provinciaCampo.toLowerCase() && encontrado == false) {
                encontrado = true
                return provinciaValor.setErrors(null)
              }
            };
          }
        });
        xhr.open("GET", "http://localhost:1949/assets/csv/codigospostales.csv", true);
        xhr.send();
        return provinciaValor.setErrors({validProvincia:true});
      }
      return provinciaValor.setErrors(null);
    };
  }
}
