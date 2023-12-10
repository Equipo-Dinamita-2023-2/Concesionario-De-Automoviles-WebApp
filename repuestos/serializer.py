from rest_framework import serializers
from core.models import Repuesto

class RepuestoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Repuesto
        fields = '__all__'