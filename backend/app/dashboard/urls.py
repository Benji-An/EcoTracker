from django.urls import path
from .views import V_DashboardStats, V_RandomEcoTip

urlpatterns = [
    path('stats/', V_DashboardStats.as_view(), name='dashboard-stats'),
    path('eco-tip/', V_RandomEcoTip.as_view(), name='random-eco-tip'),
]
