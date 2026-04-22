from django.contrib import admin
from django.urls import path
from django.views.generic import RedirectView
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from users.views import RegisterView, LoginView, LogoutView
from tasks.views import task_list, task_detail
from tasks.views_cbv import TaskStatsView, TaskFilterView

class APIRootView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        return Response({
            'message': 'Task Manager API',
            'version': '1.0.0',
            'endpoints': {
                'auth': '/api/auth/',
                'tasks': '/api/tasks/',
            }
        })

urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=False)),
    path('admin/', admin.site.urls),
    path('api/', APIRootView.as_view(), name='api_root'),
    
    # Auth endpoints
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Task endpoints (FBV)
    path('api/tasks/', task_list, name='task_list'),
    path('api/tasks/<int:pk>/', task_detail, name='task_detail'),
    
    # Task endpoints (CBV)
    path('api/tasks/stats/', TaskStatsView.as_view(), name='task_stats'),
    path('api/tasks/filter/', TaskFilterView.as_view(), name='task_filter'),
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:4200",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:4200",
]
