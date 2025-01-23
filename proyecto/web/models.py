from django.db import models

# Create your models here.
class Genero(models.Model):
    genero=models.CharField(max_length=20)