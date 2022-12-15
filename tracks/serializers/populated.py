from .common import TrackSerializer
from tracks.serializers.common import TrackSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedTrackSerializer(TrackSerializer):
  owner = UserSerializer()