from django.contrib import admin
from .models import M_Meal


@admin.register(M_Meal)
class MealAdmin(admin.ModelAdmin):
    list_display = ('user', 'meal_type', 'description', 'total_co2', 'meal_date', 'is_vegetarian', 'is_vegan')
    list_filter = ('meal_type', 'is_vegetarian', 'is_vegan', 'meal_date')
    search_fields = ('user__username', 'description')
    ordering = ('-meal_date',)
