import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuerysComponent } from './querys/querys.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: { data: [ { title: '' , active: false },{ title: 'Home' , active: true }]}
  },
  {
    path: 'registro',
    component: RegisterComponent,
    data: { data: [ { title: 'usuarios' , active: false },{ title: 'Registro' , active: true }]}
  },
  {
    path: 'consulta',
    component: QuerysComponent,
    data: { data: [ { title: 'usuarios' , active: false },{ title: 'Consultas' , active: true }]}
  },
  { path: '**' ,redirectTo: 'registro'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule { }
