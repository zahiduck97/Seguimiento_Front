import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ProspectosComponent } from './components/prospectos/prospectos.component';


const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'prospectos', component: ProspectosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
