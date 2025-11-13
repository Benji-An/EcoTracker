from django.urls import path
from app.social.views import (
    V_SendFriendRequest,
    V_FriendRequestList,
    V_AcceptFriendRequest,
    V_RejectFriendRequest,
    V_FriendList,
    V_RemoveFriend,
    V_SearchUsers,
    V_GlobalLeaderboard,
    V_FriendsLeaderboard,
    V_AchievementList,
    V_UserAchievementList,
    V_CheckAchievements,
)

urlpatterns = [
    # Friend requests
    path('friends/request/', V_SendFriendRequest.as_view(), name='send-friend-request'),
    path('friends/requests/', V_FriendRequestList.as_view(), name='friend-request-list'),
    path('friends/request/<int:pk>/accept/', V_AcceptFriendRequest.as_view(), name='accept-friend-request'),
    path('friends/request/<int:pk>/reject/', V_RejectFriendRequest.as_view(), name='reject-friend-request'),
    
    # Friends
    path('friends/', V_FriendList.as_view(), name='friend-list'),
    path('friends/<int:pk>/', V_RemoveFriend.as_view(), name='remove-friend'),
    
    # Search users
    path('users/search/', V_SearchUsers.as_view(), name='search-users'),
    
    # Leaderboard
    path('leaderboard/global/', V_GlobalLeaderboard.as_view(), name='global-leaderboard'),
    path('leaderboard/friends/', V_FriendsLeaderboard.as_view(), name='friends-leaderboard'),
    
    # Achievements
    path('achievements/', V_AchievementList.as_view(), name='achievement-list'),
    path('achievements/unlocked/', V_UserAchievementList.as_view(), name='user-achievement-list'),
    path('achievements/check/', V_CheckAchievements.as_view(), name='check-achievements'),
]
