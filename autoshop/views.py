from django.contrib.auth.models import User
from django.core.exceptions import PermissionDenied
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie

from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from . import models
from .permissions import RepairPermission, UserPermission
from .serializers import RepairSerializer, UserSerializer


class AdminRepairList(generics.ListCreateAPIView):
    serializer_class = RepairSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return models.Repair.objects.all()


class UserRepairList(generics.ListAPIView):
    serializer_class = RepairSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        user = User.objects.get(pk=self.kwargs['pk'])
        if not self.request.user.is_staff and \
                user.id != self.request.user.id:
            raise PermissionDenied
        return models.Repair.objects.filter(assigned_user=user)


class RepairDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = RepairSerializer
    permission_classes = (RepairPermission,)

    def get_queryset(self):
        return models.Repair.objects.all()


class UserList(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)

    def get_queryset(self):
        return User.objects.all()


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    permission_classes = (UserPermission,)

    def get_queryset(self):
        return User.objects.all()


@method_decorator(ensure_csrf_cookie, name='dispatch')
class Dummy(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, format=None):
        return Response({})
