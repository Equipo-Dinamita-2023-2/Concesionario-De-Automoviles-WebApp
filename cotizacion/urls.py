from django.urls import path, include
from rest_framework.documentation import include_docs_urls
from rest_framework import routers
from cotizacion import views

# Versionado de api
router = routers.DefaultRouter()
router.register(r'cotizacion', views.CotizacionView, 'cotizacion')

urlpatterns = [
    path("api/v2/", include(router.urls)),
    path("docs/", include_docs_urls(title="Cotizacion API"))
]

