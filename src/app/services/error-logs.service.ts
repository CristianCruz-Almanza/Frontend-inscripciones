import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ErrorLogsService {

  constructor(
    private router: Router
  ) { }

  logDeErrores(e: any, error402: () => void): void {
    if(e.status === 422) {
      error402();
    } else if ( e.status === 401) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/biblioteca/fichero-digital');
      Swal.fire('Tu sesión expiró.', 'Vuelve a iniciar sesión para continuar' , 'info');  
    } else if ( e.status === 0) {
      Swal.fire('Oops...', 'Ocurrio un imprevisto presiona F5 | Revisa tu conexion a internet' , 'warning');
    } else if ( e.status === 500){
      Swal.fire('Error!', 'Ocurrio un problema interno | Si el problema persiste notifica a soporte' , 'error');
    } else{
      Swal.fire('Oops...', 'Ocurrio un imprevisto presiona F5' , 'warning')
    }
  }

  logDeErroresReads(e: any) {
    if (e.status === 401) {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/biblioteca/fichero-digital');
      Swal.fire('Tu sesión expiró.', 'Vuelve a iniciar sesión para continuar' , 'info');
    } else if ( e.status === 0) {
      Swal.fire('Oops...', 'Ocurrio un imprevisto presiona F5 | Revisa tu conexion a internet' , 'warning');
    } else if ( e.status === 400){
      Swal.fire('Error!', 'Error dato no encontrado' , 'error');
    } else if ( e.status === 500){
      Swal.fire('Error!', 'Ocurrio un problema interno | Si el problema persiste notifica a soporte' , 'error');
    }  else{
      Swal.fire('Oops...', 'Ocurrio un imprevisto presiona F5' , 'warning')
    }
  }
}
