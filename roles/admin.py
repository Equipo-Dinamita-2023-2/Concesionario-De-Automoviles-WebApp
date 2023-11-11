from django.contrib import admin
from core.models import Cliente, RolEmpleado, Empleado

# Register your models here.
admin.site.register(Cliente)
admin.site.register(RolEmpleado)
admin.site.register(Empleado)
