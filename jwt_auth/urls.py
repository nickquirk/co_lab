from django.urls import path
from .views import RegisterView, LogInView, UserListView, UserDetailView

urlpatterns = [
  path('', UserListView.as_view()),
  path('register/', RegisterView.as_view()),
  path('login/', LogInView.as_view()),
  path('<int:pk>/', UserDetailView.as_view())
]

