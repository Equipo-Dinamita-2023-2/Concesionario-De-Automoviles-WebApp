from django.shortcuts import render
from rest_framework import viewsets
from .serializer import VendedorSerializer
from core.models import Empleado

# Create your views here.


class VendedorView(viewsets.ModelViewSet):
    serializer_class = VendedorSerializer
    queryset = Empleado.objects.all()