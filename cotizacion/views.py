from rest_framework import viewsets
from core.models import Cotizacion
from .serializer import CotizacionSerializer

# Create your views here.


class CotizacionView(viewsets.ModelViewSet):
    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()
