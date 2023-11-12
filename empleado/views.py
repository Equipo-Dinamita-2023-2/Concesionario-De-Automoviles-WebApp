from rest_framework import viewsets
from core.models import Empleado
from .serializer import EmpleadoSerializer

# Create your views here.


class EmpleadoView(viewsets.ModelViewSet):
    serializer_class = EmpleadoSerializer
    queryset = Empleado.objects.all()
