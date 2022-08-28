import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/pages/funcionarios/services/users.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';
import { Auth } from '../auth.interface';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: ['', [ Validators.required, Validators.pattern(this.validadorService.emailPattern)]],
    password: ['', [ Validators.required]],
  });
  public formSubmitted = false;
  loading: boolean = false;
  expRegName: RegExp = /^[^<>*!$#~^&,`'¡":;¥¿?=]/;
  constructor(private router: Router,
    private userService: UsersService,
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private validadorService: ValidatorsService
  ){ }

  ngOnInit(): void {
    document.title = 'Login';
  }

  /**
   * A function that is called when the user clicks on the login button.
   */
  login(): void {
    this.formSubmitted = true;
    if( this.loginForm.invalid){
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value)
        .subscribe({
          next: (resp : Auth) => {
            this.loading = false;
            this.router.navigateByUrl('/');
            Swal.fire({ title: 'Bienvenido', text:`${resp.user.name}`, icon:'success', showClass: { popup: 'animated animate fadeInDown' }});
          },
          error: (err) => {
            this.loading = false;
            Swal.fire('Oops...!!', err.error?.msg || 'Ocurrio un imprevisto | Revisa tu conexion a internet', err.error?.msg ? 'info' : 'warning');
          },
        });
  }

  /**
   * If the field is invalid and the form has been submitted, return true, otherwise return false
   * @param {string} campo - string: The name of the field to be validated.
   * @returns A boolean value.
   */
  campoNoValido(campo: string) : boolean {
    if(this.loginForm.get(campo)?.invalid && this.formSubmitted){
      return true;
    } else {
      return false;
    }
  }
  showModalUsers() {
    this.userService.isEdit = false;
    this.userService.setModalUser = true;
  }


}
