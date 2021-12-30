"""Logging configuration."""

import os

LOG_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')

if not os.path.exists(LOG_ROOT):
    os.mkdir(LOG_ROOT)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'standard': {
            'format': '%(levelname)5s | %(asctime)s | %(module)12s: %(message)s',
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
        'console': {
            'class': 'logging.StreamHandler',
            'level': 'INFO',
            'formatter': 'standard',
        },
    },
    'loggers': {
        'django': {
            'level': 'DEBUG',
            'handlers': ['console', 'file'],
            'propagate': True,
        },
    }
}
