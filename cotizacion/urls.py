from django.urls import path, include
from rest_framework import routers
from cotizacion import views

# Versionado de apis
router = routers.DefaultRouter()
router.register(r'cotizacion', views.CotizacionView, 'cotizacion')

urlpatterns = [
    path('api/v1/', include(router.urls))
]
