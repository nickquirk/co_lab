from django.db import models

# Create your models here.
class Track(models.Model):
    owner = models.ForeignKey(
      'jwt_auth.User',
      related_name='tracks',
      on_delete=models.CASCADE
    )
    data = models.TextField()
    fragment = models.ForeignKey(
      'fragments.Fragment',
      related_name='tracks',
      on_delete=models.CASCADE
    )
    instrument = models.TextField()
