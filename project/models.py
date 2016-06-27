from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
	user = models.ForeignKey(User,blank=True, null=True)
	real_name = models.CharField(max_length=255, default='')
	steam_name = models.CharField(max_length=255, default='')
	picture = models.CharField(max_length=255, default='')
	location = models.CharField(max_length=255, default='')
