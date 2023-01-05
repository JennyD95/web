from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('guestbook/', views.guestbook, name='guestbook'),
    path('', views.loginFunc, name='loginFunc'),
    path('intro/', views.intro, name= 'intro'),
    path('projekte/', views.kanban, name= 'projekte'),
    path('kontakt/', views.kontakt, name= 'kontakt'),
    path('projekte/tictactoe/', views.tictactoe, name= 'tictactoe'),
    path('projekte/snake/', views.snake, name= 'snake'),
    path('projekte/kanban', views.kanban, name= 'kanban'),
]