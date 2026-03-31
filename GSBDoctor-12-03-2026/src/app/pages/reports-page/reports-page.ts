import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReportsService, ReportPayload } from '../../services/reports.service';
import { VisitReport } from '../../types/report.interface';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reports-page.html',
  styleUrl: './reports-page.css'
})
export class ReportsPageComponent {
  private reportsService = inject(ReportsService);

  reports = toSignal(this.reportsService.getReports(), {
    initialValue: [] as VisitReport[]
  });

  searchTerm = signal('');
  errorMessage = signal('');
  successMessage = signal('');
  isSubmitting = signal(false);
  editingId = signal<number | null>(null);

  form = signal({
    motive: '',
    balanceSheet: '',
    doctorId: 1,
    date: new Date().toISOString().slice(0, 10),
    medicineId: '3MYC7',
    quantity: 1
  });

  filteredReports = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const rows = this.reports();

    if (!term) return rows;

    return rows.filter((r) =>
      [String(r.id), r.date, r.motive, r.balanceSheet].join(' ').toLowerCase().includes(term)
    );
  });

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private resetForm(): void {
    this.form.set({
      motive: '',
      balanceSheet: '',
      doctorId: 1,
      date: new Date().toISOString().slice(0, 10),
      medicineId: '3MYC7',
      quantity: 1
    });
    this.editingId.set(null);
  }

  startCreate(): void {
    this.clearMessages();
    this.resetForm();
  }

  startEdit(report: VisitReport): void {
    this.clearMessages();
    this.editingId.set(report.id);
    this.form.set({
      motive: report.motive,
      balanceSheet: report.balanceSheet,
      doctorId: 1,
      date: report.date,
      medicineId: '3MYC7',
      quantity: 1
    });
  }

  updateTextField(field: 'motive' | 'balanceSheet' | 'date' | 'medicineId', value: string): void {
    this.form.update((current) => ({
      ...current,
      [field]: value
    }));
  }

  updateNumberField(field: 'doctorId' | 'quantity', value: string): void {
    this.form.update((current) => ({
      ...current,
      [field]: Number(value) || 0
    }));
  }

  saveReport(): void {
    this.clearMessages();
    this.isSubmitting.set(true);

    const payload: ReportPayload = {
      motive: this.form().motive.trim(),
      balanceSheet: this.form().balanceSheet.trim(),
      doctorId: Number(this.form().doctorId),
      date: this.form().date,
      medicineId: this.form().medicineId.trim(),
      quantity: Number(this.form().quantity)
    };

    if (!payload.motive || !payload.balanceSheet || !payload.medicineId || !payload.date) {
      this.errorMessage.set('Motif, bilan, date et medicament sont obligatoires.');
      this.isSubmitting.set(false);
      return;
    }

    const request$ = this.editingId()
      ? this.reportsService.updateReport(this.editingId() as number, payload)
      : this.reportsService.createReport(payload);

    request$.subscribe({
      next: () => {
        this.successMessage.set(this.editingId() ? 'Rapport modifie.' : 'Rapport cree.');
        this.resetForm();
        this.reports = toSignal(this.reportsService.getReports(), {
          initialValue: [] as VisitReport[]
        });
        this.isSubmitting.set(false);
      },
      error: () => {
        this.errorMessage.set('Operation impossible. Verifie tes donnees.');
        this.isSubmitting.set(false);
      }
    });
  }

  deleteReport(id: number): void {
    this.clearMessages();
    this.reportsService.deleteReport(id).subscribe({
      next: () => {
        this.successMessage.set('Rapport supprime.');
        this.reports = toSignal(this.reportsService.getReports(), {
          initialValue: [] as VisitReport[]
        });
      },
      error: () => {
        this.errorMessage.set('Suppression impossible.');
      }
    });
  }
}
