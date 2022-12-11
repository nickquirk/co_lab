from django.urls import path
from .views import FragmentListView

# For every endpoint create a new path
urlpatterns = [
    path('', FragmentListView.as_view())
]