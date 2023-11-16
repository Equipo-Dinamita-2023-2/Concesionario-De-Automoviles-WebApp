from django.urls import path, include
from rest_framework import routers
from orden_de_reparacion import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'orden_de_reparacion', views.OrdenReparacionView, 'orden_de_reparacion')

urlpatterns = [
    path("api/v1/", include(router.urls))
]
