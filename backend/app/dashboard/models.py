from django.db import models
from core.models import M_BaseModel


class EcoTip(M_BaseModel):
    """Consejos ecológicos para mostrar a los usuarios"""
    
    CATEGORY_CHOICES = [
        ('meals', 'Comidas'),
        ('transport', 'Transporte'),
        ('energy', 'Energía'),
        ('water', 'Agua'),
        ('waste', 'Residuos'),
        ('general', 'General'),
    ]
    
    title = models.CharField(
        max_length=100,
        verbose_name='Título'
    )
    
    description = models.TextField(
        verbose_name='Descripción'
    )
    
    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES,
        default='general',
        verbose_name='Categoría'
    )
    
    icon = models.CharField(
        max_length=50,
        default='leaf',
        verbose_name='Icono',
        help_text='Nombre del icono de lucide-react'
    )
    
    is_active = models.BooleanField(
        default=True,
        verbose_name='Activo'
    )
    
    class Meta:
        db_table = 'eco_tips'
        verbose_name = 'Eco Tip'
        verbose_name_plural = 'Eco Tips'
        ordering = ['category', 'title']
    
    def __str__(self):
        return f"{self.title} ({self.get_category_display()})"
