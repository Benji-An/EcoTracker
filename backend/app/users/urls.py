"""
URLs para la app de usuarios.
"""
from django.urls import path
from .views import (
    V_Register,
    V_Login,
    V_Logout,
    V_ProfileDetail,
    V_ProfileUpdate,
)

app_name = 'users'

urlpatterns = [
    # Autenticación
    path('auth/register/', V_Register, name='register'),
    path('auth/login/', V_Login, name='login'),
    path('auth/logout/', V_Logout, name='logout'),
    
    # Perfil
    path('profile/', V_ProfileDetail, name='profile-detail'),
    path('profile/update/', V_ProfileUpdate, name='profile-update'),
]
