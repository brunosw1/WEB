from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
    path('', views.index, name='inicio'),
    path('prox_lanzamiento', views.prox_lanz, name='prox_lanzamiento'),
    path('tiendas', views.tiendas, name='tiendas'),
    path('nosotros', views.nosotros, name='nosotros'),
    path('registro', views.registro, name='registro'),
]