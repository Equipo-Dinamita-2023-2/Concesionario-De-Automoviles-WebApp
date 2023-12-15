from rest_framework import viewsets
from core.models import Sucursal
from .serializer import SucursalSerializer

# Create your views here.


class SucursalView(viewsets.ModelViewSet):
    serializer_class = SucursalSerializer
    queryset = Sucursal.objects.all()
