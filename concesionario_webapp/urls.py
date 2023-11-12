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
from rol_empleado import urls as rol_empleado_urls
from empleado import urls as empleado_urls

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cliente/', include(cliente_urls)),
    path('rol_empleado/', include(rol_empleado_urls)),
    path('empleado/', include(empleado_urls))
]
