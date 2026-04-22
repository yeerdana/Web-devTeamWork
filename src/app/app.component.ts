import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <h1>📝 Task Manager</h1>
        <ul class="nav-links">
          <li><a routerLink="/tasks">Tasks</a></li>
          <li *if="isAuthenticated$ | async">
            <button (click)="onLogout()" class="btn-logout">Logout</button>
          </li>
          <li *if="!(isAuthenticated$ | async)">
            <a routerLink="/login">Login</a>
          </li>
        </ul>
      </div>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar { background: #333; color: white; padding: 15px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .nav-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; padding: 0 20px; }
    .nav-links { list-style: none; display: flex; gap: 20px; }
    .nav-links a { color: white; text-decoration: none; }
    .nav-links a:hover { text-decoration: underline; }
    .btn-logout { background: #dc3545; color: white; border: none; padding: 8px 15px; border-radius: 4px; cursor: pointer; }
    .btn-logout:hover { background: #c82333; }
    .main-content { max-width: 1200px; margin: 0 auto; padding: 20px; }
  `]
})
export class AppComponent {
  isAuthenticated$;

  constructor(private authService: AuthService) {
    this.isAuthenticated$ = this.authService.currentUser$;
  }

  onLogout() {
    this.authService.logout();
  }
}
