from django.shortcuts import render

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

def registro(request):
    context={}
    return render(request,'registro.html', context)
