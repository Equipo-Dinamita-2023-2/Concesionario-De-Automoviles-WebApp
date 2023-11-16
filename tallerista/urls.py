from django.urls import path, include
from rest_framework import routers
from tallerista import views

# versionado de api
router = routers.DefaultRouter()
router.register(r'tallerista', views.TalleristaView, 'tallerista')

urlpatterns = [
    path("api/v1/", include(router.urls))
]