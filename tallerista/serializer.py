from rest_framework import serializers
from core.models import Empleado


class TalleristaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'