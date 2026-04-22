import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { TaskListComponent } from './components/task-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: TaskListComponent },
];
