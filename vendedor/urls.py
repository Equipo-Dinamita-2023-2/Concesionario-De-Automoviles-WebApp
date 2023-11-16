from django.urls import path, include
from rest_framework import routers
from vendedor import views

# versionado de api
router = routers.DefaultRouter()
router.register(r'vendedor', views.VendedorView, 'vendedor')

urlpatterns = [
    path("api/v1/", include(router.urls))
]