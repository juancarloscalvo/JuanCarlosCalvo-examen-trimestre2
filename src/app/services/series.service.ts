import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Serie {
  id: number;
  title: string;
  channel: string;
  rating: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SeriesService {
  private apiUrl = 'https://peticiones.online/api/series';

  http = inject(HttpClient);

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.apiUrl);
  }

  create(payload: { title: string; channel: string; rating: number }): Observable<Serie> {
    return this.http.post<Serie>(this.apiUrl, payload);
  }
}
