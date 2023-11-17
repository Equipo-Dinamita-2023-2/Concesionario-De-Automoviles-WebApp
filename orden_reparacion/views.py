from rest_framework import viewsets
from .serializer import ReparacionSerializer
from core.models import OrdenReparacion

# Create your views here.
class ReparacionView(viewsets.ModelViewSet):
    serializer_class = ReparacionSerializer
    queryset = OrdenReparacion.objects.all()
