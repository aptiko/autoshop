import datetime

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from autoshop import models


class RepairTestCase(APITestCase):

    def setUp(self):
        self.alice = User.objects.create(
            username='alice', password=make_password('topsecret'))
        Token.objects.create(user=self.alice)
        self.bob = User.objects.create(
            username='bob', password=make_password('topsecret'))
        Token.objects.create(user=self.bob)
        self.charlie = User.objects.create(
            username='charlie', password=make_password('topsecret'))
        Token.objects.create(user=self.charlie)
        self.david = User.objects.create(
            username='david', password=make_password('topsecret'),
            is_staff=True)
        Token.objects.create(user=self.david)
        self.repair1 = models.Repair.objects.create(
            assigned_user=self.alice, date=datetime.date(2017, 4, 27),
            time=datetime.time(13, 00), complete=False)
        self.repair2 = models.Repair.objects.create(
            assigned_user=self.alice, date=datetime.date(2017, 4, 27),
            time=datetime.time(19, 00), complete=False)

    def test_repair_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)
        response = self.client.get(
            '/api/users/{}/repairs/'.format(self.alice.id))
        expected = (
            '[{{"id":{},"assigned_user":{},"date":"2017-04-27",'
            '"time":"13:00:00","complete":false}},'
            '{{"id":{},"assigned_user":{},"date":"2017-04-27",'
            '"time":"19:00:00","complete":false}}]'
        ).format(
            self.repair1.id, self.alice.id,
            self.repair2.id, self.alice.id
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

    def test_user_repair_list(self):
        # Bob should not be able to see Alice's repairs
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='bob').key)
        response = self.client.get(
            '/api/users/{}/repairs/'.format(self.alice.id))
        self.assertEqual(response.status_code, 403)

        # But David, an admin, should
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.get(
            '/api/users/{}/repairs/'.format(self.alice.id))
        expected = (
            '[{{"id":{},"assigned_user":{},"date":"2017-04-27",'
            '"time":"13:00:00","complete":false}},'
            '{{"id":{},"assigned_user":{},"date":"2017-04-27",'
            '"time":"19:00:00","complete":false}}]'
        ).format(
            self.repair1.id, self.alice.id,
            self.repair2.id, self.alice.id
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

    def test_repair_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)
        response = self.client.get('/api/repairs/{}/'.format(self.repair1.id))
        expected = ('{{"id":{},"assigned_user":{},"date":"2017-04-27",'
                    '"time":"13:00:00","complete":false}}'
                    ).format(self.repair1.id, self.alice.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

    def test_normal_user_cannot_create_repair(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)
        response = self.client.post(
            '/api/repairs/',
            {'assigned_user': self.alice.id, 'date': '2017-04-28',
             'time': '08:00', 'complete': 'false'})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(models.Repair.objects.count(), 2)

    def test_create_repair(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.post(
            '/api/repairs/',
            {'assigned_user': self.alice.id, 'date': '2017-04-28',
             'time': '08:00', 'complete': 'false'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(models.Repair.objects.count(), 3)
        new_id = response.data['id']
        new_object = models.Repair.objects.get(pk=new_id)
        self.assertEqual(new_object.assigned_user.id, self.alice.id)
        self.assertEqual(new_object.date, datetime.date(2017, 4, 28))
        self.assertEqual(new_object.time, datetime.time(8, 00))
        self.assertEqual(new_object.complete, False)

    def test_mark_repair_complete(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)
        response = self.client.put('/api/repairs/{}/'.format(self.repair1.id),
                                   data={'assigned_user': self.alice.id,
                                         'date': datetime.date(2017, 4, 27),
                                         'time': datetime.time(13, 00),
                                         'complete': True},
                                   format='json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(models.Repair.objects.count(), 2)
        updated_object = models.Repair.objects.get(pk=self.repair1.id)
        self.assertEqual(updated_object.assigned_user.id, self.alice.id)
        self.assertEqual(updated_object.date, datetime.date(2017, 4, 27))
        self.assertEqual(updated_object.time, datetime.time(13, 00))
        self.assertEqual(updated_object.complete, True)

    def test_admin_user_can_update_repair(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.put('/api/repairs/{}/'.format(self.repair1.id),
                                   data={'assigned_user': self.alice.id,
                                         'date': datetime.date(2017, 4, 28),
                                         'time': datetime.time(13, 00),
                                         'complete': 'true'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(models.Repair.objects.count(), 2)
        updated_object = models.Repair.objects.get(pk=self.repair1.id)
        self.assertEqual(updated_object.assigned_user.id, self.alice.id)
        self.assertEqual(updated_object.date, datetime.date(2017, 4, 28))
        self.assertEqual(updated_object.time, datetime.time(13, 00))
        self.assertEqual(updated_object.complete, True)

    def test_normal_user_cannot_update_repair(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)
        response = self.client.put('/api/repairs/{}/'.format(self.repair1.id),
                                   data={'assigned_user': self.alice.id,
                                         'date': datetime.date(2017, 4, 28),
                                         'time': datetime.time(13, 00),
                                         'complete': 'true'})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(models.Repair.objects.count(), 2)
        updated_object = models.Repair.objects.get(pk=self.repair1.id)
        self.assertEqual(updated_object.assigned_user.id, self.alice.id)
        self.assertEqual(updated_object.date, datetime.date(2017, 4, 27))
        self.assertEqual(updated_object.time, datetime.time(13, 00))
        self.assertEqual(updated_object.complete, False)

    def test_delete_repair(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.delete(
            '/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(models.Repair.objects.count(), 1)
        self.assertEqual(models.Repair.objects.all()[0].id, self.repair2.id)

    def test_normal_user_cannot_delete_repair(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)
        response = self.client.delete(
            '/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 403)
        self.assertEqual(models.Repair.objects.count(), 2)

    def test_permissions_anonymous(self):
        """Anonymous user shouldn't be able to see anything"""
        # List repairs
        response = self.client.get('/api/repairs/')
        self.assertEqual(response.status_code, 401)

        # Create repair
        response = self.client.post(
            '/api/repairs/',
            {'assigned_user': self.alice.id, 'date': '2017-04-28',
             'time': '08:00', 'complete': 'false'})
        self.assertEqual(response.status_code, 401)

        # Read repair
        response = self.client.get('/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 401)

        # Update repair
        response = self.client.put('/api/repairs/{}/'.format(self.repair1.id),
                                   data={'user': self.alice.id,
                                         'date': datetime.date(2017, 4, 27),
                                         'time': datetime.time(13, 00),
                                         'complete': 'false'})
        self.assertEqual(response.status_code, 401)

        # Delete repair
        response = self.client.delete(
            '/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 401)

    def test_permissions_other_regular_user(self):
        """Bob (regular user) shouldn't be able to see or edit Alice's repairs
        """
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='bob').key)

        # List Alice's repairs
        response = self.client.get(
            '/api/users/{}/repairs/'.format(self.alice.id))
        self.assertEqual(response.status_code, 403)

        # Create repair
        response = self.client.post(
            '/api/repairs/',
            {'assigned_user': self.alice.id, 'date': '2017-04-28',
             'time': '08:00', 'complete': 'false'})
        self.assertEqual(response.status_code, 403)

        # Read repair
        response = self.client.get('/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 403)

        # Mark repair complete
        response = self.client.put('/api/repairs/{}/'.format(self.repair1.id),
                                   data={'user': self.alice.id,
                                         'date': datetime.date(2017, 4, 27),
                                         'time': datetime.time(13, 00),
                                         'complete': 'true'})
        self.assertEqual(response.status_code, 403)

        # Delete repair
        response = self.client.delete(
            '/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 403)

    def test_permissions_admin(self):
        """David (admin) should be able to see and edit Alice's repairs
        """
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)

        # List Alice's repairs
        response = self.client.get(
            '/api/users/{}/repairs/'.format(self.alice.id))
        self.assertEqual(response.status_code, 200)

        # Create repair
        response = self.client.post(
            '/api/repairs/',
            {'assigned_user': self.alice.id, 'date': '2017-04-28',
             'time': '08:00', 'complete': 'false'})
        self.assertEqual(response.status_code, 201)

        # Read repair
        response = self.client.get('/api/repairs/{}/'.format(self.repair1.id))
        expected = (
            '{{"id":{},"assigned_user":{},"date":"2017-04-27",'
            '"time":"13:00:00","complete":false}}'
        ).format(self.repair1.id, self.alice.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

        # Update repair
        response = self.client.put('/api/repairs/{}/'.format(self.repair1.id),
                                   data={'user': self.alice.id,
                                         'date': datetime.date(2017, 4, 28),
                                         'time': datetime.time(23, 00),
                                         'complete': 'false'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(models.Repair.objects.count(), 3
                         )  # We created one above in addition to the two
        updated_object = models.Repair.objects.get(pk=self.repair1.id)
        self.assertEqual(updated_object.date, datetime.date(2017, 4, 28))
        self.assertEqual(updated_object.time, datetime.time(23, 00))
        self.assertEqual(updated_object.complete, False)

        # Delete repair
        response = self.client.delete(
            '/api/repairs/{}/'.format(self.repair1.id))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(models.Repair.objects.count(), 2
                         )  # We created one above in addition to the two


class UserTestCase(APITestCase):

    def setUp(self):
        self.alice = User.objects.create(
            username='alice', password=make_password('topsecret'))
        Token.objects.create(user=self.alice)
        self.charlie = User.objects.create(
            username='charlie', password=make_password('topsecret'))
        Token.objects.create(user=self.charlie)
        self.david = User.objects.create(
            username='david', password=make_password('topsecret'),
            is_staff=True)
        Token.objects.create(user=self.david)
        self.repair1 = models.Repair.objects.create(
            assigned_user=self.alice, date=datetime.date(2017, 4, 27),
            time=datetime.time(13, 00), complete=False)
        self.repair2 = models.Repair.objects.create(
            assigned_user=self.alice, date=datetime.date(2017, 4, 27),
            time=datetime.time(19, 00), complete=False)

    def test_user_list(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.get('/api/users/')
        expected = ('[{{"id":{},"username":"alice","is_staff":false}},'
                    '{{"id":{},"username":"charlie","is_staff":false}},'
                    '{{"id":{},"username":"david","is_staff":true}}]'
                    ).format(self.alice.id, self.charlie.id, self.david.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

    def test_user_detail(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.get('/api/users/{}/'.format(self.alice.id))
        expected = ('{{"id":{},"username":"alice","is_staff":false}}'
                    ).format(self.alice.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

    def test_create_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.post(
            '/api/users/',
            {'username': 'bob', 'is_staff': 'false'})
        self.assertEqual(response.status_code, 201)
        self.assertEqual(models.User.objects.count(), 4)
        new_id = response.data['id']
        new_object = models.User.objects.get(pk=new_id)
        self.assertEqual(new_object.username, 'bob')
        self.assertEqual(new_object.is_staff, False)

    def test_update_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.put('/api/users/{}/'.format(self.alice.id),
                                   data={'username': 'aliki',
                                         'is_staff': False})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(models.User.objects.count(), 3)
        updated_object = models.User.objects.get(pk=self.alice.id)
        self.assertEqual(updated_object.username, 'aliki')
        self.assertEqual(updated_object.is_staff, False)

    def test_delete_user(self):
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)
        response = self.client.delete('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 204)
        self.assertEqual(models.User.objects.count(), 2)
        self.assertEqual(set([x.id for x in User.objects.all()]),
                         set([self.charlie.id, self.david.id]))

    def test_permissions_anonymous(self):
        """Anonymous user shouldn't be able to CRUD any user"""
        # List users
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, 401)

        # Create user
        response = self.client.post(
            '/api/users/',
            {'username': 'bob', 'is_staff': False})
        self.assertEqual(response.status_code, 401)

        # Read user
        response = self.client.get('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 401)

        # Update user
        response = self.client.put('/api/users/{}/'.format(self.alice.id),
                                   data={'username': 'aliki',
                                         'is_staff': False,
                                         'is_user_manager': False})
        self.assertEqual(response.status_code, 401)

        # Delete user
        response = self.client.delete('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 401)

    def test_permissions_other_regular_user(self):
        """
        Alice (regular user) shouldn't be able access users beside herself
        """
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='alice').key)

        # List users
        response = self.client.get('/api/users/')
        expected = ('[{{"id":{},"username":"alice","is_staff":true}}]'
                    ).format(self.alice.id)
        self.assertEqual(response.status_code, 403)

        # Create user
        response = self.client.post(
            '/api/users/',
            {'username': 'bob', 'is_staff': False})
        self.assertEqual(response.status_code, 403)

        # Read user
        response = self.client.get('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/users/{}/'.format(self.charlie.id))
        self.assertEqual(response.status_code, 403)

        # Update user
        response = self.client.put('/api/users/{}/'.format(self.alice.id),
                                   data={'username': 'aliki',
                                         'is_staff': False})
        self.assertEqual(response.status_code, 403)
        response = self.client.put('/api/users/{}/'.format(self.charlie.id),
                                   data={'username': 'charlie',
                                         'is_staff': False})
        self.assertEqual(response.status_code, 403)

        # Delete user
        response = self.client.delete('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 403)
        response = self.client.delete('/api/users/{}/'.format(self.charlie.id))
        self.assertEqual(response.status_code, 403)

    def test_permissions_admin(self):
        """
        David (admin) should be able to CRUD all users
        """
        self.client.credentials(HTTP_AUTHORIZATION='Token ' +
                                Token.objects.get(user__username='david').key)

        # List users
        response = self.client.get('/api/users/')
        expected = ('[{{"id":{},"username":"alice","is_staff":false}},'
                    '{{"id":{},"username":"charlie","is_staff":false}},'
                    '{{"id":{},"username":"david","is_staff":true}}]'
                    ).format(self.alice.id, self.charlie.id, self.david.id)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.content, bytes(expected, 'utf-8'))

        # Create user
        response = self.client.post(
            '/api/users/',
            {'username': 'bob', 'is_staff': False})
        self.assertEqual(response.status_code, 201)

        # Read user
        response = self.client.get('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 200)
        response = self.client.get('/api/users/{}/'.format(self.charlie.id))
        self.assertEqual(response.status_code, 200)

        # Update user
        response = self.client.put('/api/users/{}/'.format(self.alice.id),
                                   data={'username': 'aliki',
                                         'is_staff': False})
        self.assertEqual(response.status_code, 200)
        response = self.client.put('/api/users/{}/'.format(self.charlie.id),
                                   data={'username': 'charlie',
                                         'is_staff': False})
        self.assertEqual(response.status_code, 200)

        # Delete user
        response = self.client.delete('/api/users/{}/'.format(self.alice.id))
        self.assertEqual(response.status_code, 204)
        response = self.client.delete('/api/users/{}/'.format(self.charlie.id))
        self.assertEqual(response.status_code, 204)
        response = self.client.delete('/api/users/{}/'.format(self.david.id))
        self.assertEqual(response.status_code, 204)
