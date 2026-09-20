from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json


def home(request):
    return JsonResponse({
        "message": "Task Tracker API is running"
    })


@csrf_exempt
def tasks(request):

    if request.method == 'GET':
        return JsonResponse({
            "message": "GET request received"
        })

    elif request.method == 'POST':
        data = json.loads(request.body)

        return JsonResponse({
            "message": "POST request received",
            "data": data
        })

    elif request.method == 'PUT':
        data = json.loads(request.body)

        return JsonResponse({
            "message": "PUT request received",
            "data": data
        })

    elif request.method == 'DELETE':
        return JsonResponse({
            "message": "DELETE request received"
        })

    return JsonResponse({
        "message": "Method not allowed"
    }, status=405)