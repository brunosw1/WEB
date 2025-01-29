from django.contrib import admin
from django.urls import path
from django.contrib.auth import views as auth_views
from . import views
from .views import (
    UsuarioListView, UsuarioCreateView, UsuarioUpdateView, UsuarioDeleteView,  # CRUD Usuario
    ComicListView, ComicCreateView, ComicUpdateView, ComicDeleteView,          # CRUD Comic
    PerfilDetailView, PerfilUpdateView                                         # CRUD Perfil
)
from .views import custom_logout


urlpatterns = [
    # Rutas principales
    path('', views.index, name='inicio'),
    path('prox_lanzamiento/', views.prox_lanz, name='prox_lanzamiento'),
    path('tiendas/', views.tiendas, name='tiendas'),
    path('nosotros/', views.nosotros, name='nosotros'),
    path('registro/', views.usuarios_create, name='usuarios_create'),
    path('carrito/', views.carrito, name='carrito'),
    path('login/', views.login_usuario, name='login'),
    path('logout/', custom_logout, name='logout'),
    path('productos/', views.comics_list, name='productos'),
    path('registro_existoso/', views.registro_exitoso, name='registro_existoso'),
    path('carrito/', views.carrito, name='carrito'),

    # CRUD Usuario
    path('usuarios/', UsuarioListView.as_view(), name='usuario-list'),
    path('usuarios/nuevo/', UsuarioCreateView.as_view(), name='usuario-create'),
    path('usuarios/<str:pk>/editar/', UsuarioUpdateView.as_view(), name='usuario-update'),
    path('usuarios/<str:pk>/eliminar/', UsuarioDeleteView.as_view(), name='usuario-delete'),

    # CRUD Comic
    path('comics/', ComicListView.as_view(), name='comic-list'),
    path('comics/nuevo/', ComicCreateView.as_view(), name='comic-create'),
    path('comics/<int:pk>/editar/', ComicUpdateView.as_view(), name='comic-update'),
    path('comics/<int:pk>/eliminar/', ComicDeleteView.as_view(), name='comic-delete'),

    # CRUD Perfil
    path('perfil/<str:pk>/', PerfilDetailView.as_view(), name='perfil-detail'),
    path('perfil/<str:pk>/editar/', PerfilUpdateView.as_view(), name='perfil-update'),
]
