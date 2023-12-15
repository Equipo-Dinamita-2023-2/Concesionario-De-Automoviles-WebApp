from django.urls import path, include
from rest_framework import routers
from roles import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'rol', views.RolEmpleadoView, 'rol')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]

