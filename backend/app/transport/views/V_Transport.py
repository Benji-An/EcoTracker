"""
Vistas para gestión de transporte.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from app.transport.models import M_Transport
from app.transport.serializers import SZ_Transport, SZ_TransportCreate, SZ_TransportList


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def V_TransportList(request):
    transports = M_Transport.objects.filter(user=request.user, is_active=True)
    
    # Filtros opcionales
    trip_date = request.query_params.get('date')
    transport_type = request.query_params.get('transport_type')
    
    if trip_date:
        transports = transports.filter(trip_date=trip_date)
    
    if transport_type:
        transports = transports.filter(transport_type=transport_type)
    
    serializer = SZ_TransportList(transports, many=True)
    
    return Response({
        'count': transports.count(),
        'transports': serializer.data
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def V_TransportCreate(request):

    serializer = SZ_TransportCreate(
        data=request.data,
        context={'request': request}
    )
    
    if serializer.is_valid():
        transport = serializer.save()
        
        # Devolver transporte completo
        full_serializer = SZ_Transport(transport)
        
        return Response({
            'message': '¡Viaje registrado exitosamente!',
            'transport': full_serializer.data,
            'co2_emitted': transport.total_co2,
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def V_TransportDetail(request, transport_id):
    """
    Obtener detalles de un transporte específico.
    
    GET /api/transport/<id>/
    """
    transport = get_object_or_404(
        M_Transport,
        id=transport_id,
        user=request.user,
        is_active=True
    )
    
    serializer = SZ_Transport(transport)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def V_TransportDelete(request, transport_id):
    """
    Eliminar (soft delete) un transporte.
    
    DELETE /api/transport/<id>/delete/
    """
    transport = get_object_or_404(
        M_Transport,
        id=transport_id,
        user=request.user,
        is_active=True
    )
    
    transport.soft_delete()
    
    return Response({
        'message': 'Transporte eliminado exitosamente.'
    }, status=status.HTTP_200_OK)
