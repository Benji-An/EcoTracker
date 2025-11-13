from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.db.models import Q

from app.social.models import Friendship
from app.social.serializers import (
    FriendshipSerializer,
    FriendRequestSerializer,
    FriendListSerializer,
)
from app.social.serializers.SZ_Friendship import UserBasicSerializer


class V_SendFriendRequest(generics.CreateAPIView):
    serializer_class = FriendRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        friendship = serializer.save()
        
        # Retornar con información completa
        response_serializer = FriendshipSerializer(friendship, context={'request': request})
        return Response(
            response_serializer.data,
            status=status.HTTP_201_CREATED
        )


class V_FriendRequestList(generics.ListAPIView):
    serializer_class = FriendshipSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Friendship.objects.filter(
            to_user=self.request.user,
            status='pending'
        ).select_related('from_user', 'to_user')


class V_AcceptFriendRequest(APIView):
    """
    POST /api/social/friends/request/<id>/accept/
    Acepta una solicitud de amistad
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        try:
            friendship = Friendship.objects.get(
                id=pk,
                to_user=request.user,
                status='pending'
            )
        except Friendship.DoesNotExist:
            return Response(
                {'error': 'Solicitud no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        friendship.accept()
        
        # Verificar y desbloquear logros de amistad
        from app.social.models import UserAchievement
        UserAchievement.check_and_unlock_achievements(request.user)
        UserAchievement.check_and_unlock_achievements(friendship.from_user)
        
        serializer = FriendshipSerializer(friendship, context={'request': request})
        return Response(serializer.data)


class V_RejectFriendRequest(APIView):
    """
    POST /api/social/friends/request/<id>/reject/
    Rechaza una solicitud de amistad
    """
    permission_classes = [IsAuthenticated]
    
    def post(self, request, pk):
        try:
            friendship = Friendship.objects.get(
                id=pk,
                to_user=request.user,
                status='pending'
            )
        except Friendship.DoesNotExist:
            return Response(
                {'error': 'Solicitud no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        friendship.reject()
        serializer = FriendshipSerializer(friendship, context={'request': request})
        return Response(serializer.data)


class V_FriendList(generics.ListAPIView):
    """
    GET /api/social/friends/
    Lista todos los amigos del usuario actual
    """
    serializer_class = FriendListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Friendship.objects.filter(
            Q(from_user=user, status='accepted') |
            Q(to_user=user, status='accepted')
        ).select_related('from_user', 'to_user')


class V_RemoveFriend(APIView):
    """
    DELETE /api/social/friends/<id>/
    Elimina una amistad
    """
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, pk):
        try:
            friendship = Friendship.objects.get(
                Q(id=pk) &
                (Q(from_user=request.user) | Q(to_user=request.user)),
                status='accepted'
            )
        except Friendship.DoesNotExist:
            return Response(
                {'error': 'Amistad no encontrada'},
                status=status.HTTP_404_NOT_FOUND
            )
        
        friendship.delete()
        return Response(
            {'message': 'Amistad eliminada exitosamente'},
            status=status.HTTP_204_NO_CONTENT
        )


class V_SearchUsers(generics.ListAPIView):
    """
    GET /api/social/users/search/?q=username
    Busca usuarios por nombre de usuario, nombre o apellido
    """
    serializer_class = UserBasicSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        
        if not query or len(query) < 2:
            return User.objects.none()
        
        # Excluir al usuario actual
        queryset = User.objects.exclude(id=self.request.user.id)
        
        # Buscar por username, first_name o last_name
        queryset = queryset.filter(
            Q(username__icontains=query) |
            Q(first_name__icontains=query) |
            Q(last_name__icontains=query)
        ).select_related('profile')[:10]  # Limitar a 10 resultados
        
        return queryset
