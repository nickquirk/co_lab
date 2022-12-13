from .models import Track # Import models so we can query the database
from .serializers.common import TrackSerializer # Convert data recieved into python data type

# Rest Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import status
from rest_framework.exceptions import NotFound

# Custom Tracks List View 
class TrackListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  # GET ALL Tracks CONTROLLER
  # Endpoint: /fragments
  # Description: Return all fragments in fragments table to user
  def get(self, _request):
    # Query the database using the model, getting all fragments back as a queryset
    tracks = Track.objects.all()
    # Serialize queryset and cobvert into python datatype
    serialized_tracks = TrackSerializer(tracks, many=True)
    return Response(serialized_tracks.data, status.HTTP_200_OK)
    
  def post(self, request):
    request.data['owner'] = request.user.id
    print(request.data)
    return Response('Track Created')

  