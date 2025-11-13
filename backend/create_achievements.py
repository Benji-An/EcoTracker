"""
Script para crear los logros iniciales de EkoTraker
Ejecutar con: python manage.py shell < create_achievements.py
"""

from app.social.models import Achievement

# Eliminar logros existentes si es necesario (solo para desarrollo)
# Achievement.objects.all().delete()

achievements_data = [
    # Logros de Comidas
    {
        'name': 'Primera Comida',
        'description': 'Registra tu primera comida',
        'category': 'meals',
        'requirement_type': 'meal_count',
        'requirement_value': 1,
        'points': 50,
    },
    {
        'name': 'Gourmand',
        'description': 'Registra 10 comidas',
        'category': 'meals',
        'requirement_type': 'meal_count',
        'requirement_value': 10,
        'points': 100,
    },
    {
        'name': 'Chef Maestro',
        'description': 'Registra 50 comidas',
        'category': 'meals',
        'requirement_type': 'meal_count',
        'requirement_value': 50,
        'points': 300,
    },
    {
        'name': 'Vegetariano Novato',
        'description': 'Registra 5 comidas vegetarianas',
        'category': 'meals',
        'requirement_type': 'vegetarian_meal_count',
        'requirement_value': 5,
        'points': 150,
    },
    {
        'name': 'Vegetariano Experto',
        'description': 'Registra 20 comidas vegetarianas',
        'category': 'meals',
        'requirement_type': 'vegetarian_meal_count',
        'requirement_value': 20,
        'points': 400,
    },
    {
        'name': 'Vegano Iniciado',
        'description': 'Registra 3 comidas veganas',
        'category': 'meals',
        'requirement_type': 'vegan_meal_count',
        'requirement_value': 3,
        'points': 200,
    },
    {
        'name': 'Vegano Comprometido',
        'description': 'Registra 15 comidas veganas',
        'category': 'meals',
        'requirement_type': 'vegan_meal_count',
        'requirement_value': 15,
        'points': 500,
    },
    
    # Logros de Transporte
    {
        'name': 'Primer Viaje',
        'description': 'Registra tu primer viaje',
        'category': 'transport',
        'requirement_type': 'transport_count',
        'requirement_value': 1,
        'points': 50,
    },
    {
        'name': 'Viajero Frecuente',
        'description': 'Registra 10 viajes',
        'category': 'transport',
        'requirement_type': 'transport_count',
        'requirement_value': 10,
        'points': 100,
    },
    {
        'name': 'Explorador',
        'description': 'Registra 30 viajes',
        'category': 'transport',
        'requirement_type': 'transport_count',
        'requirement_value': 30,
        'points': 250,
    },
    {
        'name': 'Eco-Movilidad',
        'description': 'Usa 5 veces transporte ecológico (bici, caminar)',
        'category': 'transport',
        'requirement_type': 'eco_transport_count',
        'requirement_value': 5,
        'points': 200,
    },
    {
        'name': 'Guerrero Verde',
        'description': 'Usa 20 veces transporte ecológico',
        'category': 'transport',
        'requirement_type': 'eco_transport_count',
        'requirement_value': 20,
        'points': 500,
    },
    {
        'name': 'Campeón Eco',
        'description': 'Usa 50 veces transporte ecológico',
        'category': 'transport',
        'requirement_type': 'eco_transport_count',
        'requirement_value': 50,
        'points': 1000,
    },
    
    # Logros de CO2 Ahorrado
    {
        'name': 'Ahorrista de CO2',
        'description': 'Ahorra 10kg de CO2',
        'category': 'general',
        'requirement_type': 'co2_saved',
        'requirement_value': 10,
        'points': 150,
    },
    {
        'name': 'Protector del Clima',
        'description': 'Ahorra 50kg de CO2',
        'category': 'general',
        'requirement_type': 'co2_saved',
        'requirement_value': 50,
        'points': 400,
    },
    {
        'name': 'Héroe Ambiental',
        'description': 'Ahorra 100kg de CO2',
        'category': 'general',
        'requirement_type': 'co2_saved',
        'requirement_value': 100,
        'points': 800,
    },
    {
        'name': 'Guardián del Planeta',
        'description': 'Ahorra 250kg de CO2',
        'category': 'general',
        'requirement_type': 'co2_saved',
        'requirement_value': 250,
        'points': 1500,
    },
    
    # Logros de Rachas
    {
        'name': 'Constante',
        'description': 'Mantén una racha de 3 días',
        'category': 'general',
        'requirement_type': 'daily_streak',
        'requirement_value': 3,
        'points': 100,
    },
    {
        'name': 'Disciplinado',
        'description': 'Mantén una racha de 7 días',
        'category': 'general',
        'requirement_type': 'daily_streak',
        'requirement_value': 7,
        'points': 300,
    },
    {
        'name': 'Imparable',
        'description': 'Mantén una racha de 30 días',
        'category': 'general',
        'requirement_type': 'daily_streak',
        'requirement_value': 30,
        'points': 1000,
    },
    
    # Logros Sociales
    {
        'name': 'Sociable',
        'description': 'Agrega tu primer amigo',
        'category': 'social',
        'requirement_type': 'friend_count',
        'requirement_value': 1,
        'points': 100,
    },
    {
        'name': 'Popular',
        'description': 'Agrega 5 amigos',
        'category': 'social',
        'requirement_type': 'friend_count',
        'requirement_value': 5,
        'points': 250,
    },
    {
        'name': 'Influencer Verde',
        'description': 'Agrega 10 amigos',
        'category': 'social',
        'requirement_type': 'friend_count',
        'requirement_value': 10,
        'points': 500,
    },
    
    # Logros de Nivel
    {
        'name': 'Nivel 5',
        'description': 'Alcanza el nivel 5',
        'category': 'general',
        'requirement_type': 'level_reached',
        'requirement_value': 5,
        'points': 200,
    },
    {
        'name': 'Nivel 10',
        'description': 'Alcanza el nivel 10',
        'category': 'general',
        'requirement_type': 'level_reached',
        'requirement_value': 10,
        'points': 500,
    },
    {
        'name': 'Nivel 20',
        'description': 'Alcanza el nivel 20',
        'category': 'general',
        'requirement_type': 'level_reached',
        'requirement_value': 20,
        'points': 1000,
    },
]

print("Creando logros...")
created_count = 0
updated_count = 0

for data in achievements_data:
    achievement, created = Achievement.objects.get_or_create(
        name=data['name'],
        defaults=data
    )
    
    if created:
        created_count += 1
        print(f"Creado: {achievement.icon} {achievement.name}")
    else:
        # Actualizar si ya existe
        for key, value in data.items():
            setattr(achievement, key, value)
        achievement.save()
        updated_count += 1
        print(f" Actualizado: {achievement.icon} {achievement.name}")

print(f"\n✨ Proceso completado!")
print(f"   Logros creados: {created_count}")
print(f"   Logros actualizados: {updated_count}")
print(f"   Total de logros: {Achievement.objects.count()}")
