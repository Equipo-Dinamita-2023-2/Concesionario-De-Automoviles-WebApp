from rest_framework import serializers
from core.models import RolEmpleado

class RolEmpleadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = RolEmpleado
        fields = '__all__'