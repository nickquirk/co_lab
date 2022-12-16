from .models import Track # Import models so we can query the database
from .serializers.common import TrackSerializer # Convert data recieved into python data type
from .serializers.populated import PopulatedTrackSerializer

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
    # Serialize queryset and convert into python datatype
    serialized_tracks = PopulatedTrackSerializer(tracks, many=True)
    return Response(serialized_tracks.data, status.HTTP_200_OK)
    
  def post(self, request):
    all_fragment_tracks = Track.objects.filter(fragment = request.data['fragment'])
    print('ALL FRAGMENT TRACKS!🥹', len(all_fragment_tracks))
    if len(all_fragment_tracks) >= 4:
      return Response({'message':'Cannot add more than 4 tracks to a fragment'}, status.HTTP_422_UNPROCESSABLE_ENTITY)
    track_to_add = TrackSerializer(data=request.data)
    request.data['owner'] = request.user.id
    print(request.data)
    try:
      if track_to_add.is_valid():
        print(track_to_add.validated_data)
        track_to_add.save()
        return Response(track_to_add.data, status.HTTP_201_CREATED)
      else:
        print(track_to_add.errors)
        return Response(track_to_add.data, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


