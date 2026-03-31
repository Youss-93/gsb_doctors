import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { AuthTicket, LoginCredentials } from '../types/auth.model';

/**
 * Service de gestion de l'authentification
 * Utilise les Signals pour un état réactif et les Observables pour les opérations asynchrones
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // URL de l'API REST GSB - Liée au backend Node.js local
  private readonly API_URL = 'http://localhost:3000';

  // Clé pour le stockage dans localStorage
  private readonly TICKET_KEY = 'gsb_ticket';

  // Injection de HttpClient avec inject()
  private http = inject(HttpClient);

  // ===== ÉTAT RÉACTIF AVEC SIGNALS =====

  /**
   * Signal indiquant si l'utilisateur est connecté
   */
  readonly isAuthenticated = signal<boolean>(false);

  /**
   * Signal contenant le ticket actuel (null si non connecté)
   */
  readonly currentTicket = signal<string | null>(null);

  /**
   * Signal contenant le nom d'utilisateur
   */
  readonly currentUser = signal<string | null>(null);

  /**
   * Signal contenant le message d'erreur (null si pas d'erreur)
   */
  readonly errorMessage = signal<string | null>(null);

  constructor() {
    // Vérifier s'il existe un ticket stocké au démarrage
    this.checkStoredTicket();
  }

  /**
   * Vérifie si un ticket est stocké dans localStorage
   * et restaure la session si valide
   */
  private checkStoredTicket(): void {
    const storedTicket = localStorage.getItem(this.TICKET_KEY);

    if (storedTicket) {
      try {
        // Parser les données JSON
        const authData = JSON.parse(storedTicket);

        // Restaurer l'état
        this.currentTicket.set(authData.ticket);
        this.currentUser.set(authData.username);
        this.isAuthenticated.set(true);
      } catch (error) {
        // Si erreur de parsing, supprimer les données corrompues
        localStorage.removeItem(this.TICKET_KEY);
      }
    }
  }

  /**
   * Connexion de l'utilisateur
   *@paramcredentials Informations de connexion
   *@returns Observable<boolean> qui émet true si succès, false sinon
   */
  login(credentials: LoginCredentials): Observable<boolean> {
    this.errorMessage.set(null);
    const cleanedLogin = credentials.login.trim();

    // Simple POST request
    return this.http
      .post<{ data: string }>(`${this.API_URL}/connexion`, {
        login: cleanedLogin,
        password: credentials.password,
      })
      .pipe(
        tap((response) => {
          const token = response.data;
          this.currentTicket.set(token);
          this.currentUser.set(cleanedLogin);
          this.isAuthenticated.set(true);
          localStorage.setItem(
            this.TICKET_KEY,
            JSON.stringify({
              ticket: token,
              username: cleanedLogin,
            }),
          );
        }),
        map(() => true),
        catchError((error) => {
          console.error('Erreur connexion:', error);
          this.errorMessage.set('Identifiants invalides. Veuillez réessayer.');
          this.isAuthenticated.set(false);
          return of(false);
        }),
      );
  }

  /**
   * Déconnexion de l'utilisateur
   * Supprime le ticket et réinitialise l'état
   */
  logout(): void {
    this.currentTicket.set(null);
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    localStorage.removeItem(this.TICKET_KEY);
  }

  /**
   * Récupère le ticket actuel pour les requêtes API
   *@returns string | null
   */
  getTicket(): string | null {
    return this.currentTicket();
  }
}
