from django.core.management.base import BaseCommand
import dota2api
from django.conf import settings
from project.models import Player, Hero
from social.apps.django_app.default.models import UserSocialAuth
from django.contrib.auth.models import User
import time

class Command(BaseCommand):
	help = "Get Dota2 Heroes into database."

	def handle(self, *args, **options):
		api = dota2api.Initialise(settings.STEAM_API_KEY)
		for u in UserSocialAuth.objects.all():
			print('Collecting top played for u:' + str(int(u.uid)) + '...')
			most_recent = api.get_match_history(account_id=int(u.uid), matches_requested=1)['matches'][0]
			time.sleep(1)
			new = most_recent['start_time']
			last_time = u.extra_data['info']['timecreated']
			if u.extra_data['info'].get('last_match_time'):
				last_time = u.extra_data['info']['last_match_time']
				
			if new != last_time:
				heroes = {}
				data = u.extra_data
				if 'heroes' not in data:
					data['heroes'] = {}
				# add match ids into extra-data
				for h in Hero.objects.all():
					time.sleep(1)
					print(h.localized_name)
					if h.name not in data['heroes']:
						data['heroes'][h.name] = {'total':0}

					req = api.get_match_history(account_id=int(u.uid), matches_requested=500, date_max=last_time, hero_id=h.hero_id)
					print(req['total_results'])
					if req['total_results'] > 0:
						data['heroes'][h.name]['total'] = data['heroes'][h.name]['total'] = req['total_results']
						heroes[h.hero_id] = data['heroes'][h.name]['total']

				data['info']['last_match_time'] = new
				u.extra_data = data
				u.save()

				heroes = sorted(heroes.items(), key=lambda x:x[1], reverse=True)[:5]
				print(heroes)

				str_h = []
				for h in heroes:
					str_h.append(str(h[0]))

				player = Player.objects.get(user=User.objects.get(id=u.user_id))
				player.top_played = ",".join(str_h)
				player.save()
			else:
				print(str(int(u.uid)) + '\' data is up-to-date.')
		print('Top Played Heroes updated for every user with a steam id linked.')

