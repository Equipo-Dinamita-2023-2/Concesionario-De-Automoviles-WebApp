from django.urls import path, include
from rest_framework import routers
from rol_empleado import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'rol_empleado', views.RolEmpleadoView, 'rol_empleado')

urlpatterns = [
    path("api/v1/", include(router.urls))
]
