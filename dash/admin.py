from django.contrib import admin

from .models import Config, History


class ConfigAdmin(admin.ModelAdmin):

    list_display = [
        'key',
        'value',
        'type',
    ]


class HistoryAdmin(admin.ModelAdmin):

    list_display = [
        'datetime',
        'depth_l',
        'pressure_psi',
        'ph',
        'ec',
        'temp_c',
    ]


admin.site.register(Config, ConfigAdmin)
admin.site.register(History, HistoryAdmin)
