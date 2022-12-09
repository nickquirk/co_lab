from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

from django.core.exceptions import ValidationError

# Get current user model, remember to call function otherwise you wont' get any data! 
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
  # Make sure password fields do not appear on JSON response
  password = serializers.CharField(write_only=True)
  # return the confirmation field in serialized results
  password_confirmation = serializers.CharField(write_only=True)
  class Meta:
      model = User
      fields = ('id', 'email', 'username', 'first_name', 'last_name', 'profile_image', 'password', 'password_confirmation')

  def validate(self, data):
      print('data ->', data)
      password = data.pop('password')
      password_confirmation = data.pop('password_confirmation')
      # check to see if password match
      if password != password_confirmation:
          raise ValidationError({
              'password_confirmation': 'Does not match the password field'
          })
      # validate the password
      password_validation.validate_password(password)
      # hash the password and put it back on the data object and return to function
      data['password'] = make_password(password)
      # return the new data
      return data