from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count
from django.utils import timezone
from datetime import timedelta
from app.meals.models import M_Meal
from app.transport.models import M_Transport
from .models import EcoTip
from .serializers import EcoTipSerializer
import random


class V_DashboardStats(APIView):

    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        now = timezone.now()
        
        # Fechas para filtros
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        week_start = today_start - timedelta(days=7)
        month_start = today_start - timedelta(days=30)
        
        # CO2 ahorrado
        total_co2 = float(user.profile.total_co2_saved)
        today_meals = M_Meal.objects.filter(user=user, created_at__gte=today_start)
        today_transports = M_Transport.objects.filter(user=user, created_at__gte=today_start)
        today_co2 = sum([m.total_co2 for m in today_meals]) + sum([t.total_co2 for t in today_transports])
        
        # Contadores
        total_meals = M_Meal.objects.filter(user=user).count()
        total_transports = M_Transport.objects.filter(user=user).count()
        vegan_meals = M_Meal.objects.filter(user=user, is_vegan=True).count()
        vegetarian_meals = M_Meal.objects.filter(user=user, is_vegetarian=True).count()
        
        # Datos para gráfico de CO2 por día (últimos 7 días)
        co2_by_day = []
        for i in range(6, -1, -1):
            day_start = today_start - timedelta(days=i)
            day_end = day_start + timedelta(days=1)
            
            day_meals = M_Meal.objects.filter(
                user=user,
                created_at__gte=day_start,
                created_at__lt=day_end
            )
            day_transports = M_Transport.objects.filter(
                user=user,
                created_at__gte=day_start,
                created_at__lt=day_end
            )
            
            day_co2 = sum([m.total_co2 for m in day_meals]) + sum([t.total_co2 for t in day_transports])
            
            co2_by_day.append({
                'date': day_start.strftime('%d/%m'),
                'co2': round(float(day_co2), 2)
            })
        
        # Datos para gráfico de comidas por tipo
        meals_by_type = {
            'veganas': vegan_meals,
            'vegetarianas': vegetarian_meals - vegan_meals,
            'omnívoras': total_meals - vegetarian_meals
        }
        
        # Datos para gráfico de transporte por tipo
        transports_by_type = []
        transport_types = M_Transport.objects.filter(user=user).values('transport_type').annotate(count=Count('id'))
        
        transport_labels = {
            'walk': 'Caminata',
            'bicycle': 'Bicicleta',
            'public_transport': 'Transporte Público',
            'car': 'Auto',
            'electric_bike': 'Bici Eléctrica',
            'electric_scooter': 'Scooter Eléctrico'
        }
        
        for item in transport_types:
            transports_by_type.append({
                'type': transport_labels.get(item['transport_type'], item['transport_type']),
                'count': item['count']
            })
        
        # Estadísticas por categoría (últimos 30 días)
        month_meals = M_Meal.objects.filter(user=user, created_at__gte=month_start)
        month_transports = M_Transport.objects.filter(user=user, created_at__gte=month_start)
        
        category_stats = [
            {
                'category': 'Comidas',
                'count': month_meals.count(),
                'co2': round(float(sum([m.total_co2 for m in month_meals])), 2)
            },
            {
                'category': 'Transporte',
                'count': month_transports.count(),
                'co2': round(float(sum([t.total_co2 for t in month_transports])), 2)
            }
        ]
        
        return Response({
            'summary': {
                'total_co2': round(total_co2, 2),
                'today_co2': round(float(today_co2), 2),
                'total_meals': total_meals,
                'total_transports': total_transports,
                'vegan_meals': vegan_meals,
                'vegetarian_meals': vegetarian_meals,
                'level': user.profile.level,
                'total_points': user.profile.total_points,
                'streak_days': user.profile.streak_days,
            },
            'charts': {
                'co2_by_day': co2_by_day,
                'meals_by_type': meals_by_type,
                'transports_by_type': transports_by_type,
                'category_stats': category_stats,
            }
        })


class V_RandomEcoTip(APIView):
    """Vista para obtener un eco tip aleatorio"""
    
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        # Obtener categoría opcional del query param
        category = request.query_params.get('category', None)
        
        # Filtrar tips activos
        tips = EcoTip.objects.filter(is_active=True)
        
        if category:
            tips = tips.filter(category=category)
        
        # Obtener tip aleatorio
        if tips.exists():
            tip = random.choice(list(tips))
            serializer = EcoTipSerializer(tip)
            return Response(serializer.data)
        
        # Si no hay tips, devolver uno por defecto
        return Response({
            'id': 0,
            'title': '¡Sigue así!',
            'description': 'Cada pequeña acción cuenta para un planeta más verde. Continúa registrando tus actividades eco-amigables.',
            'category': 'general',
            'icon': 'leaf'
        })

