from rest_framework import serializers
from core.models import OrdenReparacion

class ReparacionSerializer(serializers.ModelSerializer):
    class Meta: 
        model = OrdenReparacion
        fields = '__all__'