from django.contrib import admin
from .models import M_Transport


@admin.register(M_Transport)
class TransportAdmin(admin.ModelAdmin):
    list_display = ('user', 'transport_type', 'distance_km', 'total_co2', 'trip_date')
    list_filter = ('transport_type', 'trip_date')
    search_fields = ('user__username', 'origin', 'destination')
    ordering = ('-trip_date',)
