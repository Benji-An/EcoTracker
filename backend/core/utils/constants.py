"""
Constantes y factores de emisión de CO2.
Valores en kg CO2 por unidad.
Fuentes: EPA, DEFRA, estudios científicos sobre huella de carbono.
"""

# ==================== FACTORES DE EMISIÓN - TRANSPORTE ====================
# kg CO2 por kilómetro
TRANSPORT_EMISSIONS = {
    'car': 0.192,          # Auto promedio (gasolina)
    'electric_car': 0.053, # Auto eléctrico
    'bus': 0.089,          # Autobús público
    'metro': 0.041,        # Metro/Tren ligero
    'train': 0.041,        # Tren
    'motorcycle': 0.103,   # Motocicleta
    'bike': 0.0,           # Bicicleta (cero emisiones)
    'walk': 0.0,           # Caminar (cero emisiones)
    'scooter': 0.02,       # Scooter eléctrico
    'plane': 0.255,        # Avión (promedio)
}

# ==================== FACTORES DE EMISIÓN - COMIDAS ====================
# kg CO2 por porción/kg
MEAL_EMISSIONS = {
    # Carnes (kg CO2 por kg)
    'beef': 27.0,          # Carne de res
    'lamb': 39.2,          # Cordero
    'pork': 12.1,          # Cerdo
    'chicken': 6.9,        # Pollo
    'turkey': 10.9,        # Pavo
    'fish': 6.1,           # Pescado (promedio)
    'seafood': 11.9,       # Mariscos
    
    # Lácteos (kg CO2 por kg)
    'cheese': 13.5,        # Queso
    'milk': 1.9,           # Leche (por litro)
    'yogurt': 2.2,         # Yogurt
    'butter': 12.1,        # Mantequilla
    'eggs': 4.8,           # Huevos (por kg)
    
    # Vegetales y legumbres (kg CO2 por kg)
    'vegetables': 0.4,     # Verduras promedio
    'fruits': 0.9,         # Frutas promedio
    'rice': 2.7,           # Arroz
    'pasta': 1.5,          # Pasta
    'bread': 0.9,          # Pan
    'potatoes': 0.3,       # Papas
    'beans': 2.0,          # Frijoles/Legumbres
    'tofu': 2.0,           # Tofu
    'nuts': 2.3,           # Nueces
    
    # Bebidas (kg CO2 por litro)
    'water': 0.0,          # Agua del grifo
    'bottled_water': 0.2,  # Agua embotellada
    'coffee': 0.6,         # Café (por taza)
    'tea': 0.03,           # Té (por taza)
    'juice': 1.1,          # Jugo
    'soda': 0.3,           # Refresco
    'beer': 0.3,           # Cerveza (por litro)
    'wine': 1.3,           # Vino (por litro)
}

# Categorías de comidas (para clasificación)
MEAL_CATEGORIES = {
    'breakfast': 'Desayuno',
    'lunch': 'Almuerzo',
    'dinner': 'Cena',
    'snack': 'Snack',
}

# ==================== FACTORES DE EMISIÓN - ENERGÍA ====================
# kg CO2 por kWh o unidad
ENERGY_EMISSIONS = {
    'electricity': 0.527,   # Electricidad (promedio red)
    'natural_gas': 0.185,   # Gas natural (por kWh)
    'heating_oil': 0.264,   # Petróleo de calefacción
    'propane': 0.215,       # Propano
    'coal': 0.995,          # Carbón
    'solar': 0.0,           # Solar (cero emisiones)
    'wind': 0.0,            # Eólica (cero emisiones)
    'water': 2.5,           # Agua (por m³)
}

# ==================== OBJETIVOS Y LÍMITES ====================
# kg CO2 por día (objetivos recomendados)
DAILY_CO2_TARGETS = {
    'excellent': 5.0,      # Excelente (muy bajo impacto)
    'good': 8.0,           # Bueno
    'average': 13.0,       # Promedio mundial
    'high': 20.0,          # Alto
}

# kg CO2 promedio anual por persona (varía por país)
ANNUAL_CO2_AVERAGE = {
    'global': 4800,        # Promedio global
    'usa': 16000,          # Estados Unidos
    'europe': 7000,        # Europa
    'china': 8000,         # China
    'india': 1900,         # India
    'latam': 3000,         # Latinoamérica
}

# ==================== PUNTOS PARA GAMIFICACIÓN ====================
# Puntos otorgados por acciones sostenibles
SUSTAINABILITY_POINTS = {
    'log_meal': 10,        # Registrar comida
    'log_transport': 10,   # Registrar transporte
    'log_energy': 10,      # Registrar energía
    'daily_goal': 50,      # Cumplir objetivo diario
    'weekly_goal': 200,    # Cumplir objetivo semanal
    'low_carbon_day': 100, # Día con emisiones < 5kg CO2
    'bike_used': 30,       # Usar bicicleta
    'walk_used': 25,       # Caminar
    'vegetarian_meal': 20, # Comida vegetariana
    'vegan_meal': 30,      # Comida vegana
}

# ==================== TIPS Y RECOMENDACIONES ====================
# Tips categorizados
ECO_TIPS = {
    'transport': [
        "Usa bicicleta o camina para distancias cortas (<5km)",
        "Comparte el auto con compañeros (carpooling)",
        "Usa transporte público siempre que sea posible",
        "Combina varios recados en un solo viaje",
        "Considera un vehículo eléctrico o híbrido",
    ],
    'meals': [
        "Reduce el consumo de carne roja a 1-2 veces por semana",
        "Elige productos locales y de temporada",
        "Evita el desperdicio de alimentos",
        "Prueba comidas vegetarianas o veganas",
        "Compra productos a granel para reducir empaques",
    ],
    'energy': [
        "Apaga luces y dispositivos cuando no los uses",
        "Usa electrodomésticos eficientes (A+++)",
        "Ajusta el termostato: +2°C verano, -2°C invierno",
        "Usa energía renovable si está disponible",
        "Seca la ropa al aire en lugar de usar secadora",
    ],
    'general': [
        "Reduce, reutiliza, recicla en ese orden",
        "Compra productos duraderos y de calidad",
        "Evita productos de un solo uso",
        "Apoya empresas con prácticas sostenibles",
        "Comparte tu progreso e inspira a otros",
    ],
}
