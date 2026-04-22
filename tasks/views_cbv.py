from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from tasks.models import Task
from tasks.serializers import TaskSerializer

class TaskStatsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        tasks = Task.objects.filter(user=request.user)
        stats = {
            'total': tasks.count(),
            'pending': tasks.filter(status='pending').count(),
            'in_progress': tasks.filter(status='in_progress').count(),
            'completed': tasks.filter(status='completed').count(),
        }
        return Response(stats)

class TaskFilterView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        status_filter = request.query_params.get('status')
        priority_filter = request.query_params.get('priority')
        
        tasks = Task.objects.filter(user=request.user)
        
        if status_filter:
            tasks = tasks.filter(status=status_filter)
        if priority_filter:
            tasks = tasks.filter(priority=priority_filter)
        
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
