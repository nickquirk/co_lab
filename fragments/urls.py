from django.urls import path
from .views import FragmentListView, FragmentDetailView

# For every endpoint create a new path
urlpatterns = [
    path('', FragmentListView.as_view()),
    path('<int:pk>/', FragmentDetailView.as_view())
]