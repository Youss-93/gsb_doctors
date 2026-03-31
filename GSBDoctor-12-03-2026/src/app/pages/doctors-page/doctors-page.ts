import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DoctorsService, DoctorPayload } from '../../services/doctors.service';
import { Doctor } from '../../types/doctor.interface';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doctors-page.html',
  styleUrls: ['./doctors-page.css'],
})
export class DoctorsPageComponent {
  private doctorsService = inject(DoctorsService);

  doctors = toSignal(this.doctorsService.getDoctors(), {
    initialValue: [] as Doctor[],
  });

  // Search term signal
  searchTerm = signal('');
  errorMessage = signal('');
  successMessage = signal('');
  isSubmitting = signal(false);
  editingId = signal<number | null>(null);

  form = signal({
    nom: '',
    prenom: '',
    adresse: '',
    tel: '',
    specialitecomplementaire: '',
    departement: 75
  });

  // Computed filtered doctors based on the search term
  filteredDoctors = computed(() => {
    const list = this.doctors();
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return list;
    return list.filter((d: Doctor) => {
      const fullName = (d.firstname + ' ' + d.lastname).toLowerCase();
      return (
        fullName.includes(term) ||
        (d.speciality || '').toLowerCase().includes(term) ||
        (d.email || '').toLowerCase().includes(term) ||
        (d.address || '').toLowerCase().includes(term)
      );
    });
  });

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private resetForm(): void {
    this.form.set({
      nom: '',
      prenom: '',
      adresse: '',
      tel: '',
      specialitecomplementaire: '',
      departement: 75
    });
    this.editingId.set(null);
  }

  startCreate(): void {
    this.clearMessages();
    this.resetForm();
  }

  startEdit(doctor: Doctor): void {
    this.clearMessages();
    this.editingId.set(doctor.id);
    this.form.set({
      nom: doctor.lastname,
      prenom: doctor.firstname,
      adresse: doctor.address,
      tel: doctor.phone || '',
      specialitecomplementaire: doctor.speciality || '',
      departement: doctor.department || 75
    });
  }

  updateFormField(field: 'nom' | 'prenom' | 'adresse' | 'tel' | 'specialitecomplementaire', value: string): void {
    this.form.update((current) => ({
      ...current,
      [field]: value
    }));
  }

  updateDepartement(value: string): void {
    this.form.update((current) => ({
      ...current,
      departement: Number(value) || 0
    }));
  }

  saveDoctor(): void {
    this.clearMessages();
    this.isSubmitting.set(true);

    const payload: DoctorPayload = {
      nom: this.form().nom.trim(),
      prenom: this.form().prenom.trim(),
      adresse: this.form().adresse.trim(),
      tel: this.form().tel.trim(),
      specialitecomplementaire: this.form().specialitecomplementaire.trim(),
      departement: Number(this.form().departement)
    };

    if (!payload.nom || !payload.prenom || !payload.adresse || !payload.departement) {
      this.errorMessage.set('Nom, prenom, adresse et departement sont obligatoires.');
      this.isSubmitting.set(false);
      return;
    }

    const request$ = this.editingId()
      ? this.doctorsService.updateDoctor(this.editingId() as number, payload)
      : this.doctorsService.createDoctor(payload);

    request$.subscribe({
      next: () => {
        this.successMessage.set(this.editingId() ? 'Medecin modifie.' : 'Medecin cree.');
        this.resetForm();
        this.doctors = toSignal(this.doctorsService.getDoctors(), {
          initialValue: [] as Doctor[]
        });
        this.isSubmitting.set(false);
      },
      error: () => {
        this.errorMessage.set('Operation impossible. Verifie les champs puis reessaie.');
        this.isSubmitting.set(false);
      }
    });
  }

  deleteDoctor(id: number): void {
    this.clearMessages();
    this.doctorsService.deleteDoctor(id).subscribe({
      next: () => {
        this.successMessage.set('Medecin supprime.');
        this.doctors = toSignal(this.doctorsService.getDoctors(), {
          initialValue: [] as Doctor[]
        });
      },
      error: () => {
        this.errorMessage.set('Suppression impossible (peut-etre liee a des rapports).');
      }
    });
  }
}
