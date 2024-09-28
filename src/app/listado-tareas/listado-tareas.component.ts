import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listado-tareas',
  standalone: true,
  templateUrl: './listado-tareas.component.html',
  styleUrls: ['./listado-tareas.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListarTareasComponent implements OnInit {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tareas: any[] = []; // Aquí almacenaremos las tareas (esto luego se integrará con el servicio)
  filtro = 'todas';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tareasFiltradas: any[] = [];

  ngOnInit(): void {
    const storedList = localStorage.getItem('angular16AANTodoList');
    const existingList = storedList ? JSON.parse(storedList) : [];
    this.tareas = existingList;

    // Inicialmente mostramos todas las tareas
    this.filtrar('todas');
  }

  filtrar(estado: string): void {
    this.filtro = estado;
    if (estado === 'completadas') {
      this.tareasFiltradas = this.tareas.filter((tarea) => tarea.completada);
    } else if (estado === 'pendientes') {
      this.tareasFiltradas = this.tareas.filter((tarea) => !tarea.completada);
    } else {
      this.tareasFiltradas = this.tareas;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onToggleCompleta(tarea: any) {
    // Encuentra el índice de la tarea en la lista existente
    const index = this.tareas.findIndex((t) => t.nombre === tarea.nombre);

    if (index !== -1) {
      // Actualiza la tarea
      this.tareas[index].completada = tarea.completada;

      // Guarda la lista actualizada en localStorage
      localStorage.setItem('angular16AANTodoList', JSON.stringify(this.tareas));
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getHabilidades(habilidades: any[]): string {
    return habilidades.map((h) => h.habilidad_value).join(', ');
  }
}
