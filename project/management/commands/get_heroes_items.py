from django.core.management.base import BaseCommand
import dota2api
from django.conf import settings
from project.models import Hero, Item
import time

class Command(BaseCommand):
	help = "Get Dota2 Heroes into database."

	def handle(self, *args, **options):
		api = dota2api.Initialise(settings.STEAM_API_KEY)
		heroes = api.get_heroes()
		time.sleep(1)
		for h in heroes['heroes']:
			obj = Hero.objects.create(hero_id=h['id'], name=h['name'], localized_name=h['localized_name'])
			obj.save()
		items = api.get_game_items()
		for i in items['items']:
			obj = Item.objects.create(item_id=i['id'], name=i['name'], localized_name=i['localized_name'])
			obj.save()
		print('Saved all heroes and items into database.')

