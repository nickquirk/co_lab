from django.urls import path
from .views import RegisterView, LogInView, UserListView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LogInView.as_view()),
  path('users/', UserListView.as_view())
]

