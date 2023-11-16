from django.urls import path, include
from rest_framework import routers
from cliente import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'cliente', views.ClienteView, 'cliente')

urlpatterns = [
    path("api/v1/", include(router.urls))
]
