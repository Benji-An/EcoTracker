"""
Modelo de perfil de usuario extendido.
Incluye información adicional del usuario y gamificación.
"""
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from core.models import M_BaseModel


class M_UserProfile(M_BaseModel):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name="Usuario"
    )
    
    # Información personal
    bio = models.TextField(
        max_length=500,
        blank=True,
        null=True,
        verbose_name="Biografía",
        help_text="Descripción corta del usuario"
    )
    
    profile_picture = models.ImageField(
        upload_to='profiles/',
        blank=True,
        null=True,
        verbose_name="Foto de perfil"
    )
    
    # Gamificación
    total_points = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="Puntos totales",
        help_text="Puntos acumulados por acciones sostenibles"
    )
    
    level = models.IntegerField(
        default=1,
        validators=[MinValueValidator(1)],
        verbose_name="Nivel",
        help_text="Nivel del usuario en la app"
    )
    
    # Estadísticas
    total_co2_saved = models.FloatField(
        default=0.0,
        validators=[MinValueValidator(0)],
        verbose_name="CO2 Total Ahorrado",
        help_text="Total de CO2 ahorrado en kg"
    )
    
    streak_days = models.IntegerField(
        default=0,
        validators=[MinValueValidator(0)],
        verbose_name="Racha de días",
        help_text="Días consecutivos registrando actividades"
    )
    
    last_activity_date = models.DateField(
        null=True,
        blank=True,
        verbose_name="Última actividad"
    )
    
    # Preferencias
    daily_co2_goal = models.FloatField(
        default=8.0,
        validators=[MinValueValidator(0)],
        verbose_name="Objetivo diario CO2",
        help_text="Objetivo diario de emisiones en kg CO2"
    )
    
    notifications_enabled = models.BooleanField(
        default=True,
        verbose_name="Notificaciones habilitadas"
    )

    class Meta:
        verbose_name = "Perfil de Usuario"
        verbose_name_plural = "Perfiles de Usuarios"
        ordering = ['-total_points']

    def __str__(self):
        return f"Perfil de {self.user.username}"

    def add_points(self, points: int):
        self.total_points += points
        self.update_level()
        self.save()

    def update_level(self):
        # Sistema simple: 1 nivel cada 1000 puntos
        new_level = (self.total_points // 1000) + 1
        if new_level > self.level:
            self.level = new_level

    def update_streak(self, activity_date):

        from datetime import timedelta
        
        if self.last_activity_date:
            days_diff = (activity_date - self.last_activity_date).days
            if days_diff == 1:
                # Día consecutivo
                self.streak_days += 1
            elif days_diff > 1:
                # Se rompió la racha
                self.streak_days = 1
        else:
            # Primera actividad
            self.streak_days = 1
        
        self.last_activity_date = activity_date
        self.save()
