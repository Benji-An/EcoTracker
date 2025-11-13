from rest_framework import serializers
from django.contrib.auth.models import User
from app.social.models import Friendship


class UserBasicSerializer(serializers.ModelSerializer):

    profile_picture = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()
    total_points = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'profile_picture', 'level', 'total_points']
    
    def get_profile_picture(self, obj):
        try:
            if obj.profile.profile_picture:
                request = self.context.get('request')
                if request:
                    return request.build_absolute_uri(obj.profile.profile_picture.url)
        except:
            pass
        return None
    
    def get_level(self, obj):
        try:
            return obj.profile.level
        except:
            return 1
    
    def get_total_points(self, obj):
        try:
            return obj.profile.total_points
        except:
            return 0


class FriendshipSerializer(serializers.ModelSerializer):
    """Serializer completo de amistad"""
    from_user = UserBasicSerializer(read_only=True)
    to_user = UserBasicSerializer(read_only=True)
    
    class Meta:
        model = Friendship
        fields = ['id', 'from_user', 'to_user', 'status', 'accepted_at', 'created_at']
        read_only_fields = ['id', 'created_at', 'accepted_at']


class FriendRequestSerializer(serializers.ModelSerializer):
    """Serializer para enviar solicitudes de amistad"""
    to_user_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = Friendship
        fields = ['id', 'to_user_id', 'status', 'created_at']
        read_only_fields = ['id', 'status', 'created_at']
    
    def validate_to_user_id(self, value):
        """Valida que el usuario destino exista"""
        try:
            User.objects.get(id=value)
        except User.DoesNotExist:
            raise serializers.ValidationError("El usuario no existe")
        return value
    
    def validate(self, attrs):
        """Valida que no se envíe solicitud a uno mismo ni duplicada"""
        from django.db.models import Q
        from_user = self.context['request'].user
        to_user_id = attrs['to_user_id']
        
        if from_user.id == to_user_id:
            raise serializers.ValidationError("No puedes enviarte una solicitud a ti mismo")
        
        # Verificar si ya existe una solicitud pendiente o amistad activa
        existing = Friendship.objects.filter(
            Q(from_user=from_user, to_user_id=to_user_id) |
            Q(from_user_id=to_user_id, to_user=from_user)
        ).first()
        
        if existing:
            if existing.status == 'accepted':
                raise serializers.ValidationError("Ya son amigos")
            elif existing.status == 'pending':
                raise serializers.ValidationError("Ya existe una solicitud pendiente")
        
        return attrs
    
    def create(self, validated_data):
        """Crea la solicitud de amistad"""
        to_user_id = validated_data.pop('to_user_id')
        from_user = self.context['request'].user
        
        friendship = Friendship.objects.create(
            from_user=from_user,
            to_user_id=to_user_id,
            status='pending'
        )
        
        return friendship


class FriendListSerializer(serializers.ModelSerializer):
    """Serializer para listar amigos con información adicional"""
    friend = serializers.SerializerMethodField()
    friendship_date = serializers.DateTimeField(source='accepted_at', read_only=True)
    
    class Meta:
        model = Friendship
        fields = ['id', 'friend', 'friendship_date']
    
    def get_friend(self, obj):
        """Retorna el usuario que no es el actual (el amigo)"""
        request_user = self.context.get('request').user
        
        if obj.from_user == request_user:
            friend = obj.to_user
        else:
            friend = obj.from_user
        
        return UserBasicSerializer(friend, context=self.context).data
