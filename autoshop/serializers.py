from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Repair


class RepairSerializer(serializers.ModelSerializer):

    class Meta:
        model = Repair
        fields = ('id', 'assigned_user', 'date', 'time', 'complete')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff')
