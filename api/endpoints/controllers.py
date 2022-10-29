"""API endpoints for handling controllers."""

import logging
import subprocess
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.contrib.admin.views.decorators import staff_member_required
from hydropi.server import handlers

from api.utils import get_json_payload

logger = logging.getLogger('django')


class ControllerView(View):
    """Handle requests for pressure controller.

    Could this just be abstracted into a generic view?
    """

    def get(self, request, controller):
        """Return status of requested controller."""
        return JsonResponse({
            'config': handlers.config.get(name=controller),
        })

    @method_decorator(staff_member_required)
    def post(self, request, controller):
        """Set requested controller status.

        The frontend is entirely responsible for passing arguments that
        are acceptable to the controller method.

        Handler expects something like:

        {
            'method': 'deliver',
            'kwargs': {
                'ml': 5,
            },
        }
        """
        try:
            data = get_json_payload(request)
            handlers.controllers.action(controller, data)
        except Exception as exc:
            logger.error(str(exc))
            return HttpResponse(str(exc), status=500)
        return HttpResponse('OK', status=201)


class ServiceView(View):
    """Allow management of the hydropi service."""

    def get(self, request):
        """Return pause state."""
        return JsonResponse({
            'state': handlers.controllers.is_paused(),
        })


    @method_decorator(staff_member_required)
    def post(self, request):
        """Handle a service management request."""
        r = None
        try:
            data = get_json_payload(request)
            handlers.controllers.set_pause()
        except Exception as exc:
            logger.error("Error encountered handling pause request:")
            logger.error(f"Exception: {str(exc)}")
            return HttpResponse(str(exc), status=500)
        return HttpResponse('OK', status=201)
