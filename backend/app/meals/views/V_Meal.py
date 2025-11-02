"""
Vistas para gestión de comidas.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from app.meals.models import M_Meal
from app.meals.serializers import SZ_Meal, SZ_MealCreate, SZ_MealList


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def V_MealList(request):

    meals = M_Meal.objects.filter(user=request.user, is_active=True)
    
    # Filtros opcionales
    meal_date = request.query_params.get('date')
    meal_type = request.query_params.get('meal_type')
    
    if meal_date:
        meals = meals.filter(meal_date=meal_date)
    
    if meal_type:
        meals = meals.filter(meal_type=meal_type)
    
    serializer = SZ_MealList(meals, many=True)
    
    return Response({
        'count': meals.count(),
        'meals': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def V_MealCreate(request):
    serializer = SZ_MealCreate(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        meal = serializer.save()
        
        # Devolver comida completa
        full_serializer = SZ_Meal(meal)
        
        return Response({
            'message': '¡Comida registrada exitosamente!',
            'meal': full_serializer.data,
            'co2_emitted': meal.total_co2,
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def V_MealDetail(request, meal_id):
    meal = get_object_or_404(
        M_Meal,
        id=meal_id,
        user=request.user,
        is_active=True
    )
    
    serializer = SZ_Meal(meal)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def V_MealDelete(request, meal_id):

    meal = get_object_or_404(
        M_Meal,
        id=meal_id,
        user=request.user,
        is_active=True
    )
    
    meal.soft_delete()
    
    return Response({
        'message': 'Comida eliminada exitosamente.'
    }, status=status.HTTP_200_OK)
