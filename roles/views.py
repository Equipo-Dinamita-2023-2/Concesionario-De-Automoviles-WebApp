from rest_framework import viewsets
from core.models import RolEmpleado
from .serializer import RolEmpleadoSerializer

# Create your views here.


class RolEmpleadoView(viewsets.ModelViewSet):
    serializer_class = RolEmpleadoSerializer
    queryset = RolEmpleado.objects.all()
