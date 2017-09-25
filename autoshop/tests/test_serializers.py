import datetime

from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework.renderers import JSONRenderer

from autoshop import models
from autoshop.serializers import RepairCommentSerializer, RepairSerializer


class RepairSerializerTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='george',
                                        password='topsecret')
        models.Repair.objects.create(assigned_user=self.user,
                                     date=datetime.date(2017, 4, 27),
                                     time=datetime.time(13, 00),
                                     description='Important repair',
                                     status=0)

    def test_serializer(self):
        repair = models.Repair.objects.all()[0]
        serializer = RepairSerializer(repair)
        self.assertEqual(serializer.data,
                         {'id': repair.id,
                          'assigned_user': self.user.id,
                          'date': '2017-04-27',
                          'time': '13:00:00',
                          'description': 'Important repair',
                          'status': 0,
                          })
        json = ('{{"id":{},"assigned_user":{},"date":"2017-04-27",'
                '"time":"13:00:00","description":"Important repair",'
                '"status":0}}'
                ).format(repair.id, self.user.id)
        self.assertEqual(JSONRenderer().render(serializer.data),
                         bytes(json, 'utf-8'))


class RepairCommentSerializerTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='george',
                                        password='topsecret')
        self.repair = models.Repair.objects.create(
            assigned_user=self.user,
            date=datetime.date(2017, 4, 27),
            time=datetime.time(13, 00),
            description='Important repair',
            status=0)
        models.RepairComment.objects.create(
            repair=self.repair,
            user=self.user,
            date=datetime.datetime(2017, 4, 28, 17, 35),
            comment='The car has blown up and is unsalvageable'
        )

    def test_serializer(self):
        repair_comment = models.RepairComment.objects.all()[0]
        serializer = RepairCommentSerializer(repair_comment)
        self.assertEqual(serializer.data, {
            'id': repair_comment.id,
            'repair': self.repair.id,
            'user': self.user.id,
            'date': '2017-04-28T17:35:00',
            'comment': 'The car has blown up and is unsalvageable'
        })
        json = ('{{"id":{},"repair":{},"user":{},"date":"2017-04-28T17:35:00",'
                '"comment":"The car has blown up and is unsalvageable"}}'
                ).format(repair_comment.id, self.repair.id, self.user.id)
        self.assertEqual(JSONRenderer().render(serializer.data),
                         bytes(json, 'utf-8'))
