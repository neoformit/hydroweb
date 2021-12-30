"""URL routes to API endpoints."""

from django.urls import path

from . import endpoints

urlpatterns = [
    path('status', endpoints.get_status),
    path('log', endpoints.get_log),
]
