from django.db import models
from django.contrib.auth.models import User
from core.models import M_BaseModel
from .M_Achievement import Achievement


class UserAchievement(M_BaseModel):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='user_achievements',
        verbose_name='Usuario'
    )
    
    achievement = models.ForeignKey(
        Achievement,
        on_delete=models.CASCADE,
        related_name='unlocked_by',
        verbose_name='Logro'
    )
    
    unlocked_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Desbloqueado el'
    )
    
    progress = models.IntegerField(
        default=0,
        verbose_name='Progreso (%)'
    )
    
    is_unlocked = models.BooleanField(
        default=False,
        verbose_name='Desbloqueado'
    )
    
    class Meta:
        db_table = 'user_achievements'
        verbose_name = 'Logro de Usuario'
        verbose_name_plural = 'Logros de Usuarios'
        unique_together = ['user', 'achievement']
        ordering = ['-unlocked_at', '-created_at']
    
    def __str__(self):
        status = "✅" if self.is_unlocked else f"{self.progress}%"
        return f"{self.user.username} - {self.achievement.name} ({status})"
    
    def unlock(self):
        from django.utils import timezone
        
        if not self.is_unlocked:
            self.is_unlocked = True
            self.unlocked_at = timezone.now()
            self.progress = 100
            self.save()
            
            # Otorgar puntos al perfil del usuario
            try:
                profile = self.user.profile
                profile.add_points(self.achievement.points)
            except:
                pass
    
    @classmethod
    def check_and_unlock_achievements(cls, user):
        from app.meals.models import M_Meal
        from app.transport.models import M_Transport
        
        try:
            profile = user.profile
        except:
            return
        
        # Obtener todos los logros activos
        achievements = Achievement.objects.filter(is_active=True)
        
        for achievement in achievements:
            # Verificar si ya está desbloqueado
            user_achievement, created = cls.objects.get_or_create(
                user=user,
                achievement=achievement
            )
            
            if user_achievement.is_unlocked:
                continue
            
            # Calcular progreso según el tipo de requisito
            current_value = 0
            
            if achievement.requirement_type == 'meal_count':
                current_value = M_Meal.objects.filter(user=user).count()
            
            elif achievement.requirement_type == 'vegan_meal_count':
                current_value = M_Meal.objects.filter(user=user, is_vegan=True).count()
            
            elif achievement.requirement_type == 'vegetarian_meal_count':
                current_value = M_Meal.objects.filter(user=user, is_vegetarian=True).count()
            
            elif achievement.requirement_type == 'transport_count':
                current_value = M_Transport.objects.filter(user=user).count()
            
            elif achievement.requirement_type == 'eco_transport_count':
                eco_types = ['bicycle', 'walk', 'electric_bike', 'electric_scooter']
                current_value = M_Transport.objects.filter(
                    user=user,
                    transport_type__in=eco_types
                ).count()
            
            elif achievement.requirement_type == 'co2_saved':
                current_value = int(profile.total_co2_saved)
            
            elif achievement.requirement_type == 'daily_streak':
                current_value = profile.streak_days
            
            elif achievement.requirement_type == 'friend_count':
                from .M_Friendship import Friendship
                current_value = Friendship.get_friends(user).count()
            
            elif achievement.requirement_type == 'level_reached':
                current_value = profile.level
            
            # Calcular progreso
            progress = min(100, int((current_value / achievement.requirement_value) * 100))
            user_achievement.progress = progress
            user_achievement.save()
            
            # Desbloquear si se alcanzó el requisito
            if current_value >= achievement.requirement_value:
                user_achievement.unlock()
