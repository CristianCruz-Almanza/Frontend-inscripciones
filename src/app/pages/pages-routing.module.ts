import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'usuarios',
    loadChildren: () => import('./funcionarios/funcionarios.module').then(m=> m.FuncionariosModule)
  },
  { path: '', pathMatch: 'full', redirectTo: 'usuarios'},
  { path: '**' ,redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
