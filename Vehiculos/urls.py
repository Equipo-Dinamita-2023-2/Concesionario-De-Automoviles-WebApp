from django.urls import path, include
from rest_framework import routers
from Vehiculos import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'vehiculo', views.VehiculosView, 'vehiculo')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]

