from rest_framework import viewsets
from .serializer import RepuestoSerializer
from core.models import Repuesto

# Create your views here.
class ReparacionView(viewsets.ModelViewSet):
    serializer_class = RepuestoSerializer
    queryset = Repuesto.objects.all()
