import { Component, inject, OnInit, signal } from '@angular/core';
import { SeriesService, Serie } from '../../services/series.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  series = signal<Serie[]>([]);

  private seriesService = inject(SeriesService);

  ngOnInit(): void {
    this.seriesService.getSeries().subscribe(response => {
      this.series.set(response);
    });
  }
}
