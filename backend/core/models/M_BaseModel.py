"""
Modelo base con campos comunes para todas las entidades.
Proporciona timestamps automáticos para creación y actualización.
"""
from django.db import models


class M_BaseModel(models.Model):
    """
    Clase abstracta base para todos los modelos.
    Agrega campos de auditoría automáticos.
    """
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Fecha de creación",
        help_text="Timestamp automático de creación"
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name="Última actualización",
        help_text="Timestamp automático de última modificación"
    )
    is_active = models.BooleanField(
        default=True,
        verbose_name="Activo",
        help_text="Indica si el registro está activo"
    )

    class Meta:
        abstract = True
        ordering = ['-created_at']

    def soft_delete(self):
        """Eliminación lógica del registro"""
        self.is_active = False
        self.save()

    def restore(self):
        """Restaurar un registro eliminado lógicamente"""
        self.is_active = True
        self.save()
