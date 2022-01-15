"""Logging configuration."""

import os

LOG_ROOT = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'logs')

if not os.path.exists(LOG_ROOT):
    os.mkdir(LOG_ROOT)

HYDROPI_LEVEL = 'INFO'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': {
            'format': (
                '%(levelname).4s | %(asctime)s | %(module)-12s| %(message)s'),
            'datefmt': '%Y-%m-%d %H:%M:%S',
            'style': "%",
        },
        'hydropi': {
            'format': (
                '%(levelname).4s | %(asctime)s'
                ' | [hydropi] %(module)-12s| %(message)s'),
            'datefmt': '%Y-%m-%d %H:%M:%S',
            'style': "%",
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'maxBytes': 1000000,  # 1MB ~ 20k rows
            'backupCount': 5,
            'filename': os.path.join(LOG_ROOT, 'main.log'),
            'mode': 'a',
            'formatter': 'standard',
        },
        'hydropi_file': {
            'delay': True,
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'maxBytes': 1000000,  # 1MB ~ 20k rows
            'backupCount': 5,
            'filename': os.path.join(LOG_ROOT, 'hydropi.log'),
            'mode': 'a',
            'formatter': 'standard',
        },
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO',
            'formatter': 'standard',
        },
        'hydropi_console': {
            'class': 'logging.StreamHandler',
            'level': 'DEBUG',
            'formatter': 'hydropi',
        },
    },
    'loggers': {
        'django': {
            'level': 'DEBUG',
            'handlers': ['console', 'file'],
            'propagate': True,
        },
        'hydropi': {
            'level': HYDROPI_LEVEL,
            'handlers': ['hydropi_console', 'hydropi_file'],
            'propagate': False,
        },
    }
}
