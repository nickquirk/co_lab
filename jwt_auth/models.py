from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
  email = models.CharField(max_length=50, unique=True)
  username = models.CharField(max_length=50, unique=True)
  profile_image = models.CharField(max_length=300, default=None, blank=True, null=True)
  # Method to return User data as a string
  def __str__(self):
    return f"{self.email} : {self.username}"