from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from core.models import M_BaseModel
from core.utils import CarbonCalculator, TRANSPORT_EMISSIONS


class M_Transport(M_BaseModel):
    TRANSPORT_CHOICES = [
        ('car', 'Auto'),
        ('electric_car', 'Auto eléctrico'),
        ('bus', 'Autobús'),
        ('metro', 'Metro'),
        ('train', 'Tren'),
        ('motorcycle', 'Motocicleta'),
        ('bike', 'Bicicleta'),
        ('walk', 'Caminar'),
        ('scooter', 'Scooter eléctrico'),
        ('plane', 'Avión'),
    ]
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='transports',
        verbose_name="Usuario"
    )
    
    transport_type = models.CharField(
        max_length=20,
        choices=TRANSPORT_CHOICES,
        verbose_name="Tipo de transporte"
    )
    
    distance_km = models.FloatField(
        validators=[MinValueValidator(0.1)],
        verbose_name="Distancia (km)",
        help_text="Distancia recorrida en kilómetros"
    )
    
    origin = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Origen"
    )
    
    destination = models.CharField(
        max_length=255,
        blank=True,
        verbose_name="Destino"
    )
    
    total_co2 = models.FloatField(
        validators=[MinValueValidator(0)],
        verbose_name="CO2 Total (kg)",
        help_text="Emisiones totales calculadas en kg de CO2"
    )
    
    trip_date = models.DateField(
        verbose_name="Fecha del viaje"
    )

    class Meta:
        verbose_name = "Transporte"
        verbose_name_plural = "Transportes"
        ordering = ['-trip_date', '-created_at']
        indexes = [
            models.Index(fields=['user', '-trip_date']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.get_transport_type_display()} ({self.distance_km}km)"

    def save(self, *args, **kwargs):
        if not self.total_co2 or self.total_co2 == 0:
            self.total_co2 = CarbonCalculator.calculate_transport_emissions(
                self.transport_type,
                self.distance_km
            )
        
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        # Verificar logros después de crear un transporte
        if is_new:
            try:
                from app.social.models import UserAchievement
                UserAchievement.check_and_unlock_achievements(self.user)
            except:
                pass

    def is_sustainable(self):
        return CarbonCalculator.is_sustainable_choice('transport', self.transport_type)
