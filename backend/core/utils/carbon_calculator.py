"""
Calculadora de emisiones de CO2 para diferentes actividades.
Centraliza toda la lógica de cálculo de huella de carbono.
"""
from typing import Dict, List, Optional
from .constants import (
    TRANSPORT_EMISSIONS,
    MEAL_EMISSIONS,
    ENERGY_EMISSIONS,
    ECO_TIPS,
    DAILY_CO2_TARGETS,
    SUSTAINABILITY_POINTS,
)


class CarbonCalculator:

    @staticmethod
    def calculate_transport_emissions(transport_type: str, distance_km: float) -> float:
        """
        Calcula emisiones de CO2 para transporte.
        
        Args:
            transport_type: Tipo de transporte (car, bus, bike, etc.)
            distance_km: Distancia recorrida en kilómetros
            
        Returns:
            float: Emisiones en kg de CO2
        """
        emission_factor = TRANSPORT_EMISSIONS.get(transport_type.lower(), 0.1)
        return round(emission_factor * distance_km, 3)

    @staticmethod
    def calculate_meal_emissions(ingredients: Dict[str, float]) -> float:
        """
        Calcula emisiones de CO2 para una comida basada en ingredientes.
        
        Args:
            ingredients: Dict con ingrediente como key y cantidad en kg como value
                        Ejemplo: {'beef': 0.25, 'vegetables': 0.3}
            
        Returns:
            float: Emisiones en kg de CO2
        """
        total_emissions = 0.0
        for ingredient, quantity in ingredients.items():
            emission_factor = MEAL_EMISSIONS.get(ingredient.lower(), 0.5)
            total_emissions += emission_factor * quantity
        return round(total_emissions, 3)

    @staticmethod
    def calculate_energy_emissions(energy_type: str, amount: float) -> float:
        """
        Calcula emisiones de CO2 para consumo de energía.
        
        Args:
            energy_type: Tipo de energía (electricity, gas, etc.)
            amount: Cantidad consumida (kWh, m³, etc.)
            
        Returns:
            float: Emisiones en kg de CO2
        """
        emission_factor = ENERGY_EMISSIONS.get(energy_type.lower(), 0.5)
        return round(emission_factor * amount, 3)

    @staticmethod
    def get_daily_rating(total_co2: float) -> Dict[str, any]:
        """
        Evalúa el nivel de emisiones diarias.
        
        Args:
            total_co2: Total de emisiones del día en kg CO2
            
        Returns:
            Dict con rating, mensaje y puntos obtenidos
        """
        if total_co2 <= DAILY_CO2_TARGETS['excellent']:
            return {
                'rating': 'excellent',
                'message': '¡Excelente! Estás muy por debajo del promedio.',
                'color': 'green',
                'points': SUSTAINABILITY_POINTS['low_carbon_day'],
            }
        elif total_co2 <= DAILY_CO2_TARGETS['good']:
            return {
                'rating': 'good',
                'message': 'Muy bien, tu huella está por debajo del promedio.',
                'color': 'lightgreen',
                'points': SUSTAINABILITY_POINTS['daily_goal'],
            }
        elif total_co2 <= DAILY_CO2_TARGETS['average']:
            return {
                'rating': 'average',
                'message': 'Estás en el promedio mundial, pero puedes mejorar.',
                'color': 'yellow',
                'points': 20,
            }
        else:
            return {
                'rating': 'high',
                'message': 'Tu huella es alta. Intenta reducir emisiones.',
                'color': 'red',
                'points': 0,
            }

    @staticmethod
    def get_personalized_tips(
        transport_co2: float,
        meals_co2: float,
        energy_co2: float,
        max_tips: int = 3
    ) -> List[str]:
        """
        Genera tips personalizados basados en el área con más emisiones.
        
        Args:
            transport_co2: Emisiones de transporte
            meals_co2: Emisiones de comidas
            energy_co2: Emisiones de energía
            max_tips: Número máximo de tips a retornar
            
        Returns:
            Lista de tips personalizados
        """
        # Identificar categoría con más emisiones
        categories = {
            'transport': transport_co2,
            'meals': meals_co2,
            'energy': energy_co2,
        }
        
        # Ordenar por emisiones (mayor a menor)
        sorted_categories = sorted(
            categories.items(),
            key=lambda x: x[1],
            reverse=True
        )
        
        # Recopilar tips empezando por la categoría con más emisiones
        tips = []
        for category, _ in sorted_categories:
            category_tips = ECO_TIPS.get(category, [])
            tips.extend(category_tips[:max_tips])
            if len(tips) >= max_tips:
                break
        
        # Agregar un tip general si no hay suficientes
        if len(tips) < max_tips:
            tips.extend(ECO_TIPS['general'][:max_tips - len(tips)])
        
        return tips[:max_tips]

    @staticmethod
    def calculate_points_for_action(action_type: str, co2_saved: float = 0) -> int:
        """
        Calcula puntos ganados por una acción sostenible.
        
        Args:
            action_type: Tipo de acción (log_meal, bike_used, etc.)
            co2_saved: CO2 ahorrado (opcional, para cálculos adicionales)
            
        Returns:
            int: Puntos ganados
        """
        base_points = SUSTAINABILITY_POINTS.get(action_type, 10)
        
        # Bonus por CO2 ahorrado (1 punto por cada 0.5kg CO2 ahorrado)
        bonus_points = int(co2_saved / 0.5) if co2_saved > 0 else 0
        
        return base_points + bonus_points

    @staticmethod
    def is_sustainable_choice(item_type: str, item_category: str) -> bool:
        """
        Determina si una elección es sostenible.
        
        Args:
            item_type: Tipo de item (transport, meal, energy)
            item_category: Categoría específica (bike, vegetables, solar)
            
        Returns:
            bool: True si es una elección sostenible
        """
        sustainable_choices = {
            'transport': ['bike', 'walk', 'electric_car', 'bus', 'metro', 'train'],
            'meal': ['vegetables', 'fruits', 'beans', 'tofu', 'water', 'tea'],
            'energy': ['solar', 'wind'],
        }
        
        choices = sustainable_choices.get(item_type, [])
        return item_category.lower() in choices

    @staticmethod
    def compare_alternatives(
        current_type: str,
        current_amount: float,
        calculator_method: callable
    ) -> Dict[str, float]:
        """
        Compara emisiones de diferentes alternativas.
        
        Args:
            current_type: Tipo actual (ej: 'car')
            current_amount: Cantidad (ej: distancia en km)
            calculator_method: Método de cálculo a usar
            
        Returns:
            Dict con comparación de emisiones
        """
        # Esta es una función genérica que se puede expandir
        # Para mostrar alternativas más sostenibles
        pass
