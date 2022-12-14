

from .models import Fragment # Import models so we can query the database
from .serializers.common import FragmentSerializer # Convert data recieved into python data type

# Rest Framework Imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import NotFound

# Custom Fragments List View 
class FragmentListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly, )
  # GET ALL FRAGMENTS CONTROLLER
  # Endpoint: /fragments
  # Description: Return all fragments in fragments table to user
  def get(self, _request):
    # Query the database using the model, getting all fragments back as a queryset
    fragments = Fragment.objects.all()
    # Serialize queryset and cobvert into python datatype
    serialized_fragments = FragmentSerializer(fragments, many=True)
    return Response(serialized_fragments.data, status.HTTP_200_OK)
    
  def post(self, request):
    fragment_to_add = FragmentSerializer(data=request.data)
    request.data['owner'] = request.user.id
    print(request.data)
    try:
      if fragment_to_add.is_valid():
        print(fragment_to_add.validated_data)
        fragment_to_add.save()
        return Response(fragment_to_add.data, status.HTTP_201_CREATED)
      else:
        print(fragment_to_add.errors)
        return Response(fragment_to_add, status.HTTP_422_UNPROCESSABLE_ENTITY)
    except Exception as e:
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

# Endpoint: /fragments/:fragmentId
class FragmentDetailView(APIView):
  # CUSTOM FUNCTION / NOT A CONTROLLER
  # We can call this in other controllers to provide the functionality defined here
  def get_fragment(self, pk):
    try:
      # Get the fragment where pk = pk passed in the url
      return Fragment.objects.get(pk=pk)
    except Fragment.DoesNotExist as e:
        print(e)
        # Need to stringify e when we return it
        raise NotFound(str(e))
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)


  def get(self,_request, pk):
    try:
        # Get the fragment where pk = pk passed in url
        fragment = self.get_fragment(pk)
        serialized_fragment = FragmentSerializer(fragment)
        return Response(serialized_fragment.data)
    except Fragment.DoesNotExist as e:
        print(e)
        # Need to stringify e when we return it
        raise NotFound(str(e))
    except Exception as e:
      print(e)
      return Response(str(e), status.HTTP_500_INTERNAL_SERVER_ERROR)

