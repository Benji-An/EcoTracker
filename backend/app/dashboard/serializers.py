from rest_framework import serializers
from .models import EcoTip


class EcoTipSerializer(serializers.ModelSerializer):
    """Serializer para EcoTips"""
    
    class Meta:
        model = EcoTip
        fields = ['id', 'title', 'description', 'category', 'icon', 'created_at']
        read_only_fields = ['id', 'created_at']
