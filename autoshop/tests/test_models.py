import datetime

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.test import TestCase

from autoshop import models


class RepairTestCase(TestCase):

    def setUp(self):
        self.user = User.objects.create(username='george',
                                        password='topsecret')
        models.Repair.objects.create(assigned_user=self.user,
                                     date=datetime.date(2017, 4, 27),
                                     time=datetime.time(13, 00),
                                     description='Important repair',
                                     status=0)

    def test_str(self):
        repair = models.Repair.objects.all()[0]
        self.assertEqual(
            str(repair),
            'Repair {}, "Important repair", at 2017-04-27 13:00:00'.format(
                repair.id))

    def test_unique_together(self):
        self.assertRaises(Exception, models.Repair.objects.create,
                          assigned_user=self.user,
                          date=datetime.date(2017, 4, 27),
                          time=datetime.time(13, 00),
                          description='Very important repair',
                          status=1)

    def test_time_ends_in_zero(self):
        self.assertRaises(ValidationError, models.Repair.objects.create,
                          assigned_user=self.user,
                          date=datetime.date(2017, 4, 28),
                          time=datetime.time(13, 1),
                          description='Super important repair',
                          status=1)
        self.assertRaises(ValidationError, models.Repair.objects.create,
                          assigned_user=self.user,
                          date=datetime.date(2017, 4, 28),
                          time=datetime.time(13, 0, 1),
                          description='Extra important repair',
                          status=1)
        # But the following should not raise
        models.Repair.objects.create(
            assigned_user=self.user,
            date=datetime.date(2017, 4, 28),
            time=datetime.time(13, 0, 0),
            description='Outrageously important repair',
            status=1)
