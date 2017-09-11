import datetime

from django.contrib.auth.models import User
from django.db import models


class Repair(models.Model):
    assigned_user = models.ForeignKey(User, blank=True, null=True)
    date = models.DateField(default=datetime.date.today, blank=True, null=True)
    time = models.TimeField(blank=True, null=True)
    complete = models.BooleanField()

    class Meta:
        ordering = ('date', 'time')
        unique_together = ('date', 'time')

    def __str__(self):
        return 'Repair {} at {} {}'.format(self.id, self.date.isoformat(),
                                           self.time)


class RepairComment(models.Model):
    repair = models.ForeignKey(Repair)
    user = models.ForeignKey(User)
    date = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()

    class Meta:
        ordering = ('repair', 'date')
        unique_together = ('repair', 'user', 'date')

    def __str__(self):
        return 'Comment for repair {} by {} at {}: {}'.format(
            self.repair.id, self.user, self.date.isoformat(), self.comment)
