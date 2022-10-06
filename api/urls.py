"""URL routes to API endpoints."""

from django.urls import path

from . import endpoints

urlpatterns = [
    path('status/', endpoints.general.get_status),
    path('log/', endpoints.general.get_log),
    path('config/', endpoints.config.ConfigView.as_view()),
    path('controllers/<controller>/',
         endpoints.controllers.ControllerView.as_view()),
    path('service/', endpoints.controllers.ServiceView.as_view()),
    path('history/', endpoints.general.get_history),
]
