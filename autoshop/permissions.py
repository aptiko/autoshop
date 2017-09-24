from datetime import datetime

import iso8601
from rest_framework import permissions

from . import models


class RepairPermission(permissions.BasePermission):
    """
    Custom permission to only allow the user assigned to a repair and the
    superuser to read it, the administrator to write it, and the user to mark
    it as complete.
    """

    def has_object_permission(self, request, view, obj):
        # Superusers are ok
        if request.user.is_staff:
            return True

        # Normal users aren't ok unless repair is assigned to them
        if obj.assigned_user != request.user:
            return False

        # Normal users who are just viewing are OK
        if request.method in permissions.SAFE_METHODS:
            return True

        # Normal users aren't permitted to add/delete repairs
        if request.method != 'PUT':
            return False

        # Only marking a pending repair as complete is allowed
        d = request.data
        dt = iso8601.parse_date(d['date'] + ' ' + d['time'],
                                default_timezone=None)
        return (obj.status == 0 and d['status'] == 1 and
                d['assigned_user'] == obj.assigned_user.id and
                dt == datetime.combine(obj.date, obj.time))


class RepairCommentPermission(permissions.BasePermission):
    """
    Custom permission to only allow the user assigned to a repair and the
    superuser to add a comment or view the comments.
    """

    def has_permission(self, request, view):
        # We don't need to check the request method here; these are checked
        # in the view (it's ListCreateAPIView, which only allows select and
        # insert)
        return (request.user.is_staff
                or request.user ==
                models.Repair.objects.get(pk=view.kwargs['pk']).assigned_user)


class UserPermission(permissions.BasePermission):
    """
    Custom permission to only allow viewing of a user by the admin or the user
    himself.
    """

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or (
            request.method in permissions.SAFE_METHODS
            and obj.id == request.user.id)
