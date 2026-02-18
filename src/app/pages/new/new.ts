import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { SeriesService } from '../../services/series.service';

@Component({
  selector: 'app-new',
  imports: [ReactiveFormsModule],
  templateUrl: './new.html',
  styleUrl: './new.css'
})
export class New {
  mensaje = signal('');

  serieForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    channel: new FormControl('', [Validators.required]),
    rating: new FormControl<number | null>(null, [Validators.required, Validators.min(0), Validators.max(10)])
  });

  seriesService = inject(SeriesService);

  onSubmit(): void {
    if (this.serieForm.valid) {
      const payload = {
        title: this.serieForm.value.title!,
        channel: this.serieForm.value.channel!,
        rating: this.serieForm.value.rating!
      };

      this.seriesService.create(payload).subscribe({
        next: response => {
          this.mensaje.set(`Serie "${response.title}" creada correctamente`);
        },
        error: () => {
          this.mensaje.set('Error al crear la serie. Inténtalo de nuevo.');
        }
      });
    }
  }
}
