from rest_framework import viewsets
from .serializer import SucursalSerializer
from core.models import Sucursal

# Create your views here.

class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()
