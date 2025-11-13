"""
URLs para la app de transporte.
"""
from django.urls import path
from .views import V_TransportList, V_TransportCreate, V_TransportDetail, V_TransportDelete

app_name = 'transport'

urlpatterns = [
    path('', V_TransportList, name='transport-list'),
    path('create/', V_TransportCreate, name='transport-create'),
    path('<int:transport_id>/', V_TransportDetail, name='transport-detail'),
    path('<int:transport_id>/delete/', V_TransportDelete, name='transport-delete'),
]
