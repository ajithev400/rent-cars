from django.urls import path
from .views import BlacklistTokenUpdateView
urlpatterns = [
    path('logout/blacklist/',BlacklistTokenUpdateView.as_view(), name='blacklist')
]