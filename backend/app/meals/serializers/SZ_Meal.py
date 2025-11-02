"""
Serializers para comidas.
"""
from rest_framework import serializers
from app.meals.models import M_Meal
from core.utils import CarbonCalculator, SUSTAINABILITY_POINTS
from datetime import date


class SZ_MealCreate(serializers.ModelSerializer):
    
    class Meta:
        model = M_Meal
        fields = (
            'meal_type',
            'description',
            'ingredients',
            'meal_date',
        )
    
    def validate_ingredients(self, value):

        if not isinstance(value, dict):
            raise serializers.ValidationError(
                "Los ingredientes deben ser un diccionario."
            )
        
        if not value:
            raise serializers.ValidationError(
                "Debe incluir al menos un ingrediente."
            )
        
        # Validar que los valores sean números positivos
        for ingredient, quantity in value.items():
            if not isinstance(quantity, (int, float)) or quantity <= 0:
                raise serializers.ValidationError(
                    f"La cantidad de '{ingredient}' debe ser un número positivo."
                )
        
        return value
    
    def create(self, validated_data):
        # Asignar usuario actual
        validated_data['user'] = self.context['request'].user
        
        # El CO2 se calcula automáticamente en el modelo
        meal = M_Meal.objects.create(**validated_data)
        
        # Dar puntos al usuario
        user_profile = meal.user.profile
        points = SUSTAINABILITY_POINTS['log_meal']
        
        # Bonus por comidas sostenibles
        if meal.is_vegan:
            points += SUSTAINABILITY_POINTS['vegan_meal']
        elif meal.is_vegetarian:
            points += SUSTAINABILITY_POINTS['vegetarian_meal']
        
        user_profile.add_points(points)
        user_profile.update_streak(meal.meal_date)
        
        return meal


class SZ_Meal(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    meal_type_display = serializers.CharField(
        source='get_meal_type_display',
        read_only=True
    )
    
    class Meta:
        model = M_Meal
        fields = (
            'id',
            'username',
            'meal_type',
            'meal_type_display',
            'description',
            'ingredients',
            'total_co2',
            'meal_date',
            'is_vegetarian',
            'is_vegan',
            'created_at',
        )
        read_only_fields = (
            'id',
            'total_co2',
            'is_vegetarian',
            'is_vegan',
            'created_at',
        )


class SZ_MealList(serializers.ModelSerializer):

    meal_type_display = serializers.CharField(
        source='get_meal_type_display',
        read_only=True
    )
    
    class Meta:
        model = M_Meal
        fields = (
            'id',
            'meal_type',
            'meal_type_display',
            'description',
            'total_co2',
            'meal_date',
            'is_vegetarian',
            'is_vegan',
        )
