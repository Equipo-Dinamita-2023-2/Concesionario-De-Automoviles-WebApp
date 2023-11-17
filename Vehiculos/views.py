from rest_framework import viewsets
from core.models import Vehiculo
from .serializer import VehiculoSerializer

# Create your views here.

class VehiculosView(viewsets.ModelViewSet):
    serializer_class = VehiculoSerializer
    queryset = Vehiculo.objects.all()
