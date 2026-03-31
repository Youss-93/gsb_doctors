import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Medecin } from '../types/medecin.interface';
import { Doctor } from '../types/doctor.interface';
import { convertMedecinToDoctor } from '../helpers/convert-medecin-to-doctor';

export interface DoctorPayload {
  nom: string;
  prenom: string;
  adresse: string;
  tel?: string;
  specialitecomplementaire?: string;
  departement: number;
}

@Injectable({ providedIn: 'root' })
export class DoctorsService {
  private httpClient = inject(HttpClient);

  getDoctors(): Observable<Doctor[]> {
    return this.httpClient
      .get<{ medecins: Medecin[] }>('http://localhost:3000/medecins?page=1&element=1000&nom=')
      .pipe(map((result) => result.medecins.map(convertMedecinToDoctor)));
  }

  createDoctor(payload: DoctorPayload): Observable<unknown> {
    return this.httpClient.post('http://localhost:3000/medecins', payload);
  }

  updateDoctor(id: number, payload: Partial<DoctorPayload>): Observable<unknown> {
    return this.httpClient.put(`http://localhost:3000/medecins/${id}`, payload);
  }

  deleteDoctor(id: number): Observable<unknown> {
    return this.httpClient.delete(`http://localhost:3000/medecins/${id}`);
  }
}
