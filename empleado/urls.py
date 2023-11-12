from django.urls import path, include
from rest_framework import routers
from empleado import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'empleado', views.EmpleadoView, 'empleado')

urlpatterns = [
    path("api/v1/", include(router.urls))
]
