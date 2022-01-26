"""Dashboard API."""

from django.http import JsonResponse
from hydropi.server import handlers

from dash.models import History


def get_status(request):
    """Return system status."""
    return JsonResponse(handlers.generic.get_status())


def get_log(request):
    """Return the most recent hydropi log output."""
    return JsonResponse({'text': handlers.generic.get_logs()})


def get_history(request):
    """Return historical readings."""
    return JsonResponse(History.fetch())
