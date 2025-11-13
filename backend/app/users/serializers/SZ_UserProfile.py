"""
Serializers para perfil de usuario.
"""
from rest_framework import serializers
from app.users.models import M_UserProfile
from django.contrib.auth.models import User


class SZ_UserProfileUpdate(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = M_UserProfile
        fields = (
            'username',
            'email',
            'first_name',
            'last_name',
            'bio',
            'profile_picture',
            'daily_co2_goal',
            'notifications_enabled',
        )

    def update(self, instance, validated_data):
        # Actualizar datos del User si están presentes
        user_data = validated_data.pop('user', {})
        if user_data:
            user = instance.user
            user.first_name = user_data.get('first_name', user.first_name)
            user.last_name = user_data.get('last_name', user.last_name)
            user.save()

        # Actualizar perfil
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        return instance


class SZ_UserProfile(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = M_UserProfile
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'bio',
            'profile_picture',
            'total_points',
            'level',
            'total_co2_saved',
            'streak_days',
            'last_activity_date',
            'daily_co2_goal',
            'notifications_enabled',
            'created_at',
        )
        read_only_fields = (
            'id',
            'total_points',
            'level',
            'total_co2_saved',
            'streak_days',
            'last_activity_date',
            'created_at',
        )

    def get_full_name(self, obj):
        return f"{obj.user.first_name} {obj.user.last_name}".strip()
