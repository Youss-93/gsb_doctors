import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Medicine } from '../types/medicine.interface';

export interface MedicinePayload {
  id: string;
  nomCommercial: string;
  idFamille: string;
  composition: string;
  effets: string;
  contreIndications: string;
}

@Injectable({ providedIn: 'root' })
export class MedicinesService {
  private http = inject(HttpClient);

  getMedicines(): Observable<Medicine[]> {
    return this.http
      .get<{ medicines: Array<Record<string, string>> }>('http://localhost:3000/medicaments?page=1&element=1000')
      .pipe(
        map((result) =>
          (result.medicines || []).map((item) => ({
            id: item['id'] || '',
            businessName: item['business name'] || '',
            familyCode: item['idFamille'] || '',
            family: item['family'] || '',
            composition: item['composition'] || '',
            effects: item['effects'] || '',
            againstIndications: item['againstIndications'] || ''
          }))
        )
      );
  }

  createMedicine(payload: MedicinePayload): Observable<unknown> {
    return this.http.post('http://localhost:3000/medicaments', payload);
  }

  updateMedicine(id: string, payload: Partial<MedicinePayload>): Observable<unknown> {
    return this.http.put(`http://localhost:3000/medicaments/${id}`, payload);
  }

  deleteMedicine(id: string): Observable<unknown> {
    return this.http.delete(`http://localhost:3000/medicaments/${id}`);
  }
}
