from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import PermissionDenied
from django.conf import settings
import jwt

from django.contrib.auth import get_user_model
User = get_user_model()

# Extend BaseAuthentication and override authenticate method
class JWTAuthentication(BaseAuthentication):
  def authenticate(self, request):
    print('REQUEST HEADERS ->', request.headers)
  # check authorisation header exist
    headers = request.headers.get('Authorization')
    if not headers:
      return None
    # Ensue its a Bearer token
    if not headers.startswith('Bearer '):
      raise PermissionDenied('Invalid Token')
    # Remove bearer and space from the Authorization header, saving just token to variable
    token = headers.replace('Bearer ', '')
    print('TOKEN ->', token)
    try: 
      # Using JWT method to verify token is valid and extracting the payload
      print(settings.SECRET)
      payload = jwt.decode(token, settings.SECRET,algorithms=['HS256'])
      print('PAYLOAD ->', payload)
      # Using sub query the user table to find a match
      user = User.objects.get(pk=payload['sub'])
      print(user)
    except User.DoesNotExist as e:
      raise PermissionDenied('User not found')
    except Exception as e:
      print(e)
      raise PermissionDenied(str(e))
      # Return a two-tuple containing the user object returned from the database, and the token used to verify them
    return (user, token)
    