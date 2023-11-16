from rest_framework import viewsets
from core.models import OrdenReparacion
from .serializer import OrdenReparacionSerializer

# Create your views here.


class OrdenReparacionView(viewsets.ModelViewSet):
    serializer_class = OrdenReparacionSerializer
    queryset = OrdenReparacion.objects.all()
