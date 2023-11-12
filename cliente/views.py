from rest_framework import viewsets
from core.models import Cliente
from .serializer import ClienteSerializer

# Create your views here.


class ClienteView(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer
    queryset = Cliente.objects.all()
