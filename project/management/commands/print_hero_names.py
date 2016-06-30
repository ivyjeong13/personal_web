from django.core.management.base import BaseCommand
import dota2api
from django.conf import settings
from project.models import Hero

class Command(BaseCommand):
	help = "Get Dota2 Heroes into database."

	def handle(self, *args, **options):
		api = dota2api.Initialise(settings.STEAM_API_KEY)
		heroes = api.get_heroes()
		print('{')
		for h in heroes['heroes']:
			print('\''+h['name']+'\': []')
		print('}')

