from django.urls import path
from .views import RegisterView, LogInView

urlpatterns = [
  path('register/', RegisterView.as_view()),
  path('login/', LogInView.as_view())
]

