from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Q

from app.social.models import Friendship
from app.social.serializers import LeaderboardEntrySerializer


class V_GlobalLeaderboard(generics.ListAPIView):
    serializer_class = LeaderboardEntrySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        limit = int(self.request.query_params.get('limit', 100))
        
        # Ordenar usuarios por total_points de su perfil
        queryset = User.objects.select_related('profile').order_by(
            '-profile__total_points',
            '-profile__level',
            '-profile__total_co2_saved'
        )[:limit]
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # Agregar ranking a cada usuario
        ranked_users = []
        for rank, user in enumerate(queryset, start=1):
            user.rank = rank
            ranked_users.append(user)
        
        serializer = self.get_serializer(ranked_users, many=True)
        
        # Encontrar la posición del usuario actual
        current_user_rank = None
        for item in serializer.data:
            if item['id'] == request.user.id:
                current_user_rank = item['rank']
                break
        
        return Response({
            'leaderboard': serializer.data,
            'current_user_rank': current_user_rank,
            'total_users': User.objects.count()
        })


class V_FriendsLeaderboard(generics.ListAPIView):
    serializer_class = LeaderboardEntrySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        # Obtener IDs de amigos
        friends = Friendship.get_friends(user)
        friend_ids = list(friends.values_list('id', flat=True))
        
        # Incluir al usuario actual
        friend_ids.append(user.id)
        
        # Ordenar por puntos
        queryset = User.objects.filter(
            id__in=friend_ids
        ).select_related('profile').order_by(
            '-profile__total_points',
            '-profile__level',
            '-profile__total_co2_saved'
        )
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        
        # Agregar ranking a cada usuario
        ranked_users = []
        for rank, user in enumerate(queryset, start=1):
            user.rank = rank
            ranked_users.append(user)
        
        serializer = self.get_serializer(ranked_users, many=True)
        
        # Encontrar la posición del usuario actual
        current_user_rank = None
        for item in serializer.data:
            if item['id'] == request.user.id:
                current_user_rank = item['rank']
                break
        
        return Response({
            'leaderboard': serializer.data,
            'current_user_rank': current_user_rank,
            'total_friends': len(serializer.data) - 1  # -1 para excluir al usuario
        })
