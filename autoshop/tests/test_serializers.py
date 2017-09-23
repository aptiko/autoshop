import datetime

from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.renderers import JSONRenderer

from autoshop import models
from autoshop.serializers import RepairSerializer


class RepairSerializerTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='george',
                                        password='topsecret')
        models.Repair.objects.create(assigned_user=self.user,
                                     date=datetime.date(2017, 4, 27),
                                     time=datetime.time(13, 00),
                                     status=0)

    def test_serializer(self):
        repair = models.Repair.objects.all()[0]
        serializer = RepairSerializer(repair)
        self.assertEqual(serializer.data,
                         {'id': repair.id,
                          'assigned_user': self.user.id,
                          'date': '2017-04-27',
                          'time': '13:00:00',
                          'status': 0,
                          })
        json = ('{{"id":{},"assigned_user":{},"date":"2017-04-27",'
               '"time":"13:00:00","status":0}}'
                ).format(repair.id, self.user.id)
        self.assertEqual(JSONRenderer().render(serializer.data),
                         bytes(json, 'utf-8'))
