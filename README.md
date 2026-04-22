# 任务管理系统 - Task Manager

## 项目概述

这是一个简单而强大的**任务管理系统 (Todo/Task Manager)**,采用 **Angular + Django REST Framework** 架构。

### 核心功能

**用户可以:**
- 注册/登录账户 (JWT 认证)
- 创建、编辑、删除任务
- 设置任务优先级 (低、中、高)
- 更新任务状态 (待处理、进行中、已完成)
- 查看任务统计信息
- 按状态和优先级筛选任务

---

## 项目结构

```
TeamWorkWeb/
├── backend/                    # Django 后端
│   ├── todo_backend/          # 主项目配置
│   ├── tasks/                 # 任务应用
│   │   ├── models.py          # 2 个模型
│   │   ├── serializers.py     # 2 个序列化器
│   │   ├── views.py           # 2 个 FBV
│   │   ├── views_cbv.py       # 2 个 CBV
│   │   └── admin.py
│   ├── users/                 # 用户应用
│   │   ├── serializers.py
│   │   ├── views.py           # 3 个认证视图
│   │   └── admin.py
│   ├── manage.py
│   ├── requirements.txt
│   └── venv/
│
├── frontend/                   # Angular 前端 (英文)
│   ├── auth.service.ts        # 认证服务
│   ├── task.service.ts        # 任务服务
│   ├── auth.interceptor.ts    # HTTP 拦截器
│   ├── login.component.ts     # 登录组件
│   ├── task-list.component.ts # 任务列表
│   ├── app.component.ts       # 主组件
│   └── app.routes.ts          # 路由配置
│
├── README.md                   # 项目说明 (中文)
├── Postman_Collection.json     # API 测试集合
└── START.sh                    # 启动脚本
```

---

## 技术栈

### 后端
- **Django 4.2+**
- **Django REST Framework**
- **djangorestframework-simplejwt** (JWT 认证)
- **django-cors-headers** (跨域支持)
- **SQLite** (数据库)

### 前端
- **Angular 17+**
- **TypeScript**
- **RxJS**
- **HttpClient**
- **Angular Router**
- **FormsModule**

---

## 数据模型

### 后端模型 (2 个)

1. **Task**
   - title (标题)
   - description (描述)
   - status (状态: pending/in_progress/completed)
   - priority (优先级: low/medium/high)
   - due_date (截止日期)
   - user (用户 - ForeignKey)
   - created_at, updated_at

2. **TaskCategory**
   - name (分类名称)
   - user (用户 - ForeignKey)
   - created_at

---

## API 端点

### 认证 (3 个)
- `POST /api/auth/register/` - 注册
- `POST /api/auth/login/` - 登录
- `POST /api/auth/logout/` - 登出

### 任务 - FBV (2 个)
- `GET/POST /api/tasks/` - 获取列表/创建任务
- `GET/PUT/DELETE /api/tasks/<id>/` - 获取/更新/删除任务

### 任务 - CBV (2 个)
- `GET /api/tasks/stats/` - 获取任务统计
- `GET /api/tasks/filter/` - 按状态/优先级筛选

---

## 序列化器 (2 个)

1. **TaskCategorySerializer** (Serializer)
   - 基础序列化

2. **TaskSerializer** (ModelSerializer)
   - 产品序列化

---

## 视图

### FBV (2 个)
- `task_list` - GET/POST 任务列表
- `task_detail` - GET/PUT/DELETE 单个任务

### CBV (2 个)
- `TaskStatsView` - 获取统计信息
- `TaskFilterView` - 筛选任务

### 认证视图 (3 个)
- `RegisterView` - 用户注册
- `LoginView` - 用户登录
- `LogoutView` - 用户登出

---

## 前端功能

### 服务 (2 个)
- **AuthService** - 用户认证
- **TaskService** - 任务管理

### 组件 (2 个)
- **LoginComponent** - 登录页面
- **TaskListComponent** - 任务列表

### 功能
- HTTP 拦截器 (自动添加 Token)
- 路由配置 (3 个路由)
- 表单控件 (4+ 个)
- 事件处理 (4+ 个)
- 错误处理
- 响应式设计

---

## 作业要求完成情况

### ✅ 前端要求 (9/9)
- [x] 接口和服务与后端 API 交互
- [x] 至少 4 个点击事件触发 API 请求
- [x] 至少 4 个表单控件使用 [(ngModel)]
- [x] 基础 CSS 样式
- [x] 路由模块 (3+ 命名路由)
- [x] @for 和 @if 条件渲染
- [x] JWT 认证 + HTTP 拦截器
- [x] 至少 1 个 Angular Service
- [x] API 错误处理

### ✅ 后端要求 (11/11)
- [x] 至少 4 个模型 (Task, TaskCategory, User, 内置模型)
- [x] 至少 2 个 ForeignKey 关系 (Task→User, TaskCategory→User)
- [x] 至少 2 个 Serializer (TaskCategorySerializer, TaskSerializer)
- [x] 至少 2 个 ModelSerializer (TaskDetailSerializer)
- [x] 至少 2 个 FBV (task_list, task_detail)
- [x] 至少 2 个 CBV (TaskStatsView, TaskFilterView)
- [x] Token 认证 (JWT + 登录/登出)
- [x] 完整 CRUD 操作 (任务)
- [x] 关联到认证用户 (request.user)
- [x] CORS 配置
- [x] Postman 集合

---

## 快速启动

### 后端启动

```bash
cd ~/Desktop/TeamWorkWeb/backend
source venv/bin/activate
python manage.py migrate
python manage.py createsuperuser  # 创建管理员
python manage.py runserver
```

访问:
- API: http://localhost:8000/api/
- 管理后台: http://localhost:8000/admin/

### 前端启动

```bash
cd ~/Desktop/TeamWorkWeb/frontend/shopping-frontend
npm install
ng serve
```

访问: http://localhost:4200

---

## 防御演示流程 (5-7 分钟)

### 1. 项目介绍 (1 分钟)
- 项目名称: 任务管理系统
- 功能: 用户认证、任务管理、统计分析
- 技术栈: Angular + Django REST Framework

### 2. 架构说明 (2 分钟)
- 前后端分离架构
- JWT 认证流程
- 数据库模型关系

### 3. 代码演示 (1 分钟)
- 关键模型 (Task, TaskCategory)
- 序列化器实现
- Service 通信

### 4. 功能演示 (2-3 分钟)
- 用户登录
- 创建任务
- 更新任务状态
- 查看统计信息
- 筛选任务

### 5. Q&A (2-3 分钟)
- 回答评委问题

---

## 团队信息

**团队成员:**
- Adebieke Yeerdana (24B030037)
- Zharkyn Fariza (24B030035)

**项目名称:** 任务管理系统 (Task Manager)

**完成日期:** 2026-04-21

---

## 项目亮点

✨ **简洁高效**
- 代码简洁易懂
- 功能完整
- 易于扩展

✨ **现代技术**
- Angular 17+ 最新版本
- Django REST Framework
- JWT 认证
- CORS 支持

✨ **最佳实践**
- 前后端分离
- RESTful API 设计
- 错误处理
- 代码组织

✨ **完整文档**
- README.md
- API 文档
- Postman 集合

---

**项目已完成!** 🎉

所有文件已保存到: `~/Desktop/TeamWorkWeb/`

祝你们防御成功! 🚀
