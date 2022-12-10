from django.shortcuts import render
from .forms import ContactForm
from django.core.mail import send_mail
from django.core import mail

# Create your views here.
def index(request):
    return render(request, 'index.html')

def intro(request):
    return render(request, 'intro.html')

def projekte(request):
    return render(request, 'projekte.html')

def kontakt(request):
    
    if request.method== 'POST':
        connection = mail.get_connection()   # Use default email connection
        form= ContactForm(request.POST)
        form.name= request.POST.get('name')
        form.email=request.POST.get('email')
        form.message=request.POST.get('message')
        if form.is_valid():
            
            print('the form was valid')
            connection.send_mail('The contact form subject', 'This is the message', 'ayanounso@gmail.com', ['Jennaax3@gmx.de'])
        else: 
            print("form isnt valid")
            print(form.name)
            send_mail('The contact form subject', 'This is the message', 'ayanounso@gmail.com', ['Jennaax3@gmx.de'])
        connection.close()
    else:
        form= ContactForm()
        print("gugz")

    return render(request, 'kontakt.html',{'form':form})