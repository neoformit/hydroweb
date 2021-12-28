"""Dashboard API."""

from django.http import JsonResponse
from hydropi.server import utils


def get_status(request):
    """Return system status."""
    return JsonResponse(utils.get_status())
