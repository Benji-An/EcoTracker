"""
Vistas para gestión del perfil de usuario.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from app.users.models import M_UserProfile
from app.users.serializers import SZ_UserProfile, SZ_UserProfileUpdate


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def V_ProfileDetail(request):
    try:
        profile = M_UserProfile.objects.get(user=request.user)
        serializer = SZ_UserProfile(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except M_UserProfile.DoesNotExist:
        # Crear perfil si no existe
        profile = M_UserProfile.objects.create(user=request.user)
        serializer = SZ_UserProfile(profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def V_ProfileUpdate(request):

    try:
        profile = M_UserProfile.objects.get(user=request.user)
    except M_UserProfile.DoesNotExist:
        profile = M_UserProfile.objects.create(user=request.user)
    
    serializer = SZ_UserProfileUpdate(
        profile,
        data=request.data,
        partial=request.method == 'PATCH'
    )
    
    if serializer.is_valid():
        serializer.save()
        
        # Devolver perfil actualizado completo
        full_serializer = SZ_UserProfile(profile)
        return Response({
            'message': 'Perfil actualizado exitosamente.',
            'profile': full_serializer.data
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
