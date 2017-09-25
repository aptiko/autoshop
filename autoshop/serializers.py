from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Repair, RepairComment


class RepairSerializer(serializers.ModelSerializer):

    class Meta:
        model = Repair
        fields = ('id', 'assigned_user', 'date', 'time', 'description',
                  'status')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'is_staff')


class RepairCommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = RepairComment
        fields = ('id', 'repair', 'user', 'date', 'comment')
