from .models import Genero,Usuario,Perfil,Comic
from django.views.generic import ListView, CreateView, UpdateView, DeleteView, DetailView
from .models import Usuario
from .models import Perfil
from .models import Comic
from django.urls import reverse_lazy #ayuda cuando el huzo pramaturo a las URL puede causar problemas
import hashlib
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.http import require_POST
from django.contrib.auth import logout
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password
# Create your views here.
def index(request):
    context={}
    return render(request,'index.html', context)

def prox_lanz(request):
    context={}
    return render(request,'catalogo.html', context)

def tiendas(request):
    context={}
    return render(request,'tiendas.html', context)

def nosotros(request):
    context={}
    return render(request,'nosotros.html', context)

def registro_exitoso(request):
    return render(request, 'registro_exitoso.html')

def carrito(request):
    context={}
    return render(request,'carrito.html', context)

def producto(request):
    context={}
    return render(request,'comic_list.html', context)

def carrito(request):
    context={}
    return render(request,'carrito.html', context)

def usuarios_list(request):
    usuarios = Usuario.objects.all()  # Obtiene todos los usuarios de la base de datos
    context = {"usuarios": usuarios}  # Pasa los datos de usuarios al template
    return render(request, 'usuarios/registro.html', context)

def generos_list(request):
    generos = Genero.objects.all()  # Obtiene todos los géneros de la base de datos
    context = {"generos": generos}  # Pasa los datos de géneros al template
    return render(request, 'generos/registro.html', context)

# Vista para listar cómics
def comics_list(request):
    comics = Comic.objects.all()  # Obtiene todos los cómics de la base de datos
    context = {'comics': comics}  # Pasa los datos de cómics al template
    return render(request, 'comic_list.html', context)

def perfil_list(request):
    perfil = Perfil.objects.get(usuario=request.user)
    context = {'perfil': perfil}
    return render(request, 'perfil/inicio_sesion.html', context)

#Crud Usuario -------------------------------------------
class UsuarioListView(ListView):
    model = Usuario
    template_name = 'usuarios_list.html'
    context_object_name = 'usuarios'

class UsuarioCreateView(CreateView):
    model = Usuario
    fields = ['rut', 'nombre', 'apellido','correo', 'contraseña', 'confirmar_contraseña'] 
    template_name = 'usuarios_create.html'
    success_url = reverse_lazy('usuario-list')

class UsuarioUpdateView(UpdateView):
    model = Usuario
    fields = ['rut', 'nombre', 'apellido','correo', 'contraseña', 'confirmar_contraseña'] 
    template_name = 'usuarios_update.html'
    success_url = reverse_lazy('usuario-list')

class UsuarioDeleteView(DeleteView):
    model = Usuario
    template_name = 'usuarios_delete.html'
    success_url = reverse_lazy('usuario-list')

#Crud Comic -------------------------------------------    
class ComicListView(ListView):
    model = Comic
    template_name = 'comic_list.html'
    context_object_name = 'comics'

class ComicCreateView(CreateView):
    model = Comic
    fields = ['titulo', 'autor', 'editorial', 'fecha_publicacion', 'precio', 'genero', 'descripcion']
    template_name = 'comic_create.html'
    success_url = reverse_lazy('comic-list')

class ComicUpdateView(UpdateView):
    model = Comic
    fields = ['titulo', 'autor', 'editorial', 'fecha_publicacion', 'precio', 'genero', 'descripcion']
    template_name = 'comic_update.html'
    success_url = reverse_lazy('comic-list')

class ComicDeleteView(DeleteView):
    model = Comic
    template_name = 'comic_delete.html'
    success_url = reverse_lazy('comic-list')

#Crud Comic ------------------------------------------- 
class PerfilDetailView(DetailView):
    model = Perfil
    template_name = 'perfil_detail.html'

class PerfilUpdateView(UpdateView):
    model = Perfil
    fields = ['bio', 'avatar']
    template_name = 'perfil_update.html'
    success_url = reverse_lazy('perfil-detail')    

def usuarios_create(request):
    if request.method == "POST":
        # Obtener los datos del formulario
        rut = request.POST.get('rut')
        dv = request.POST.get('dv')
        nombre = request.POST.get('firstname')
        apellido = request.POST.get('lastname')
        correo = request.POST.get('email')
        password = request.POST.get('password')

        hashed_password = make_password(password)

        # Crear el objeto usuario y guardarlo en la base de datos
        usuario = Usuario(
            rut=rut,
            nombre=nombre,
            apellido=apellido,
            correo=correo,
            contraseña=hashed_password  
        )
        usuario.save()  # Guardar en la base de datos
        # Mensaje de éxito
        messages.success(request, "¡Usuario registrado correctamente!") 
    else:
        return render(request, 'usuarios_create.html') # SI ES GET


#Verificador inicio sesion
def login_usuario(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')

        try:
            usuario = Usuario.objects.get(correo=email)  # Buscar al usuario por correo
            if check_password(password, usuario.contraseña):  # Verificar la contraseña
                # Si la contraseña es correcta, autenticar al usuario
                login(request, usuario)  # Guardar al usuario en la sesión
                messages.success(request, "Inicio de sesión exitoso")
                return redirect('inicio')  # Redirigir a la página de inicio u otra
            else:
                messages.error(request, "Contraseña incorrecta")
        except Usuario.DoesNotExist:
            messages.error(request, "Usuario no encontrado")
    else:
        return render(request, 'inicio_sesion.html')
    
@require_POST  
def custom_logout(request):
    logout(request)  # Cierra la sesión
    return redirect('inicio')  # Redirige a la página principal o a donde desees