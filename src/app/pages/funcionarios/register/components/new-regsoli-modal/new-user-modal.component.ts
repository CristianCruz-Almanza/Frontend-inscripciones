import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorLogsService } from 'src/app/services/error-logs.service';
import { ValidatorsService } from 'src/app/services/validators.service';
import Swal from 'sweetalert2';
import { Regsoli } from '../../../interfaces/regsoli.interface';
import { Users } from '../../../interfaces/users.interface';
import { RegsoliService } from '../../../services/regsoli.service';
import { UsersService } from '../../../services/users.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './new-user-modal.component.html',
  styles: [
  ]
})
export class ModalNewUser implements OnInit, OnDestroy {

  loading: boolean = false;
  public userForm: FormGroup = this.fb.group({
    id_regsoli: [''],
    nameperson: ['',[Validators.required,Validators.minLength(5), Validators.maxLength(174),this.validadorService.isSpacesInDinamicTxt]],
    constitution: [ ''],
    nameproject: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(170),this.validadorService.isSpacesInDinamicTxt],],
    yearexperience: [ '', [ Validators.required]],
    investment: [ '', [ Validators.required]],
    timeproposal:['', [ Validators.required]],
    financing: [true, [ Validators.required]],
    id_user: this.authService.getUser.id,
    status:[true]
  });

  public editSubs!: Subscription;

  constructor(
    public regsoliService: RegsoliService,
    private validadorService :ValidatorsService,
    private errorLogsService: ErrorLogsService,
    private fb: FormBuilder,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.editSubs = this.regsoliService.editSubs
        .subscribe((resp: Regsoli) => {
          this.userForm.reset({
            id_regsoli: resp.id,
            nameperson: resp.nameperson,
            constitution: resp.constitution,
            nameproject: resp.nameproject,
            yearexperience: resp.yearexperience,
            investment: resp.investment,
            timeproposal: resp.timeproposal,
            financing: resp.financing,
            id_user: this.authService.getUser.id,
            status: resp.status ? true : false
          });
        });
  }

  ngOnDestroy(): void {
    this.editSubs.unsubscribe();
  }
  closeModal() {
    this.regsoliService.setModalRegsoli = false;
  }


  saveRegSoli() {
    this.userForm.markAllAsTouched();
    if( this.userForm.invalid){
      return;
    }
    this.loading = true;
    let regsoli : Regsoli = {
      nameperson: this.userForm.get('nameperson')?.value,
      constitution: this.userForm.get('constitution')?.value,
      nameproject: this.userForm.get('nameproject')?.value,
      yearexperience: this.userForm.get('yearexperience')?.value,
      investment: this.userForm.get('investment')?.value,
      timeproposal: this.userForm.get('timeproposal')?.value,
      financing: this.userForm.get('financing')?.value,
      id_user: this.userForm.get('id_user')?.value,
      status: this.userForm.get('status')?.value ? 1 : 0,
    }
    this.regsoliService.postNewRegsoli(regsoli)
        .subscribe({
          next: (resp) => {
            this.loading = false;
            this.resetRegsoli();
            this.closeModal();
          },
          error: (e) => {
            this.loading = false;
            this.resetRegsoli();
            this.closeModal();
            this.errorLogsService.logDeErrores(e, ()=> {
              const errors = e.error.errors;
              const msg = errors.regsoli ? errors.regsoli  : errors.status ? errors.status : 'Los datos no son validos, Intenta nuevamente';
              Swal.fire({ title: 'Oops...', text: msg, icon: 'info',
                showClass: { popup: 'animated animate fadeInDown' },
              });
            });
          },
          complete: () => {
            this.regsoliService.saving.emit(true);
            Swal.fire({ title: 'Exito', text: 'solicitud creada correctamente', icon: 'success',
              showClass: { popup: 'animated animate fadeInDown' },
            });
          }
        });
  }


  editRegSoli() {
    this.userForm.markAllAsTouched();
    if( this.userForm.invalid){
      return;
    }
    this.loading = true;
    let regsoli : Regsoli = {
      nameperson: this.userForm.get('nameperson')?.value,
      constitution: this.userForm.get('constitution')?.value,
      nameproject: this.userForm.get('nameproject')?.value,
      yearexperience: this.userForm.get('yearexperience')?.value,
      investment: this.userForm.get('investment')?.value,
      timeproposal: this.userForm.get('timeproposal')?.value,
      financing: this.userForm.get('financing')?.value,
      id_user: this.userForm.get('id_user')?.value,
      status: this.userForm.get('status')?.value ? 1 : 0,
    }
    this.regsoliService.puUpdateRegSoli(regsoli, this.userForm.get('id_regsoli')?.value)
        .subscribe({
          next: (resp) => {
            this.loading = false;
            this.resetRegsoli();
            this.closeModal();
          },
          error: (e) => {
            this.loading = false;
            this.resetRegsoli();
            this.closeModal();
            this.errorLogsService.logDeErrores(e, ()=> {
              const errors = e.error.errors;
              const msg = errors.regsoli ? errors.regsoli  : errors.status ? errors.status : 'Los datos no son validos, Intenta nuevamente';
              Swal.fire({ title: 'Oops...', text: msg, icon: 'info',
                showClass: { popup: 'animated animate fadeInDown' },
              });
            });
          },
          complete: () => {
            this.regsoliService.saving.emit(true);
            Swal.fire({ title: 'Exito', text: 'solicitud actualizada correctamente', icon: 'success',
              showClass: { popup: 'animated animate fadeInDown' },
            });
          }
        });
  }

  messageError(campo: string, isNumber: boolean = false): string{
    const error = this.userForm.get(campo)?.errors;
    return this.validadorService.messageError(error, isNumber);
  }

  inputValid(campo: string) : boolean {
    if(this.userForm.get(campo)?.invalid && this.userForm.get(campo)?.touched){
      return true;
    } else {
      return false;
    }
  }
  resetRegsoli() {
    this.userForm.reset({
      id_regsoli:'',
      id_user: '',
      nameactor: '',
      typeConstitution: '',
      projectPlace: '',
      yearExperience: '',
      timeProposal: '',
      financing: '',
      status: true,
    });
    this.regsoliService.setModalRegsoli = false;
  }

}
