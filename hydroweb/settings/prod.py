"""Production settings for hydroweb project on Django 3.2.6."""

from .base import *
from .log import LOGGING

DEBUG = False
PRODUCTION = True

ALLOWED_HOSTS = [
    'neoformit.ddns.net',
    'hydro.neoformit.com',
]
