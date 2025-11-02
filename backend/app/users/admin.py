from django.contrib import admin
from .models import M_UserProfile


@admin.register(M_UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'level', 'total_points', 'streak_days', 'is_active')
    list_filter = ('level', 'is_active', 'notifications_enabled')
    search_fields = ('user__username', 'user__email')
    ordering = ('-total_points',)
