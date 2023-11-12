from django.urls import path, include
from rest_framework import routers
from sucursal import views

# versionado de api
router = routers.DefaultRouter()
router.register(r'sucursal', views.SucursalView, 'sucursal')

urlpatterns = [
    path("api/v1/", include(router.urls))
]