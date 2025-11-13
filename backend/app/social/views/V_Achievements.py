from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from app.social.models import Achievement, UserAchievement
from app.social.serializers import (
    AchievementSerializer,
    UserAchievementListSerializer,
)


class V_AchievementList(generics.ListAPIView):

    serializer_class = UserAchievementListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        category = self.request.query_params.get('category', None)
        
        # Obtener todos los logros activos
        achievements = Achievement.objects.filter(is_active=True)
        
        if category:
            achievements = achievements.filter(category=category)
        
        # Crear o actualizar UserAchievement para cada logro
        user_achievements = []
        for achievement in achievements:
            user_achievement, created = UserAchievement.objects.get_or_create(
                user=user,
                achievement=achievement
            )
            user_achievements.append(user_achievement)
        
        # Verificar progreso de todos los logros
        UserAchievement.check_and_unlock_achievements(user)
        
        # Retornar ordenado: desbloqueados primero, luego por progreso
        return UserAchievement.objects.filter(
            user=user,
            achievement__in=achievements
        ).select_related('achievement').order_by(
            '-is_unlocked',
            '-progress',
            'achievement__category'
        )


class V_UserAchievementList(generics.ListAPIView):
    serializer_class = UserAchievementListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return UserAchievement.objects.filter(
            user=self.request.user,
            is_unlocked=True
        ).select_related('achievement').order_by('-unlocked_at')
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        # Calcular estadísticas
        total_unlocked = queryset.count()
        total_achievements = Achievement.objects.filter(is_active=True).count()
        total_points = sum([ua.achievement.points for ua in queryset])
        
        return Response({
            'achievements': serializer.data,
            'total_unlocked': total_unlocked,
            'total_achievements': total_achievements,
            'completion_percentage': round((total_unlocked / total_achievements * 100), 2) if total_achievements > 0 else 0,
            'total_points': total_points
        })


class V_CheckAchievements(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        UserAchievement.check_and_unlock_achievements(request.user)
        
        # Retornar logros recién desbloqueados
        newly_unlocked = UserAchievement.objects.filter(
            user=request.user,
            is_unlocked=True
        ).select_related('achievement').order_by('-unlocked_at')[:5]
        
        serializer = UserAchievementListSerializer(newly_unlocked, many=True)
        
        return Response({
            'message': 'Logros verificados',
            'newly_unlocked': serializer.data
        })
