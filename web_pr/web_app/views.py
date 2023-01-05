from django.shortcuts import render
from .forms import ContactForm
from django.core.mail import send_mail
from django.core import mail
from django.contrib import messages
from .models import *
from django.contrib.auth.models import Permission, User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login


# Create your views here.
def index(request):
    return render(request, 'index.html')

def loginFunc(request):

    if request.method== "POST":
        username= request.POST['name']
        password= request.POST['password']
        user_id = request.GET.get('user_id')
        user = authenticate(request, username=username, password=password)
        if user is None:
            return render(request, 'login.html')
        else:
            login(request, user)
            return render(request, 'intro.html')
    if request.user.is_authenticated:
        return render(request, 'intro.html')
    return render(request, 'login.html')

@login_required    
def intro(request):
    return render(request, 'intro.html')

@login_required
def projekte(request):
    return render(request, 'projekte.html')

#Zu Beginn werden mehrere Variablen initialisiert, die später im Verlauf der Funktion verwendet werden. gameover gibt an, ob das Spiel beendet ist, error gibt an, ob es beim Absenden des Formulars zu einem Fehler gekommen ist, clist ist eine Liste von Zahlen von 0 bis 599, die später als Namen für die einzelnen Felder des Spielfelds verwendet werden, name speichert den aktuellen Status des Spiels (z.B. "gameover" oder "startGame") und size speichert die Größe der Schlange beim Ende des Spiels. highscore ist eine Liste der Highscores, die aus der Datenbank ausgelesen wird.
#je nach status wird unterschiedlich weiterverfahren. Wenn der Status 'startGame' ist, wird eine Liste mit der Anzahl von Felder 0-599 übergeben und status auf 'on gesetzt
#bei status 'gameover' wird die größe der Schlange übergeben und gameover auf true gesetzt
#ein anderer status hat man wenn, der Spieler sein Name angegeben hat, hier wird überprüft wie lange der Name ist 
#und wenn er nicht größer als 9  Zeichen ist wir ein SnakeHishcore Element erstellt ansonst wird die variable error auf true gestzt
#bei einer get methode übergibt er nur den status startGame
@login_required
def snake(request):
    gameover= False
    error=False
    clist= []
    status=""
    size=0
    highscore = SnakeHighcore.objects.order_by('-points').values_list('name', 'points')[:10]

    if request.method=='POST':
        if request.POST['status']=='startGame':
            status="on"
            clist= range(0,384)

        elif request.POST['status']=='gameOver':
            gameover=True
            status= "gameover"
            size= request.POST['size']
        else:
            playerName= request.POST['playerName']
            if len(playerName)>9:
                gameover=True
                status= "gameover"
                size= request.POST['size']
                error= True
            
            else:
                obj= SnakeHighcore.objects.create(name= request.POST['playerName'],points= request.POST['size'])
                obj.save()
                highscore = SnakeHighcore.objects.order_by('-points').values_list('name', 'points')[:10]
            
                status="startGame"
    else:
        status="startGame"
    return render(request, 'snake.html', {'clist':clist, 'status':status, 'gameover': gameover, "size":size, "highscore": highscore, "error": error})

@login_required
def kontakt(request): 
    if request.method== 'POST':
        connection = mail.get_connection()   # Use default email connection
        form= ContactForm(request.POST)

        if form.is_valid():
            
            print('the form was valid')
            #connection.send_mail('The contact form subject', 'This is the message', 'ayanounso@gmail.com', ['Jennaax3@gmx.de'])
            send_mail('The contact form subject', 'This is the message', 'ayanounso@gmail.com', ['Jennaax3@gmx.de'])
            messages.success(request, 'Die Anfrage wurde erfolgreich versendet.')
            form= ContactForm()
            
        else: 
            print("form isnt valid")
            messages.warning(request, 'Die Anfrage ist Fehlerhaft oder unvollständig und konnte nicht versendet werden. Bitte Korrigieren Sie Ihre Daten.')
            
        connection.close()
    else:
        form= ContactForm()
    
    print(form)



    return render(request, 'kontakt.html',{'form':form})

@login_required
def tictactoe(request):
    return render(request, 'tictactoe.html')

@login_required
def nasa(request):

    return render(request, 'nasa.html')

@login_required
def kanban(request):
    projects= Project.objects.all()
    todosRed= {}
    todosYellow={}
    todosGreen= {}

    for i in projects:
        t=TodoRed.objects.all().filter(project= i)
        t2=TodoYellow.objects.all().filter(project=i)
        t3=TodoGreen.objects.all().filter(project=i)
        if(len(t)>0):
            todosRed[i.name]= t
        if(len(t2)>0):
            todosYellow[i.name]= t2
        if(len(t3)>0):
            todosGreen[i.name]= t3

    return render(request, 'kanban.html', {'todosRed': todosRed, 'todosYellow':todosYellow, 'todosGreen':todosGreen})

@login_required
def guestbook(request):
    return render(request, 'guestbook.html')