from rest_framework import serializers
from django.contrib.auth.models import User


class LeaderboardEntrySerializer(serializers.ModelSerializer):
    rank = serializers.IntegerField(read_only=True)
    username = serializers.CharField(read_only=True)
    profile_picture = serializers.SerializerMethodField()
    level = serializers.SerializerMethodField()
    total_points = serializers.SerializerMethodField()
    total_co2_saved = serializers.SerializerMethodField()
    streak_days = serializers.SerializerMethodField()
    achievements_count = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = [
            'id',
            'rank',
            'username',
            'first_name',
            'last_name',
            'profile_picture',
            'level',
            'total_points',
            'total_co2_saved',
            'streak_days',
            'achievements_count'
        ]
    
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
    
    def get_total_co2_saved(self, obj):
        try:
            return float(obj.profile.total_co2_saved)
        except:
            return 0.0
    
    def get_streak_days(self, obj):
        try:
            return obj.profile.streak_days
        except:
            return 0
    
    def get_achievements_count(self, obj):
        try:
            return obj.user_achievements.filter(is_unlocked=True).count()
        except:
            return 0
