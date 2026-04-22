# Task Manager System

## Project Overview
This is a simple yet powerful Task Management System (Todo/Task Manager) built using Angular + Django REST Framework architecture.

---

## Core Features
Users can:

- Register/Login (JWT Authentication)
- Create, edit, and delete tasks
- Set task priority (low, medium, high)
- Update task status (pending, in progress, completed)
- View task statistics
- Filter tasks by status and priority

---

## Project Structure

TeamWorkWeb/
├── backend/                    # Django Backend
│   ├── todo_backend/          # Main project configuration
│   ├── tasks/                 # Task application
│   │   ├── models.py          # 2 models
│   │   ├── serializers.py     # 2 serializers
│   │   ├── views.py           # 2 FBV
│   │   ├── views_cbv.py       # 2 CBV
│   │   └── admin.py
│   ├── users/                 # User application
│   │   ├── serializers.py
│   │   ├── views.py           # 3 authentication views
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/                   # Angular Frontend (English)
│   ├── auth.service.ts        # Authentication service
│   ├── task.service.ts        # Task service
│   ├── auth.interceptor.ts    # HTTP interceptor
│   ├── login.component.ts     # Login component
│   ├── task-list.component.ts # Task list component
│   ├── app.component.ts       # Main component
│   └── app.routes.ts          # Routing configuration
│
├── README.md                   # Project documentation (Chinese)
├── Postman_Collection.json     # API testing collection
└── START.sh                    # Startup script

---

## Tech Stack

### Backend
- Django 4.2+
- Django REST Framework
- djangorestframework-simplejwt (JWT Authentication)
- django-cors-headers (CORS support)
- SQLite (Database)

### Frontend
- Angular 17+
- TypeScript
- RxJS
- HttpClient
- Angular Router
- FormsModule

---

## Data Models

### Backend Models (2)

#### Task
- title
- description
- status (pending / in_progress / completed)
- priority (low / medium / high)
- due_date
- user (ForeignKey)
- created_at, updated_at

#### TaskCategory
- name
- user (ForeignKey)
- created_at

---

## API Endpoints

### Authentication (3)
- POST /api/auth/register/ – Register
- POST /api/auth/login/ – Login
- POST /api/auth/logout/ – Logout

### Tasks - FBV (2)
- GET/POST /api/tasks/ – List/Create tasks
- GET/PUT/DELETE /api/tasks/<id>/ – Retrieve/Update/Delete task

### Tasks - CBV (2)
- GET /api/tasks/stats/ – Task statistics
- GET /api/tasks/filter/ – Filter tasks

---

## Serializers (2)
- TaskCategorySerializer (Serializer) – Basic serialization
- TaskSerializer (ModelSerializer) – Model-based serialization

---

## Views

### FBV (2)
- task_list – GET/POST task list
- task_detail – GET/PUT/DELETE single task

### CBV (2)
- TaskStatsView – Get statistics
- TaskFilterView – Filter tasks

### Authentication Views (3)
- RegisterView – User registration
- LoginView – User login
- LogoutView – User logout

---

## Frontend Features

### Services (2)
- AuthService – User authentication
- TaskService – Task management

### Components (2)
- LoginComponent – Login page
- TaskListComponent – Task list

### Functionality
- HTTP Interceptor (auto attach JWT token)
- Routing (3+ routes)
- Form controls (4+ using ngModel)
- Event handling (4+ events)
- Error handling
- Responsive design

---

## Assignment Requirements Completion

### Frontend (9/9)
- Interface and services interact with backend API
- At least 4 click events triggering API calls
- At least 4 form controls using ngModel
- Basic CSS styling
- Routing module (3+ named routes)
- Conditional rendering (@for and @if)
- JWT authentication + HTTP interceptor
- At least 1 Angular service
- API error handling

### Backend (11/11)
- At least 4 models (Task, TaskCategory, User, built-in models)
- At least 2 ForeignKey relationships (Task → User, TaskCategory → User)
- At least 2 serializers (TaskCategorySerializer, TaskSerializer)
- At least 2 ModelSerializers (TaskDetailSerializer)
- At least 2 FBV (task_list, task_detail)
- At least 2 CBV (TaskStatsView, TaskFilterView)
- Token authentication (JWT + login/logout)
- Full CRUD operations (tasks)
- Linked to authenticated user (request.user)
- CORS configuration
- Postman collection

---

## Quick Start

### Backend
cd ~/Desktop/TeamWorkWeb/backend  
source venv/bin/activate  
python manage.py migrate  
python manage.py createsuperuser  
python manage.py runserver  

Access:
- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/

---

### Frontend
cd ~/Desktop/TeamWorkWeb/frontend/shopping-frontend  
npm install  
ng serve  

Access:
- http://localhost:4200

---

## Defense Demo Flow (5–7 minutes)

### 1. Project Introduction (1 min)
- Project: Task Manager
- Features: Authentication, task management, statistics
- Tech: Angular + Django REST Framework

### 2. Architecture (2 min)
- Frontend-backend separation
- JWT authentication flow
- Database model relationships

### 3. Code Demo (1 min)
- Key models (Task, TaskCategory)
- Serializer implementation
- Service communication

### 4. Feature Demo (2–3 min)
- User login
- Create task
- Update task status
- View statistics
- Filter tasks

### 5. Q&A (2–3 min)
- Answer questions

---

## Team Information
- Adebieke Yeerdana (24B030037)
- Zharkyn Fariza (24B030035)

Project Name: Task Manager  
Completion Date: 2026-04-21

---

## Project Highlights
- Clean and efficient code
- Full functionality
- Easy to extend
- Modern technologies (Angular 17+, DRF, JWT)
- Frontend-backend separation
- RESTful API design
- Error handling
- Well-structured code
- Complete documentation (README, API, Postman)

---

Project completed.
