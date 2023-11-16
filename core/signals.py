from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db import IntegrityError
from .models import RolEmpleado

flag_crear_admin = True
flag_crear_inserciones = True


@receiver(post_migrate)
def create_superuser(sender, **kwargs):

    if flag_crear_admin and not User.objects.filter(username='admin').exists():
        try:
            User.objects.create_superuser(
                'admin', 'admin@example.com', 'admin')
            print("\n ADVERTENCIA: \n Se ha creado un superusuario por defecto \n")
        except IntegrityError:
            pass


@receiver(post_migrate)
def generar_roles_empleado(sender, **kwargs):
    if RolEmpleado.objects.count() == 0:
        try:
            RolEmpleado.objects.create(tipo_rol='Vendedor')
            RolEmpleado.objects.create(tipo_rol='Tallerista')
        except IntegrityError:
            pass
