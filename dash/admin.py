from django.contrib import admin

from .models import Config, History


class ConfigAdmin(admin.ModelAdmin):
    """Administer config items."""

    list_display = [
        'key',
        'value',
        'type',
    ]


class HistoryAdmin(admin.ModelAdmin):
    """Administer history items."""

    list_display = [
        'datetime',
        'volume_l',
        'pressure_psi',
        'ph',
        'ec',
        'temp_c',
    ]


admin.site.register(Config, ConfigAdmin)
admin.site.register(History, HistoryAdmin)
