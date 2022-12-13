from rest_framework import serializers
from ..models import Track

# Custom Model Serializer
class TrackSerializer(serializers.ModelSerializer):
  # Fragment subclass 
  class Meta:
    model = Track # Specify which table/model we are aerializing the data for 
    fields = '__all__' # Get all data from model