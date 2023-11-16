from rest_framework import serializers
from core.models import Empleado


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empleado
        fields = '__all__'