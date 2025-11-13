from rest_framework import serializers
from app.social.models import UserAchievement
from .SZ_Achievement import AchievementSerializer


class UserAchievementSerializer(serializers.ModelSerializer):
    achievement = AchievementSerializer(read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = [
            'id',
            'achievement',
            'progress',
            'is_unlocked',
            'unlocked_at',
            'created_at'
        ]
        read_only_fields = ['id', 'created_at', 'unlocked_at']


class UserAchievementListSerializer(serializers.ModelSerializer):
    achievement_id = serializers.IntegerField(source='achievement.id', read_only=True)
    achievement_name = serializers.CharField(source='achievement.name', read_only=True)
    achievement_description = serializers.CharField(source='achievement.description', read_only=True)
    achievement_points = serializers.IntegerField(source='achievement.points', read_only=True)
    category = serializers.CharField(source='achievement.category', read_only=True)
    
    class Meta:
        model = UserAchievement
        fields = [
            'id',
            'achievement_id',
            'achievement_name',
            'achievement_description',
            'achievement_points',
            'category',
            'progress',
            'is_unlocked',
            'unlocked_at'
        ]
        read_only_fields = ['id', 'unlocked_at']
