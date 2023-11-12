from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from django.db import IntegrityError
from core.models import Cliente as core_cliente

# Variable global para rastrear si el código ya se ejecutó
post_migrate_executed = False


@receiver(post_migrate)
def insert_data(sender, **kwargs):
    global post_migrate_executed

    if not post_migrate_executed:

        try:
            Cliente = apps.get_model('core', 'Cliente')

            # Verificar si los datos ya existen antes de intentar crearlos
            if not Cliente.objects.filter(documento='0987654321').exists():
                Cliente.objects.create(
                    documento='0987654321',
                    nombres='María',
                    apellidos='Gómez',
                    celular='1234567890',
                    correo='maria@example.com',
                    direccion='Avenida 456',
                    ciudad='Otra Ciudad',
                )

        except IntegrityError:
            pass

        # Marcar que el código ya se ejecutó
        post_migrate_executed = True
