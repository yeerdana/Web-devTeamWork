import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-container">
      <div class="task-header">
        <h2>My Tasks</h2>
        <div class="stats">
          <span class="stat">Total: {{ stats.total }}</span>
          <span class="stat pending">Pending: {{ stats.pending }}</span>
          <span class="stat progress">In Progress: {{ stats.in_progress }}</span>
          <span class="stat completed">Completed: {{ stats.completed }}</span>
        </div>
      </div>

      <div class="task-form">
        <input type="text" [(ngModel)]="newTask.title" placeholder="Task title" class="input-field" />
        <textarea [(ngModel)]="newTask.description" placeholder="Description" class="input-field"></textarea>
        <select [(ngModel)]="newTask.priority" class="input-field">
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <button (click)="onAddTask()" class="btn btn-add">Add Task</button>
      </div>

      <div class="filters">
        <select [(ngModel)]="filterStatus" (change)="onFilter()" class="filter-select">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div class="tasks-list">
        <div *ngFor="let task of tasks" class="task-item" [ngClass]="'priority-' + task.priority">
          <div class="task-header-item">
            <h3>{{ task.title }}</h3>
            <span class="status" [ngClass]="'status-' + task.status">{{ task.status }}</span>
          </div>
          <p *ngIf="task.description" class="description">{{ task.description }}</p>
          <div class="task-actions">
            <select [(ngModel)]="task.status" (change)="onUpdateTask(task)" class="status-select">
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <button (click)="onDeleteTask(task.id)" class="btn btn-delete">Delete</button>
          </div>
        </div>
      </div>
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  `,
  styles: [`
    .task-container { max-width: 800px; margin: 0 auto; padding: 20px; }
    .task-header { margin-bottom: 30px; }
    .stats { display: flex; gap: 15px; margin-top: 10px; }
    .stat { padding: 8px 12px; background: #f0f0f0; border-radius: 4px; font-size: 14px; }
    .stat.pending { background: #fff3cd; }
    .stat.progress { background: #cfe2ff; }
    .stat.completed { background: #d1e7dd; }
    .task-form { background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .input-field { width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; }
    .btn { padding: 10px 20px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    .btn-add { width: 100%; }
    .btn-delete { background: #dc3545; padding: 5px 10px; font-size: 12px; }
    .filters { margin-bottom: 20px; }
    .filter-select { padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    .tasks-list { display: grid; gap: 15px; }
    .task-item { border: 1px solid #ddd; padding: 15px; border-radius: 8px; background: white; }
    .task-item.priority-high { border-left: 4px solid #dc3545; }
    .task-item.priority-medium { border-left: 4px solid #ffc107; }
    .task-item.priority-low { border-left: 4px solid #28a745; }
    .task-header-item { display: flex; justify-content: space-between; align-items: center; }
    .status { padding: 4px 8px; border-radius: 4px; font-size: 12px; }
    .status-pending { background: #fff3cd; }
    .status-in_progress { background: #cfe2ff; }
    .status-completed { background: #d1e7dd; }
    .description { color: #666; margin: 10px 0; }
    .task-actions { display: flex; gap: 10px; margin-top: 10px; }
    .status-select { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
    .error { color: #dc3545; }
  `]
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  stats = { total: 0, pending: 0, in_progress: 0, completed: 0 };
  errorMessage = '';
  filterStatus = '';
  newTask = { title: '', description: '', priority: 'medium' };

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
    this.loadStats();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load tasks';
      }
    });
  }

  loadStats() {
    this.taskService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (err) => {
        console.error('Failed to load stats');
      }
    });
  }

  onAddTask() {
    if (this.newTask.title.trim()) {
      this.taskService.createTask(this.newTask).subscribe({
        next: () => {
          this.newTask = { title: '', description: '', priority: 'medium' };
          this.loadTasks();
          this.loadStats();
        },
        error: (err) => {
          this.errorMessage = 'Failed to create task';
        }
      });
    }
  }

  onUpdateTask(task: any) {
    this.taskService.updateTask(task.id, { status: task.status }).subscribe({
      next: () => {
        this.loadStats();
      },
      error: (err) => {
        this.errorMessage = 'Failed to update task';
      }
    });
  }

  onDeleteTask(id: number) {
    if (confirm('Are you sure?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          this.loadTasks();
          this.loadStats();
        },
        error: (err) => {
          this.errorMessage = 'Failed to delete task';
        }
      });
    }
  }

  onFilter() {
    if (this.filterStatus) {
      this.taskService.filterTasks(this.filterStatus).subscribe({
        next: (data) => {
          this.tasks = data;
        },
        error: (err) => {
          this.errorMessage = 'Failed to filter tasks';
        }
      });
    } else {
      this.loadTasks();
    }
  }
}
