"""
Modelo para registro de comidas y su impacto en CO2.
"""
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator
from core.models import M_BaseModel
from core.utils import CarbonCalculator


class M_Meal(M_BaseModel):
    MEAL_TYPE_CHOICES = [
        ('breakfast', 'Desayuno'),
        ('lunch', 'Almuerzo'),
        ('dinner', 'Cena'),
        ('snack', 'Snack'),
    ]
    
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='meals',
        verbose_name="Usuario"
    )
    
    meal_type = models.CharField(
        max_length=20,
        choices=MEAL_TYPE_CHOICES,
        verbose_name="Tipo de comida"
    )
    
    description = models.CharField(
        max_length=255,
        verbose_name="Descripción",
        help_text="Descripción de la comida"
    )
    
    # Almacenar ingredientes como JSON
    ingredients = models.JSONField(
        verbose_name="Ingredientes",
        help_text="Dict con ingredientes y cantidades en kg"
    )
    
    total_co2 = models.FloatField(
        validators=[MinValueValidator(0)],
        verbose_name="CO2 Total (kg)",
        help_text="Emisiones totales calculadas en kg de CO2"
    )
    
    meal_date = models.DateField(
        verbose_name="Fecha de la comida"
    )
    
    is_vegetarian = models.BooleanField(
        default=False,
        verbose_name="Vegetariana"
    )
    
    is_vegan = models.BooleanField(
        default=False,
        verbose_name="Vegana"
    )

    class Meta:
        verbose_name = "Comida"
        verbose_name_plural = "Comidas"
        ordering = ['-meal_date', '-created_at']
        indexes = [
            models.Index(fields=['user', '-meal_date']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.get_meal_type_display()} ({self.meal_date})"

    def save(self, *args, **kwargs):
        if not self.total_co2 or self.total_co2 == 0:
            self.total_co2 = CarbonCalculator.calculate_meal_emissions(
                self.ingredients
            )
        
        # Determinar si es vegetariana/vegana
        meat_items = ['beef', 'lamb', 'pork', 'chicken', 'turkey', 'fish', 'seafood']
        animal_products = meat_items + ['cheese', 'milk', 'yogurt', 'butter', 'eggs']
        
        ingredients_list = [ing.lower() for ing in self.ingredients.keys()]
        
        has_meat = any(item in ingredients_list for item in meat_items)
        has_animal = any(item in ingredients_list for item in animal_products)
        
        self.is_vegan = not has_animal
        self.is_vegetarian = not has_meat
        
        is_new = self.pk is None
        super().save(*args, **kwargs)
        
        # Verificar logros después de crear una comida
        if is_new:
            try:
                from app.social.models import UserAchievement
                UserAchievement.check_and_unlock_achievements(self.user)
            except:
                pass

