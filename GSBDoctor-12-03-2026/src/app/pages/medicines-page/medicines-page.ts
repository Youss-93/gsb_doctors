import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { MedicinesService, MedicinePayload } from '../../services/medicines.service';
import { Medicine } from '../../types/medicine.interface';

@Component({
  selector: 'app-medicines-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './medicines-page.html',
  styleUrl: './medicines-page.css'
})
export class MedicinesPageComponent {
  private medicinesService = inject(MedicinesService);

  medicines = toSignal(this.medicinesService.getMedicines(), {
    initialValue: [] as Medicine[]
  });

  searchTerm = signal('');
  errorMessage = signal('');
  successMessage = signal('');
  isSubmitting = signal(false);
  editingId = signal<string | null>(null);

  form = signal({
    id: '',
    businessName: '',
    familyCode: 'AA',
    composition: '',
    effects: '',
    againstIndications: ''
  });

  filteredMedicines = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const rows = this.medicines();

    if (!term) return rows;

    return rows.filter((m) =>
      [m.businessName, m.family, m.composition, m.effects, m.againstIndications]
        .join(' ')
        .toLowerCase()
        .includes(term)
    );
  });

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private resetForm(): void {
    this.form.set({
      id: '',
      businessName: '',
      familyCode: 'AA',
      composition: '',
      effects: '',
      againstIndications: ''
    });
    this.editingId.set(null);
  }

  startCreate(): void {
    this.clearMessages();
    this.resetForm();
  }

  startEdit(medicine: Medicine): void {
    this.clearMessages();
    this.editingId.set(medicine.id);
    this.form.set({
      id: medicine.id,
      businessName: medicine.businessName,
      familyCode: medicine.familyCode || 'AA',
      composition: medicine.composition,
      effects: medicine.effects,
      againstIndications: medicine.againstIndications
    });
  }

  updateFormField(
    field: 'id' | 'businessName' | 'familyCode' | 'composition' | 'effects' | 'againstIndications',
    value: string
  ): void {
    this.form.update((current) => ({
      ...current,
      [field]: value
    }));
  }

  saveMedicine(): void {
    this.clearMessages();
    this.isSubmitting.set(true);

    const payload: MedicinePayload = {
      id: this.form().id.trim(),
      nomCommercial: this.form().businessName.trim(),
      idFamille: this.form().familyCode.trim().toUpperCase(),
      composition: this.form().composition.trim(),
      effets: this.form().effects.trim(),
      contreIndications: this.form().againstIndications.trim()
    };

    if (!payload.id || !payload.nomCommercial || !payload.idFamille) {
      this.errorMessage.set('id, nom commercial et code famille sont obligatoires.');
      this.isSubmitting.set(false);
      return;
    }

    const request$ = this.editingId()
      ? this.medicinesService.updateMedicine(this.editingId() as string, {
          nomCommercial: payload.nomCommercial,
          idFamille: payload.idFamille,
          composition: payload.composition,
          effets: payload.effets,
          contreIndications: payload.contreIndications
        })
      : this.medicinesService.createMedicine(payload);

    request$.subscribe({
      next: () => {
        this.successMessage.set(this.editingId() ? 'Medicament modifie.' : 'Medicament cree.');
        this.resetForm();
        this.medicines = toSignal(this.medicinesService.getMedicines(), {
          initialValue: [] as Medicine[]
        });
        this.isSubmitting.set(false);
      },
      error: () => {
        this.errorMessage.set('Operation impossible. Verifie les champs.');
        this.isSubmitting.set(false);
      }
    });
  }

  deleteMedicine(id: string): void {
    this.clearMessages();
    this.medicinesService.deleteMedicine(id).subscribe({
      next: () => {
        this.successMessage.set('Medicament supprime.');
        this.medicines = toSignal(this.medicinesService.getMedicines(), {
          initialValue: [] as Medicine[]
        });
      },
      error: () => {
        this.errorMessage.set('Suppression impossible (peut-etre reference dans offrir).');
      }
    });
  }
}
