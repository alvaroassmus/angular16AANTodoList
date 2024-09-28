import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.component.html',
  styleUrls: ['./crear-tarea.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
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
    console.log(this.tareaForm);
    if (this.tareaForm.valid) {
      console.log(this.tareaForm.value);
    }
  }
}
