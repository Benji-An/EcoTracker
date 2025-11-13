"""
Vistas para autenticación de usuarios.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from app.users.serializers import SZ_UserRegister, SZ_UserLogin, SZ_User


@api_view(['POST'])
@permission_classes([AllowAny])
def V_Register(request):
    serializer = SZ_UserRegister(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        # Generar tokens JWT
        refresh = RefreshToken.for_user(user)
        
        # Serializar datos del usuario
        user_serializer = SZ_User(user)
        
        return Response({
            'message': '¡Usuario registrado exitosamente!',
            'user': user_serializer.data,
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def V_Login(request):
    serializer = SZ_UserLogin(data=request.data)
    
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        
        # Autenticar usuario
        user = authenticate(username=username, password=password)
        
        if user is not None:
            if user.is_active:
                # Generar tokens JWT
                refresh = RefreshToken.for_user(user)
                
                # Serializar datos del usuario
                user_serializer = SZ_User(user)
                
                return Response({
                    'message': '¡Inicio de sesión exitoso!',
                    'user': user_serializer.data,
                    'tokens': {
                        'refresh': str(refresh),
                        'access': str(refresh.access_token),
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    'error': 'Esta cuenta está desactivada.'
                }, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({
                'error': 'Credenciales inválidas.'
            }, status=status.HTTP_401_UNAUTHORIZED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def V_Logout(request):
    try:
        refresh_token = request.data.get('refresh_token')
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
            
        return Response({
            'message': 'Sesión cerrada exitosamente.'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)
