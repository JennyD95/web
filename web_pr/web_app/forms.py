from django import forms

class ContactForm(forms.Form):
    
    name= forms.CharField( max_length=255)
    email= forms.EmailField()
    message=forms.CharField(widget=forms.Textarea)
    salutation=forms.CharField()
    subject= forms.CharField(max_length=255)