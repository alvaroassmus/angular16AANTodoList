import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crear-tarea',
  standalone: true,
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class CrearTareaComponent {
  tareaForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tareaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)]],
      fechaLimite: ['', Validators.required],
      personas: this.fb.array([]),
    });
  }

  get personas(): FormArray {
    return this.tareaForm.get('personas') as FormArray;
  }

  getHabilidades(personaIndex: number): FormArray {
    return this.personas.at(personaIndex).get('habilidades') as FormArray;
  }

  agregarPersona() {
    const personaForm = this.fb.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(19)]],
      habilidades: this.fb.array(['']),
    });
    this.personas.push(personaForm);
  }

  eliminarPersona(index: number) {
    this.personas.removeAt(index);
  }

  agregarHabilidad(index: number) {
    const habilidades = this.personas.at(index).get('habilidades') as FormArray;
    habilidades.push(this.fb.control('', Validators.required));
  }

  eliminarHabilidad(index: number, habilidadIndex: number) {
    const habilidades = this.personas.at(index).get('habilidades') as FormArray;
    habilidades.removeAt(habilidadIndex);
  }

  onSubmit() {
    if (this.tareaForm.valid) {
      console.log(this.tareaForm.value);
      // Aquí puedes manejar la lógica para guardar la tarea
    } else {
      console.log('Formulario no válido');
    }
  }
}
