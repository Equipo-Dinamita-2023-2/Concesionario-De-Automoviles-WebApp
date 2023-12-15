from django.urls import path, include
from rest_framework import routers
from tipoVehiculo import views

router = routers.DefaultRouter()
router.register(r'tipovehiculo', views.TipovView, 'tipovehiculo')

urlpatterns = [
    path("api/v1/", include(router.urls)),
]