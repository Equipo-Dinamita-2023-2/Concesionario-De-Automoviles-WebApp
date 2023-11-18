from rest_framework import serializers
from core.models import Cotizacion


class CotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cotizacion
        fields = '__all__'
