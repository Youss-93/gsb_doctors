import { Medecin } from '../types/medecin.interface';
import { Doctor } from '../types/doctor.interface';

// Fonction classique (pas fléchée) 
export function convertMedecinToDoctor(medecin: Medecin): Doctor {
  return {
    id: medecin.id,
    firstname: medecin.prenom,
    lastname: medecin.nom,
    email: medecin.email || '',
    speciality: medecin.specialite || medecin['specialitecomplementaire'] || '',
    address: medecin.adresse || '',
    phone: medecin.tel || ''
  };
}