"""
URL configuration for concesionario_webapp project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from cliente import urls as cliente_urls
from cotizacion import urls as cotizacion_urls
from orden_de_reparacion import urls as or_urls
from tallerista import urls as tallerista_urls
from vendedor import urls as vendedor_urls
from venta import urls as venta_urls
from sucursal import urls as sucursal_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('cliente/', include(cliente_urls)),
    path('cotizaciones/', include(cotizacion_urls)),
    path('empleado/', include('empleado.urls')),
    path('orden_de_reparacion/', include(or_urls)),
    path('sucursal/', include(sucursal_urls)),
    path('tallerista/', include(tallerista_urls)),
    path('tipovehiculo/', include('tipoVehiculo.urls')),
    path('vehiculo/', include('Vehiculos.urls')),
    path('vendedor/', include(vendedor_urls)),
    path('venta/', include(venta_urls))
]
