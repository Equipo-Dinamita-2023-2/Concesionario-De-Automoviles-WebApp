from rest_framework import serializers
from core.models import OrdenReparacion


class OrdenReparacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrdenReparacion
        fields = '__all__'
