from rest_framework import viewsets
from .serializer import CotizacionSerializer
from core.models import Cotizacion

# Create your views here.


class CotizacionView(viewsets.ModelViewSet):
    serializer_class = CotizacionSerializer
    queryset = Cotizacion.objects.all()
