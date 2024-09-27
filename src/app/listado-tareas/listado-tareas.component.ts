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
    // Aquí deberíamos cargar las tareas desde el servicio
    this.tareas = [
      {
        nombre: 'Tarea A',
        fechaLimite: '2024-10-01',
        completada: false,
        personas: [
          {
            nombreCompleto: 'Juan Pérez',
            edad: 25,
            habilidades: ['JavaScript', 'Angular'],
          },
          {
            nombreCompleto: 'María López',
            edad: 30,
            habilidades: ['TypeScript', 'CSS'],
          },
        ],
      },
      {
        nombre: 'Tarea B',
        fechaLimite: '2024-09-25',
        completada: true,
        personas: [
          {
            nombreCompleto: 'Carlos Gómez',
            edad: 40,
            habilidades: ['HTML', 'SCSS'],
          },
        ],
      },
    ];

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
}
