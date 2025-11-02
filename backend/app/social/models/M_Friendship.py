from django.db import models
from django.contrib.auth.models import User
from core.models import M_BaseModel


class Friendship(M_BaseModel):
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('accepted', 'Aceptada'),
        ('rejected', 'Rechazada'),
    ]
    
    from_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='friendships_sent',
        verbose_name='De Usuario'
    )
    
    to_user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='friendships_received',
        verbose_name='Para Usuario'
    )
    
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Estado'
    )
    
    accepted_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Aceptada el'
    )
    
    class Meta:
        db_table = 'friendships'
        verbose_name = 'Amistad'
        verbose_name_plural = 'Amistades'
        unique_together = ['from_user', 'to_user']
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.from_user.username} -> {self.to_user.username} ({self.status})"
    
    def accept(self):

        from django.utils import timezone
        self.status = 'accepted'
        self.accepted_at = timezone.now()
        self.save()
    
    def reject(self):

        self.status = 'rejected'
        self.save()
    
    @classmethod
    def are_friends(cls, user1, user2):
        return cls.objects.filter(
            models.Q(from_user=user1, to_user=user2, status='accepted') |
            models.Q(from_user=user2, to_user=user1, status='accepted')
        ).exists()
    
    @classmethod
    def get_friends(cls, user):
        friendships = cls.objects.filter(
            models.Q(from_user=user, status='accepted') |
            models.Q(to_user=user, status='accepted')
        )
        
        friend_ids = []
        for friendship in friendships:
            if friendship.from_user == user:
                friend_ids.append(friendship.to_user.id)
            else:
                friend_ids.append(friendship.from_user.id)
        
        return User.objects.filter(id__in=friend_ids)
