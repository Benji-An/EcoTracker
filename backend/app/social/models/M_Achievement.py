from django.db import models
from core.models import M_BaseModel


class Achievement(M_BaseModel):
    CATEGORY_CHOICES = [
        ('meals', 'Comidas'),
        ('transport', 'Transporte'),
        ('energy', 'Energía'),
        ('social', 'Social'),
        ('general', 'General'),
    ]
    
    REQUIREMENT_CHOICES = [
        ('meal_count', 'Cantidad de comidas'),
        ('vegan_meal_count', 'Comidas veganas'),
        ('vegetarian_meal_count', 'Comidas vegetarianas'),
        ('transport_count', 'Cantidad de viajes'),
        ('eco_transport_count', 'Transporte ecológico'),
        ('co2_saved', 'CO2 ahorrado total'),
        ('daily_streak', 'Días consecutivos'),
        ('friend_count', 'Cantidad de amigos'),
        ('level_reached', 'Nivel alcanzado'),
    ]
    
    name = models.CharField(
        max_length=100,
        verbose_name='Nombre'
    )
    
    description = models.TextField(
        verbose_name='Descripción'
    )
    
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        verbose_name='Categoría'
    )
    
    requirement_type = models.CharField(
        max_length=30,
        choices=REQUIREMENT_CHOICES,
        verbose_name='Tipo de Requisito'
    )
    
    requirement_value = models.IntegerField(
        verbose_name='Valor Requerido'
    )
    
    points = models.IntegerField(
        default=100,
        verbose_name='Puntos'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Activo'
    )
    
    class Meta:
        db_table = 'achievements'
        verbose_name = 'Logro'
        verbose_name_plural = 'Logros'
        ordering = ['category', 'requirement_value']
    
    def __str__(self):
        return self.name
