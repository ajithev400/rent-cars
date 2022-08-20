from importlib.resources import Resource
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    def post(self,request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist
            return Resource(status= status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Resource(status=status.HTTP_400_BAD_REQUEST)
