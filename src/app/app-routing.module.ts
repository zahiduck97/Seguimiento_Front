import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { ProspectosComponent } from './components/prospectos/prospectos.component';
import { NormasComponent } from './components/normas/normas.component';
import { TipoServicioComponent } from './components/tipo-servicio/tipo-servicio.component';
import { CostosComponent } from './components/costos/costos.component';
import { ServiciosComponent } from './components/servicios/servicios.component';


const routes: Routes = [
  { path: 'empresas', component: EmpresasComponent },
  { path: 'prospectos', component: ProspectosComponent },
  { path: 'normas', component: NormasComponent },
  { path: 'tipo-servicio', component: TipoServicioComponent },
  { path: 'costos', component: CostosComponent },
  { path: 'servicios', component: ServiciosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
