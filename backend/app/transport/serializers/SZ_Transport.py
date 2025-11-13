"""
Serializers para transporte.
"""
from rest_framework import serializers
from app.transport.models import M_Transport
from core.utils import SUSTAINABILITY_POINTS
from datetime import date


class SZ_TransportCreate(serializers.ModelSerializer):
    
    class Meta:
        model = M_Transport
        fields = (
            'transport_type',
            'distance_km',
            'origin',
            'destination',
            'trip_date',
        )
    
    def create(self, validated_data):
        # Asignar usuario actual
        validated_data['user'] = self.context['request'].user
        
        # El CO2 se calcula automáticamente en el modelo
        transport = M_Transport.objects.create(**validated_data)
        
        # Dar puntos al usuario
        user_profile = transport.user.profile
        points = SUSTAINABILITY_POINTS['log_transport']
        
        # Bonus por transporte sostenible
        if transport.is_sustainable():
            if transport.transport_type in ['bike', 'walk']:
                points += SUSTAINABILITY_POINTS.get('bike_used', 30)
        
        user_profile.add_points(points)
        user_profile.update_streak(transport.trip_date)
        
        return transport


class SZ_Transport(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    transport_type_display = serializers.CharField(
        source='get_transport_type_display',
        read_only=True
    )
    is_sustainable = serializers.SerializerMethodField()
    
    class Meta:
        model = M_Transport
        fields = (
            'id',
            'username',
            'transport_type',
            'transport_type_display',
            'distance_km',
            'origin',
            'destination',
            'total_co2',
            'trip_date',
            'is_sustainable',
            'created_at',
        )
        read_only_fields = (
            'id',
            'total_co2',
            'created_at',
        )
    
    def get_is_sustainable(self, obj):
        return obj.is_sustainable()


class SZ_TransportList(serializers.ModelSerializer):
    """Serializer simplificado para listados"""
    transport_type_display = serializers.CharField(
        source='get_transport_type_display',
        read_only=True
    )
    
    class Meta:
        model = M_Transport
        fields = (
            'id',
            'transport_type',
            'transport_type_display',
            'distance_km',
            'total_co2',
            'trip_date',
        )
