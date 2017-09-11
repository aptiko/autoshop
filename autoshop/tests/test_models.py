import datetime

from django.contrib.auth.models import User
from django.test import TestCase

from autoshop import models


class RepairTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='george',
                                        password='topsecret')
        models.Repair.objects.create(assigned_user=self.user,
                                     date=datetime.date(2017, 4, 27),
                                     time=datetime.time(13, 45),
                                     complete=False)

    def test_str(self):
        repair = models.Repair.objects.all()[0]
        self.assertEqual(
            str(repair),
            'Repair {} at 2017-04-27 13:45:00'.format(repair.id))

    def test_unique_together(self):
        self.assertRaises(Exception, models.Repair.objects.create,
                          assigned_user=self.user,
                          date=datetime.date(2017, 4, 27),
                          time=datetime.time(13, 45),
                          complete=True)
