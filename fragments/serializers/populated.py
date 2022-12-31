from rest_framework import serializers
from .common import FragmentSerializer
from tracks.serializers.populated import PopulatedTrackSerializer
from jwt_auth.serializers.common import UserSerializer


# Custom Model Serializer
class PopulatedFragmentSerializer(FragmentSerializer):
  tracks = PopulatedTrackSerializer(many=True)
  owner = UserSerializer()