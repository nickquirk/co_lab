from rest_framework import serializers
from .common import FragmentSerializer
from tracks.serializers.common import TrackSerializer
from jwt_auth.serializers.common import UserSerializer


# Custom Model Serializer
class PopulatedFragmentSerializer(FragmentSerializer):
  tracks = TrackSerializer(many=True)
  owner = UserSerializer()