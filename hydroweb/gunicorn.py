"""Gunicorn configuration."""

workers = 1

# Environment variables
raw_env = [
    "DJANGO_SETTINGS_MODULE=hydroweb.settings.prod"
    ]
