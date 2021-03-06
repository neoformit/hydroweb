"""API endpoints for handling config requests."""

import logging
from pprint import pformat
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.admin.views.decorators import staff_member_required
from hydropi.server import handlers

from api.utils import get_json_payload

logger = logging.getLogger('django')


class ConfigView(View):
    """Handle requests to get and update config variables."""

    def get(self, request):
        """Return current config as a dictionary."""
        data = handlers.config.get()
        logger.debug("Data returned from hydropi.handlers.config.get:")
        logger.debug(pformat(data))
        return JsonResponse(data)

    @method_decorator(staff_member_required)
    def post(self, request):
        """Update config with the given data."""
        # Should clean this to contain only keys from the DB
        data = get_json_payload(request)
        logger.debug(
            'Received request to ConfigView.post:\n'
            f"DATA: {data}")
        handlers.config.set(data)
        return JsonResponse({}, status=201)
