"""
Serializers para autenticación y gestión de usuarios.
"""
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


class SZ_UserRegister(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'password_confirm', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError(
                {"password": "Las contraseñas no coinciden."}
            )
        
        if User.objects.filter(email=attrs['email']).exists():
            raise serializers.ValidationError(
                {"email": "Este email ya está registrado."}
            )
        
        return attrs

    def create(self, validated_data):
        validated_data.pop('password_confirm')
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()
        
        # Crear perfil automáticamente
        from app.users.models import M_UserProfile
        M_UserProfile.objects.create(user=user)
        
        return user


class SZ_UserLogin(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(
        required=True,
        write_only=True,
        style={'input_type': 'password'}
    )


class SZ_User(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(
        source='profile.profile_picture',
        read_only=True
    )
    total_points = serializers.IntegerField(
        source='profile.total_points',
        read_only=True
    )
    level = serializers.IntegerField(
        source='profile.level',
        read_only=True
    )

    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'first_name',
            'last_name',
            'profile_picture',
            'total_points',
            'level',
        )
        read_only_fields = ('id', 'username')
