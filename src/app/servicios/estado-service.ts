import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';
import { Estado } from '../interfaces/estado';

@Injectable({providedIn: 'root',})

export class EstadoService {

  private URL:string  = environment.endpoint;

  constructor(private http: HttpClient) { }

  listarEstados(): Observable<Estado[]> {
    return this.http.get<Estado[]>(`${this.URL}/Lista`);
  }

  insertarEstado(modelo: Estado): Observable<Estado> {
  return this.http.post<Estado>(`${this.URL}/Crear`, modelo);
}

actualizarEstado(modelo: Estado): Observable<Estado> {
  return this.http.put<Estado>(`${this.URL}/Actualizar`, modelo);
}

  eliminarEstado(id: number):Observable<void> {

    return this.http.delete<void>(`${this.URL}/Eliminar/${id}`);
  }

}
