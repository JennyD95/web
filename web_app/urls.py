from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.intro),
    path('intro/', views.intro, name= 'intro'),
    path('projekte/', views.projekte, name= 'projekte'),
    path('kontakt/', views.kontakt, name= 'kontakt'),
]