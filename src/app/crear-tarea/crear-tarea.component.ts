import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { personasUnicasValidator } from '../validadores/validador-personas-unicas';
import { RouterModule } from '@angular/router';

/**
 * Componente para crear una nueva tarea.
 * Permite al usuario agregar información sobre la tarea y las personas asociadas a ella.
 */
@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CrearTareaComponent {
  tareaForm: FormGroup; // Formulario reactivo para la tarea
  tareaDuplicada = false; // Indicador de si la tarea ya existe
  tareaAgregada = false; // Indicador de si la tarea fue agregada exitosamente

  constructor(private fb: FormBuilder) {
    // Inicializa el formulario con validaciones
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]], // Nombre de la tarea
      fechaLimite: ['', Validators.required], // Fecha límite de la tarea
      completada: [false], // Estado de la tarea (completada o no)
      personas: this.fb.array([], personasUnicasValidator), // Array de personas asociadas a la tarea
    });
  }

  /**
   * Obtiene el array de personas del formulario.
   */
  get personas(): FormArray {
    return this.tareaForm.get('personas') as FormArray;
  }

  /**
   * Agrega un nuevo grupo de persona al formulario.
   */
  agregarPersona() {
    const personaGroup = this.fb.group({
      nombreCompleto: ['', Validators.required], // Nombre completo de la persona
      edad: [null, [Validators.required, Validators.min(18)]], // Edad de la persona, debe ser mayor de 18
      habilidades: this.fb.array([]), // Array de habilidades de la persona
    });

    this.personas.push(personaGroup); // Agrega la persona al array de personas
  }

  /**
   * Elimina una persona del array por su índice.
   * @param index - Índice de la persona a eliminar
   */
  eliminarPersona(index: number) {
    this.personas.removeAt(index); // Remueve la persona del array
  }

  /**
   * Obtiene el array de habilidades de una persona por su índice.
   * @param personaIndex - Índice de la persona
   */
  getHabilidades(personaIndex: number): FormArray {
    return this.personas.at(personaIndex).get('habilidades') as FormArray;
  }

  /**
   * Agrega una nueva habilidad a una persona específica.
   * @param personaIndex - Índice de la persona a la que se le agrega la habilidad
   */
  agregarHabilidad(personaIndex: number) {
    const habilidades = this.getHabilidades(personaIndex);
    habilidades.push(
      this.fb.group({
        habilidad_value: ['', Validators.required], // Valor de la habilidad
      })
    );
  }

  /**
   * Elimina una habilidad de una persona específica por su índice.
   * @param personaIndex - Índice de la persona
   * @param habilidadIndex - Índice de la habilidad a eliminar
   */
  eliminarHabilidad(personaIndex: number, habilidadIndex: number) {
    const habilidades = this.personas
      .at(personaIndex)
      .get('habilidades') as FormArray;
    habilidades.removeAt(habilidadIndex); // Remueve la habilidad del array
  }

  /**
   * Maneja el evento de envío del formulario.
   * Valida el formulario y guarda la tarea en el localStorage.
   */
  onSubmit() {
    if (this.tareaForm.valid) {
      // Verifica si el formulario es válido
      const storedList = localStorage.getItem('angular16AANTodoList');
      const existingList = storedList ? JSON.parse(storedList) : []; // Obtiene la lista existente de tareas
      const newTarea = this.tareaForm.value; // Obtiene el valor del nuevo formulario
      const isDuplicate = existingList.some(
        (tarea: { nombre: string }) => tarea.nombre === newTarea.nombre // Verifica si ya existe una tarea con el mismo nombre
      );
      if (isDuplicate) {
        this.tareaDuplicada = true; // Marca que la tarea es duplicada
      } else {
        this.tareaDuplicada = false; // Marca que la tarea no es duplicada
        this.tareaAgregada = true; // Marca que la tarea fue agregada exitosamente
        existingList.push(this.tareaForm.value); // Agrega la nueva tarea a la lista
        localStorage.setItem(
          'angular16AANTodoList',
          JSON.stringify(existingList) // Guarda la lista actualizada en el localStorage
        );
        // Reinicia el formulario
        this.tareaForm.reset({
          completada: false,
        });
        this.personas.clear(); // Limpia el array de personas
      }
    }
  }
}
