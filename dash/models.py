"""Dashboard models."""

from datetime import datetime, timedelta
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Config(models.Model):
    """Store live configuration to be updated by user."""

    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)
    type = models.CharField(max_length=5)


class History(models.Model):
    """Store status monitoring data."""

    datetime = models.DateTimeField(auto_now_add=True)
    ph = models.FloatField(
        null=True,
        validators=[MinValueValidator(1), MaxValueValidator(12)])
    ec = models.FloatField(
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(10)])
    depth_l = models.IntegerField(
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(600)])
    temp_c = models.FloatField(
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(80)])
    pressure_psi = models.FloatField(
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(200)])

    @classmethod
    def fetch(cls, days=7, hours=None, minutes=None):
        """Serialize and return recent history as a list."""
        td_kwargs = {
            k: v
            for k, v in (
                ('days', days),
                ('hours', hours),
                ('minutes', minutes),
            )
            if v
        }
        since = datetime.now() - timedelta(**td_kwargs)
        history = cls.objects.filter(datetime__gt=since)
        return [
            {
                'datetime': {
                    'data': h.datetime.strftime("%Y-%m-%d %H:%M:%S"),
                    'text': 'Date'
                },
                'ec': {
                    'data': h.ec,
                    'text': 'EC (μS)'
                },
                'volume': {
                    'data': h.depth_l,
                    'text': 'Volume (L)'
                },
                'temp_c': {
                    'data': h.temp_c,
                    'text': 'Temp (°C)'
                },
                'pressure_psi': {
                    'data': h.pressure_psi,
                    'text': 'Pressure (PSI)'
                },
            }
            for h in history
        ]
