from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db import IntegrityError

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
