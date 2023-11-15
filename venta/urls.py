from django.urls import path, include
from rest_framework import routers
from venta import views

router = routers.DefaultRouter()
router.register(r'venta', views.VentaView, 'venta')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]