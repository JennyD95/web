from django.db import models

# Create your models here.

class Project(models.Model):
    name=models.CharField(max_length=20)

    def __str__(self) -> str:
        return self.name

class TodoRed(models.Model):
    project= models.ForeignKey(Project, on_delete=models.CASCADE)
    todo= models.CharField(max_length=200)

    def delete(self, *args, **kwargs):
        todo_yellow = TodoYellow.objects.create(project=self.project, todo=self.todo)
        todo_yellow.todo = self.todo
        todo_yellow.save()
        super().delete(*args, **kwargs)
    
    def __str__(self) -> str:
        return self.project.name+":"+self.todo

class TodoYellow(models.Model):
    project= models.ForeignKey(Project, on_delete=models.CASCADE)
    todo= models.CharField(max_length=200)

    def delete(self, *args, **kwargs):
        todoGreen= TodoGreen.objects.create(project=self.project)
        todoGreen.todo= self.todo
        todoGreen.save()
        
        super().delete(*args, **kwargs)

    def __str__(self) -> str:
        return self.project.name+":"+self.todo

class TodoGreen(models.Model):
    project= models.ForeignKey(Project, on_delete=models.CASCADE)
    todo= models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.project.name+":"+self.todo

class SnakeHighcore(models.Model):
    name= models.CharField(max_length=14)
    points=models.IntegerField()

    

