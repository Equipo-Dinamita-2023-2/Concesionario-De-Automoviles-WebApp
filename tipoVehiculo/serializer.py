from rest_framework import serializers
from core.models import TipoVehiculo

class TipoVSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TipoVehiculo
        fields = '__all__'