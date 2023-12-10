from django.urls import path, include
from rest_framework import routers
from repuestos import views

router = routers.DefaultRouter()
router.register(r'repuesto', views.ReparacionView, 'repuesto')

urlpatterns = [
    path("api/v1/", include(router.urls))
]