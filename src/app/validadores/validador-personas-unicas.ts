import { AbstractControl, ValidationErrors } from '@angular/forms';

export function personasUnicasValidator(
  control: AbstractControl
): ValidationErrors | null {
  const personas = control.value;
  // Verificar si 'personas' está definido y es un array
  if (!personas || !Array.isArray(personas)) {
    return null;
  }

  const nombres = personas
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((persona: any) => persona?.nombreCompleto) // Asegurarse de que cada persona tenga 'nombre'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((persona: any) => persona.nombreCompleto.toLowerCase().trim());

  for (let i = 0; i < nombres.length; i++) {
    for (let j = i + 1; j < nombres.length; j++) {
      if (nombres[i] === nombres[j]) {
        return { nombreDuplicado: true };
      }
    }
  }

  return null;
}
