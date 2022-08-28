import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuncionariosRoutingModule } from './funcionarios-routing.module';
import { RegisterComponent } from './register/register.component';
import { ModalNewUpdateComponent } from './register/components/modal-new-update/modal-new-update.component';
import { TableRegsolisComponent } from './register/components/table-funcionarios/table-funcionarios.component';
import { QuerysComponent } from './querys/querys.component';
import {ToolbarModule} from 'primeng/toolbar';
import { PagesModule } from '../pages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { KeyFilterModule } from 'primeng/keyfilter';
import { ModalActuadosComponent } from './register/components/modal-actuados/modal-actuados.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { HomeComponent } from './home/home.component';
import { ModalNewActuadoComponent } from './register/components/modal-new-actuado/modal-new-actuado.component';
import { ModalObservationComponent } from './register/components/modal-observation/modal-observation.component';
import { ModalNewObservationComponent } from './register/components/modal-new-observation/modal-new-observation.component';
import {CalendarModule} from 'primeng/calendar';
import { ModalNewUser } from './register/components/new-regsoli-modal/new-user-modal.component';
@NgModule({
  declarations: [
    RegisterComponent,
    ModalNewUpdateComponent,
    TableRegsolisComponent,
    QuerysComponent,
    ModalActuadosComponent,
    HomeComponent,
    ModalNewActuadoComponent,
    ModalObservationComponent,
    ModalNewObservationComponent,
    ModalNewUser
  ],
  imports: [
    CommonModule,
    FuncionariosRoutingModule,
    ToolbarModule,
    PagesModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayPanelModule,
    KeyFilterModule,
    ProgressSpinnerModule,
    CalendarModule
  ]
})
export class FuncionariosModule { }
