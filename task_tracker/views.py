from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Task
import json


def home(request):
    return JsonResponse({
        "message": "Task Tracker API is running"
    })


@csrf_exempt
def tasks(request):

    if request.method == 'GET':
        task_list = Task.objects.all()

        data = []

        for task in task_list:
            data.append({
                "id": task.id,
                "title": task.title,
                "description": task.description,
                "status": task.status,
                "created_at": task.created_at,
            })

        return JsonResponse({
            "tasks": data
        })

    elif request.method == 'POST':
        data = json.loads(request.body)

        task = Task.objects.create(
            title=data.get('title'),
            description=data.get('description', ''),
            status=data.get('status', 'Pending')
        )

        return JsonResponse({
            "message": "Task created successfully",
            "task_id": task.id
        }, status=201)

    elif request.method == 'PUT':
        data = json.loads(request.body)

        task_id = data.get('id')

        try:
            task = Task.objects.get(id=task_id)

            task.title = data.get('title', task.title)
            task.description = data.get(
                'description',
                task.description
            )
            task.status = data.get(
                'status',
                task.status
            )

            task.save()

            return JsonResponse({
                "message": "Task updated successfully"
            })

        except Task.DoesNotExist:
            return JsonResponse({
                "message": "Task not found"
            }, status=404)

    elif request.method == 'DELETE':
        data = json.loads(request.body)

        task_id = data.get('id')

        try:
            task = Task.objects.get(id=task_id)
            task.delete()

            return JsonResponse({
                "message": "Task deleted successfully"
            })

        except Task.DoesNotExist:
            return JsonResponse({
                "message": "Task not found"
            }, status=404)

    return JsonResponse({
        "message": "Method not allowed"
    }, status=405)