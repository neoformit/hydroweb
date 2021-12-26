"""Dashboard models."""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Config(models.Model):
    """Store live configuration to be updated by user."""

    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)


class History(models.Model):
    """Store status monitoring data."""

    ph = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(12)])
    ec = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(10)])
    depth_mm = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(600)])
    temp_c = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(80)])
    pressure_psi = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(200)])
