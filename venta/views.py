from rest_framework import viewsets
from .serializer import VentaSerializer
from core.models import Venta

# Create your views here.
class VentaView(viewsets.ModelViewSet):
    serializer_class = VentaSerializer
    queryset = Venta.objects.all()

