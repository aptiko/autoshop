import datetime

from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.db import models


def validate_time_ends_in_zero(value):
    if value.minute or value.second:
        raise ValidationError('Repair time must have zero minutes and seconds')


class Repair(models.Model):
    assigned_user = models.ForeignKey(User, blank=True, null=True)
    date = models.DateField(default=datetime.date.today, blank=True, null=True)
    time = models.TimeField(blank=True, null=True,
                            validators=[validate_time_ends_in_zero])
    complete = models.BooleanField()

    class Meta:
        ordering = ('date', 'time')
        unique_together = ('date', 'time')

    def __str__(self):
        return 'Repair {} at {} {}'.format(self.id, self.date.isoformat(),
                                           self.time)

    def save(self, *args, **kwargs):
        validate_time_ends_in_zero(self.time)
        super().save(*args, **kwargs)


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
