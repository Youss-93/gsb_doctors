import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { VisitReport } from '../types/report.interface';

export interface ReportPayload {
  balanceSheet: string;
  motive: string;
  doctorId: number;
  date: string;
  medicineId: string;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class ReportsService {
  private http = inject(HttpClient);

  getReports(): Observable<VisitReport[]> {
    return this.http.get<unknown>('http://localhost:3000/rapports?page=1&element=1000').pipe(
      map((payload) => {
        const rows = Array.isArray(payload)
          ? payload
          : ((payload as { rapports?: Array<Record<string, unknown>> }).rapports || []);

        return rows.map((row) => ({
          id: Number(row['id'] || 0),
          date: String(row['date'] || ''),
          motive: String(row['motive'] || ''),
          balanceSheet: String(row['balance sheet'] || '')
        }));
      })
    );
  }

  createReport(payload: ReportPayload): Observable<unknown> {
    return this.http.post('http://localhost:3000/rapports', payload);
  }

  updateReport(id: number, payload: Partial<ReportPayload>): Observable<unknown> {
    return this.http.put(`http://localhost:3000/rapports/${id}`, payload);
  }

  deleteReport(id: number): Observable<unknown> {
    return this.http.delete(`http://localhost:3000/rapports/${id}`);
  }
}
