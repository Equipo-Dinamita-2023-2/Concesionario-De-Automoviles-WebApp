from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TalleristaSerializer
from core.models import Empleado

# Create your views here.


class TalleristaView(viewsets.ModelViewSet):
    serializer_class = TalleristaSerializer
    queryset = Empleado.objects.all()