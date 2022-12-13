

from .models import Fragment # Import models so we can query the database
from .serializers.common import FragmentSerializer # Convert data recieved into python data type

# Rest Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# Custom Fragments List View 
class FragmentListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  # GET ALL FRAGMENTS CONTROLLER
  # Endpoint: /fragments
  # Description: Return all fragments in framents table to user
  def get(self, _request):
    # Query the database using the model, getting all fragments back as a queryset
    fragments = Fragment.objects.all()
    # Serialize queryset and cobvert into python datatype
    return Response("HIT FRAGMENT GET ENDPOINT")
  def post(self, request):
    request.data['owner'] = request.user.id
    print(request.data)
    return Response('')


