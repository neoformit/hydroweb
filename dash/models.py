"""Dashboard models."""

from django.db import models


class Config(models.Model):
    """Store live configuration to be updated by user."""

    # Timing
    SWEEP_CYCLE_MINUTES = models.IntegerField(null=True)
    MIST_CYCLE_MINUTES = models.IntegerField(null=True)
    MIST_DURATION_SECONDS = models.IntegerField(null=True)
    MIX_PUMP_SECONDS = models.IntegerField(null=True)
    MIX_ADDITION_DELAY_SECONDS = models.IntegerField(null=True)
    WATER_FILL_INTERVAL_SECONDS = models.IntegerField(null=True)
    WATER_FILL_MAX_SECONDS = models.IntegerField(null=True)
    MEDIAN_SAMPLE_DELAY_SECONDS = models.FloatField(null=True)
    QUIET_TIME_START: models.TimeField(null=True)
    QUIET_TIME_END: models.TimeField(null=True)

    # Pressure monitoring
    MIN_PRESSURE_PSI = models.IntegerField(null=True)
    MAX_PRESSURE_PSI = models.IntegerField(null=True)
    ALERT_PRESSURE_PSI = models.IntegerField(null=True)

    # PH monitoring
    PH_TARGET = models.FloatField(null=True)
    PH_LIMIT_WARN = models.FloatField(null=True)
    PH_LIMIT_DANGER = models.FloatField(null=True)
    PH_ACTION_THRESHOLD = models.FloatField(null=True)
    PH_ACTION_THRESHOLD = models.FloatField(null=True)

    # EC monitoring
    EC_TARGET = models.FloatField(null=True)
    EC_LIMIT_WARN = models.FloatField(null=True)
    EC_LIMIT_DANGER = models.FloatField(null=True)
    EC_ACTION_THRESHOLD = models.FloatField(null=True)
    EC_ADDITION_SECONDS = models.FloatField(null=True)

    # Water level monitoring
    TANK_HEIGHT_MM = models.IntegerField(null=True)
    DEPTH_MAXIMUM_MM = models.IntegerField(null=True)
    DEPTH_LIMIT_WARN = models.FloatField(null=True)
    DEPTH_LIMIT_DANGER = models.FloatField(null=True)
    DEPTH_ACTION_THRESHOLD = models.FloatField(null=True)


class Monitor(models.Model):
    """Store status monitoring data."""

    pass
