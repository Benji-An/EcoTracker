from rest_framework import serializers
from app.social.models import Achievement


class AchievementSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Achievement
        fields = [
            'id',
            'name',
            'description',
            'category',
            'requirement_type',
            'requirement_value',
            'points',
            'is_active'
        ]
        read_only_fields = ['id']
