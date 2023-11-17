from rest_framework import viewsets
from .serializer import TipoVSerializer
from core.models import TipoVehiculo

# Create your views here.
class TipovView(viewsets.ModelViewSet):
    serializer_class = TipoVSerializer
    queryset = TipoVehiculo.objects.all()
