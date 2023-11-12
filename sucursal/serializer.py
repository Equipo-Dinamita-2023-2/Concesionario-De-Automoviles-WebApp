from rest_framework import serializers
from core.models import Sucursal

class SurcusalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'    