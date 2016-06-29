from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
	user = models.ForeignKey(User,blank=True, null=True)
	real_name = models.CharField(max_length=255, default='', blank=True, null=True)
	steam_name = models.CharField(max_length=255, default='', blank=True, null=True)
	picture = models.CharField(max_length=255, default='', blank=True, null=True)
	location = models.CharField(max_length=255, default='', blank=True, null=True)
	pref_position = models.CharField(max_length=255, default='', blank=True, null=True)
	other_positions = models.CharField(max_length=255, default='', blank=True, null=True)
	pref_region = models.CharField(max_length=255, default='', blank=True, null=True)
	st_time_created = models.IntegerField(blank=True, null=True)

	carries = models.ManyToManyField("self", blank=True)
	supports = models.ManyToManyField("self", blank=True)
	offlaners = models.ManyToManyField("self", blank=True)
	mids = models.ManyToManyField("self", blank=True)
	mmr = models.IntegerField(null=True,blank=True)

	selected_carry = models.IntegerField(null=True, blank=True)
	selected_support = models.IntegerField(null=True, blank=True)
	selected_support2 = models.IntegerField(null=True, blank=True)
	selected_offlaner = models.IntegerField(null=True, blank=True)
	selected_mid = models.IntegerField(null=True, blank=True)

	top_played = models.CharField(max_length=255,null=True, blank=True)

	def __str__(self):
		if self.real_name:
			return self.real_name
		if self.steam_name:
			return self.steam_name
		if self.user:
			return self.user.username

class Hero(models.Model):
	hero_id = models.IntegerField(blank=True, null=True)
	name = models.CharField(max_length=255, blank=True, null=True)
	localized_name = models.CharField(max_length=255, blank=True, null=True)

class Item(models.Model):
	item_id = models.IntegerField(blank=True, null=True)
	name = models.CharField(max_length=255, blank=True, null=True)
	localized_name = models.CharField(max_length=255, blank=True, null=True)
