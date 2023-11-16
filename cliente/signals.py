from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.apps import apps
from django.db import IntegrityError
from core.models import Cliente as core_cliente
from core.signals import flag_crear_inserciones as pred_inserts_allowed

# Variable global para rastrear si el código ya se ejecutó
post_migrate_executed = False


@receiver(post_migrate)
def insert_data(sender, **kwargs):
    global post_migrate_executed

    if pred_inserts_allowed and not post_migrate_executed:

        try:
            Cliente = apps.get_model('core', 'Cliente')

            jugadores = [
                {'documento': '1234567890', 'nombres': 'James', 'apellidos': 'Rodríguez', 'celular': '9876543210',
                    'correo': 'james@gmail.com', 'direccion': 'Calle 123', 'ciudad': 'Medellín'},
                {'documento': '2345678901', 'nombres': 'Radamel', 'apellidos': 'Falcao', 'celular': '8765432109',
                    'correo': 'falcao@gmail.com', 'direccion': 'Avenida 456', 'ciudad': 'Santa Marta'},
                {'documento': '3456789012', 'nombres': 'Juan', 'apellidos': 'Cuadrado', 'celular': '7654321098',
                    'correo': 'cuadrado@gmail.com', 'direccion': 'Carrera 789', 'ciudad': 'Necoclí'},
                {'documento': '4567890123', 'nombres': 'Duván', 'apellidos': 'Zapata', 'celular': '6543210987',
                    'correo': 'zapata@gmail.com', 'direccion': 'Diagonal 1011', 'ciudad': 'Pereira'},
                {'documento': '5678901234', 'nombres': 'Wilmar', 'apellidos': 'Barrios', 'celular': '5432109876',
                    'correo': 'barrios@gmail.com', 'direccion': 'Calle 1213', 'ciudad': 'Cartagena'},
                {'documento': '6789012345', 'nombres': 'David', 'apellidos': 'Ospina', 'celular': '4321098765',
                    'correo': 'ospina@gmail.com', 'direccion': 'Avenida 1415', 'ciudad': 'Medellín'},
                {'documento': '7890123456', 'nombres': 'Yerry', 'apellidos': 'Mina', 'celular': '3210987654',
                    'correo': 'mina@gmail.com', 'direccion': 'Carrera 1617', 'ciudad': 'Guachené'},
                {'documento': '8901234567', 'nombres': 'Juan Fernando', 'apellidos': 'Quintero', 'celular': '2109876543',
                    'correo': 'quintero@gmail.com', 'direccion': 'Calle 1819', 'ciudad': 'Medellín'},
                {'documento': '9012345678', 'nombres': 'Jeison', 'apellidos': 'Murillo', 'celular': '1098765432',
                    'correo': 'murillo@gmail.com', 'direccion': 'Avenida 2021', 'ciudad': 'Bogotá'},
                {'documento': '0123456789', 'nombres': 'Falmer', 'apellidos': 'Arias', 'celular': '1098765432',
                    'correo': 'arias@gmail.com', 'direccion': 'Carrera 2223', 'ciudad': 'Medellín'},
            ]

            for jugador in jugadores:
                if not Cliente.objects.filter(documento=jugador['documento']).exists():
                    Cliente.objects.create(
                        documento=jugador['documento'],
                        nombres=jugador['nombres'],
                        apellidos=jugador['apellidos'],
                        celular=jugador['celular'],
                        correo=jugador['correo'],
                        direccion=jugador['direccion'],
                        ciudad=jugador['ciudad'],
                    )

        except IntegrityError:
            pass

        # Marcar que el código ya se ejecutó
        post_migrate_executed = True
