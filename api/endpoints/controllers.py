"""API endpoints for handling controllers."""

from django.views import View
from django.http import HttpResponse, JsonResponse
from hydropi.server import handlers

DOSE_CONTROLLERS = [
    'ECController',
    'PHController',
]


class ControllerView(View):
    """Handle requests for pressure controller.

    Could this just be abstracted into a generic view?
    """

    def get(self, request, controller):
        """Return status of requested controller."""
        return JsonResponse({
            'config': handlers.config.get(name=controller),
        })

    def post(self, request, controller):
        """Set requested controller status.

        The frontend is entirely responsible for passing arguments that
        are acceptable to the controller method.

        Handler expects something like:

        {
            'action': {
                'name': 'ec',
                'method': 'deliver',
                'ml': 5,
            }
        }
        """
        try:
            handlers.controllers.action(controller, request.POST['action'])
        except Exception as exc:
            return HttpResponse(str(exc), status=400)
        return HttpResponse('OK', status=201)
