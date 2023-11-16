from django.urls import path, include
from rest_framework import routers
from orden_reparacion import views

router = routers.DefaultRouter()
router.register(r'reparacion', views.ReparacionView, 'orden_reparacion')

urlpatterns = [
    path("api/v1/", include(router.urls))
]