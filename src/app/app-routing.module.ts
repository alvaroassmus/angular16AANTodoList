import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearTareaComponent } from './crear-tarea/crear-tarea.component';
import { ListarTareasComponent } from './listado-tareas/listado-tareas.component';

const routes: Routes = [
  { path: 'crear-tarea', component: CrearTareaComponent },
  { path: 'listar-tareas', component: ListarTareasComponent },
  { path: '', redirectTo: '/listar-tareas', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
