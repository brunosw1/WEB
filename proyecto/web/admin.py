from django.contrib import admin
from .models import Genero
from .models import Usuario
from .models import Comic
from .models import Perfil
# Register your models here.
admin.site.register(Genero)
admin.site.register(Usuario)
admin.site.register(Comic)
admin.site.register(Perfil)
