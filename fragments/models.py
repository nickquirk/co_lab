from django.db import models

# Fragment model extending Model class
class Fragment(models.Model):
  # Create static elements
    owner = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    tempo = models.PositiveIntegerField()
  # Method to return fragment data as a string
    def __str__(self):
      return f"{self.owner} - {self.name} : {self.tempo}"