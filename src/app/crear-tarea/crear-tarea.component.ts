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

@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CrearTareaComponent {
  tareaForm: FormGroup;
  tareaDuplicada = false;
  tareaAgregada = false;

  constructor(private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', Validators.required],
      completada: [false],
      personas: this.fb.array([], personasUnicasValidator),
    });
  }

  get personas(): FormArray {
    return this.tareaForm.get('personas') as FormArray;
  }

  agregarPersona() {
    const personaGroup = this.fb.group({
      nombreCompleto: ['', Validators.required],
      edad: [null, [Validators.required, Validators.min(18)]],
      habilidades: this.fb.array([]),
    });

    this.personas.push(personaGroup);
  }

  eliminarPersona(index: number) {
    this.personas.removeAt(index);
  }

  getHabilidades(personaIndex: number): FormArray {
    return this.personas.at(personaIndex).get('habilidades') as FormArray;
  }

  agregarHabilidad(personaIndex: number) {
    const habilidades = this.getHabilidades(personaIndex);
    habilidades.push(
      this.fb.group({
        habilidad_value: ['', Validators.required],
      })
    );
  }

  eliminarHabilidad(personaIndex: number, habilidadIndex: number) {
    const habilidades = this.personas
      .at(personaIndex)
      .get('habilidades') as FormArray;
    habilidades.removeAt(habilidadIndex);
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      const storedList = localStorage.getItem('angular16AANTodoList');
      const existingList = storedList ? JSON.parse(storedList) : [];
      const newTarea = this.tareaForm.value;
      const isDuplicate = existingList.some(
        (tarea: { nombre: string }) => tarea.nombre === newTarea.nombre
      );
      if (isDuplicate) {
        this.tareaDuplicada = true;
      } else {
        this.tareaDuplicada = false;
        this.tareaAgregada = true;
        existingList.push(this.tareaForm.value);
        localStorage.setItem(
          'angular16AANTodoList',
          JSON.stringify(existingList)
        );
        this.tareaForm.reset({
          completada: false,
        });
        this.personas.clear();
      }
    }
  }
}
