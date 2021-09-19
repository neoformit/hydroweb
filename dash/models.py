"""Dashboard models."""

from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Config(models.Model):
    """Store live configuration to be updated by user.

    # Timing
    SWEEP_CYCLE_MINUTES
    MIST_CYCLE_MINUTES
    MIST_DURATION_SECONDS
    MIX_PUMP_SECONDS
    MIX_ADDITION_DELAY_SECONDS
    WATER_FILL_INTERVAL_SECONDS
    WATER_FILL_MAX_SECONDS
    MEDIAN_SAMPLE_DELAY_SECONDS
    QUIET_TIME_START
    QUIET_TIME_END

    # Pressure monitoring
    MIN_PRESSURE_PSI
    MAX_PRESSURE_PSI
    ALERT_PRESSURE_PSI

    # PH monitoring
    PH_TARGET
    PH_LIMIT_WARN
    PH_LIMIT_DANGER
    PH_ACTION_THRESHOLD
    PH_ACTION_THRESHOLD

    # EC monitoring
    EC_TARGET
    EC_LIMIT_WARN
    EC_LIMIT_DANGER
    EC_ACTION_THRESHOLD
    EC_ADDITION_SECONDS

    # Water level monitoring
    TANK_HEIGHT_MM
    DEPTH_MAXIMUM_MM
    DEPTH_LIMIT_WARN
    DEPTH_LIMIT_DANGER
    DEPTH_ACTION_THRESHOLD
    """

    key = models.CharField(max_length=100)
    value = models.CharField(max_length=100)


class Measurement(models.Model):
    """Store status monitoring data."""

    ph = models.FloatField(
        validators=[MinValueValidator(1), MaxValueValidator(12)])
    ec = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(10)])
    depth_mm = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(700)])
    temp_c = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(40)])
    pressure_psi = models.FloatField(
        validators=[MinValueValidator(0), MaxValueValidator(170)])
