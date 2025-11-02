"""
URLs para la app de comidas.
"""
from django.urls import path
from .views import V_MealList, V_MealCreate, V_MealDetail, V_MealDelete

app_name = 'meals'

urlpatterns = [
    path('', V_MealList, name='meal-list'),
    path('create/', V_MealCreate, name='meal-create'),
    path('<int:meal_id>/', V_MealDetail, name='meal-detail'),
    path('<int:meal_id>/delete/', V_MealDelete, name='meal-delete'),
]
