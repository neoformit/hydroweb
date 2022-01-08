"""API endpoints for handling config requests."""

from django.views import View
from django.http import JsonResponse
from hydropi.server import handlers


class ConfigView(View):
    """Handle requests to get and update config variables."""

    def get(self, request):
        """Return current config as a dictionary."""
        return JsonResponse(handlers.config.get())

    def post(self, request):
        """Update config with the given data."""
        handlers.config.set(request.POST)
        return JsonResponse({}, status=201)
