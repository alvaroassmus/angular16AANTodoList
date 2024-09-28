import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Componente para listar las tareas.
 * Permite al usuario ver las tareas almacenadas y filtrarlas por estado (completadas, pendientes, todas).
 */
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
  filtro = 'todas'; // Filtro actual para las tareas
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tareasFiltradas: any[] = []; // Tareas filtradas según el estado seleccionado

  /**
   * Método del ciclo de vida que se ejecuta al inicializar el componente.
   * Carga las tareas desde el localStorage y aplica el filtro inicial.
   */
  ngOnInit(): void {
    const storedList = localStorage.getItem('angular16AANTodoList'); // Obtiene la lista de tareas del localStorage
    const existingList = storedList ? JSON.parse(storedList) : []; // Parsea la lista almacenada o crea una lista vacía
    this.tareas = existingList; // Asigna las tareas a la propiedad del componente

    // Inicialmente mostramos todas las tareas
    this.filtrar('todas'); // Aplica el filtro por defecto
  }

  /**
   * Filtra las tareas según el estado seleccionado.
   * @param estado - Estado para filtrar (completadas, pendientes o todas)
   */
  filtrar(estado: string): void {
    this.filtro = estado; // Actualiza el filtro actual
    if (estado === 'completadas') {
      // Filtra tareas completadas
      this.tareasFiltradas = this.tareas.filter((tarea) => tarea.completada);
    } else if (estado === 'pendientes') {
      // Filtra tareas pendientes
      this.tareasFiltradas = this.tareas.filter((tarea) => !tarea.completada);
    } else {
      // Muestra todas las tareas
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
    // Convierte el array de habilidades a una cadena separada por comas
    return habilidades.map((h) => h.habilidad_value).join(', ');
  }
}
