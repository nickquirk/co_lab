from django.urls import path
from .views import TrackListView

# For every endpoint create a new path
urlpatterns = [
    path('', TrackListView.as_view())
]