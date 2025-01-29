from django.db import models
from django.db.models.signals import post_save # es una señal que se dispara automaticamente despues de guardar una instancia
from django.dispatch import receiver #permite que esta función se ejecute cuando se envíe la señal.
from django.contrib.auth.hashers import check_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.
class Genero(models.Model):
    genero=models.CharField(max_length=20)

    def __str__(self):
        return self.genero

class Usuario(models.Model):
      rut= models.CharField(primary_key=True,max_length=10)
      nombre=models.CharField(max_length=20)   
      apellido=models.CharField(max_length=20) 
      correo=models.EmailField(unique=True, max_length=50)
      contraseña=models.CharField(max_length=100)
      is_staff = models.BooleanField(default=False)
      last_login = models.DateTimeField(auto_now=True)

class Comic(models.Model):
    titulo = models.CharField(max_length=200)
    autor = models.CharField(max_length=100)
    editorial = models.CharField(max_length=100)
    fecha_publicacion = models.DateField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    genero = models.CharField(max_length=50)
    descripcion = models.TextField()      

    def __str__(self):
        return self.titulo

class Perfil(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='perfil')
    bio = models.TextField(blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return f"Perfil de {self.usuario.nombre} {self.usuario.apellido}"


# Señal para crear el perfil automáticamente
@receiver(post_save, sender=Usuario)
def crear_usuario_perfil(sender, instance, created, **kwargs):
    if created:
        Perfil.objects.create(usuario=instance)


# Señal para guardar automáticamente el perfil cuando se guarda el usuario
@receiver(post_save, sender=Usuario)
def guardar_usuario_perfil(sender, instance, **kwargs):
    instance.perfil.save()        

