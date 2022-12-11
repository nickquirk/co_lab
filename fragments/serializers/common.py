from rest_framework import serializers
from ..models import Fragment

# Custom Model Serializer
class FragmentSerializer(serializers.ModelSerializer):
  # Fragment subclass 
  class Meta:
    model = Fragment # Specify which table/model we are aerializing the data for 
    fields = '__all__' # Get all data from model