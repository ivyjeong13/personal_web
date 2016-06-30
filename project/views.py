from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic import View
from django.contrib.auth.models import User
from project.models import Player, Hero
from django.contrib.auth import authenticate, login
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from social.apps.django_app.default.models import UserSocialAuth
import dota2api
from django.conf import settings

# Create your views here.
class ProjectView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(ProjectView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'project.html', context)

	def get_context_data(self, **kwargs):
		context = super(ProjectView, self).get_context_data(**kwargs)
		return context

class DotaseekerView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(DotaseekerView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/home.html', context)

	def get_context_data(self, **kwargs):
		context = super(DotaseekerView, self).get_context_data(**kwargs)
		return context

class DSEditView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		self.heroes = Hero.objects.all()
		return super(DSEditView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/edit.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSEditView, self).get_context_data(**kwargs)
		context['heroes'] = self.heroes
		return context

class DSSettingsView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(DSSettingsView, self).dispatch(request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		context = self.get_context_data()
		return HttpResponseRedirect('/dotaseeker/dashboard/edit')

	def get_context_data(self, **kwargs):
		context = super(DSSettingsView, self).get_context_data(**kwargs)
		return context

class DSSearchView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		self.heroes = Hero.objects.all()
		return super(DSSearchView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/search.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSSearchView, self).get_context_data(**kwargs)
		context['heroes'] = self.heroes
		return context

class DSLoginView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		if request.GET.get('u'):
			self.error = 'Sorry, this user isn\'t in our database. Please try again.'
		elif request.GET.get('p'):
			self.error = 'Sorry, your password was incorrect. Please try again.'
		else:
			self.error = None

		return super(DSLoginView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/login.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSLoginView, self).get_context_data(**kwargs)
		context['error'] = self.error
		return context

class DSDashboardView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		username = request.COOKIES.get('ds_usr')
		if username:
			try:
				user = User.objects.get(username=username)
				profile = Player.objects.get(user=user)
				self.linked_steam = False
				self.matches = None
			except:
				response = HttpResponseRedirect('/dotaseeker/login?e=true')
				return response

			try:
				steam_info = UserSocialAuth.objects.get(user=user, provider='steam')
			except:
				steam_info = None

			if steam_info:
				api = dota2api.Initialise(settings.STEAM_API_KEY)

				if steam_info.extra_data.get('info'):
					self.linked_steam = True
				else:
					data = api.get_player_summaries(steamids=[int(steam_info.uid)])['players'][0]
					steam_info.extra_data = {'info': data}
					steam_info.save()

					#also link with Player Profile
					if data.get('realname'):
						profile.real_name = data['realname']
					if data.get('personaname'):
						profile.steam_name = data['personaname']
					if data.get('avatarfull'):
						profile.picture = data['avatarfull']
					if data.get('loccountrycode'):
						profile.location = data['loccountrycode']
					if data.get('timecreated'):
						profile.st_time_created = data['timecreated']

					profile.save()
					self.linked_steam = True

				#always grab most recent 10 matches if a steam id is linked
				self.st_id = int(steam_info.uid)
				contGetHistory = True
				if steam_info.extra_data['info'].get('last_match_time') and steam_info.extra_data.get('last_10'):
					last_match_time = steam_info.extra_data['info']['last_match_time']
					last_10 = steam_info.extra_data['last_10']
					if last_match_time == last_10[0]['start_time']:
						self.matches = last_10
						contGetHistory = False
						
				if contGetHistory:
					try:
						matches = api.get_match_history(matches_requested=10, account_id=int(steam_info.uid))['matches']
						self.matches = []
						for m in matches:
							m_data = api.get_match_details(match_id=m['match_id'])
							for p in m_data['players']:
								p_slot = '{0:08b}'.format(p['player_slot'])
								if p_slot[0] == '1':
									p['player_side'] = 'dire'
								else:
									p['player_side'] = 'radiant'
							self.matches.append(m_data)
							steam_info.extra_data['last_10'] = self.matches
							steam_info.save()
					except:
						#add case to pull in old data if Steam API call fails
						if steam_info.extra_data.get('last_10'):
							self.matches=steam_info.extra_data['last_10']
						else:
							self.matches=None

			self.realname = profile.real_name
			self.personaname = profile.steam_name
			self.picture = profile.picture
			self.location = profile.location
			self.mmr = profile.mmr
			self.pref_position = profile.pref_position
			if profile.other_positions:
				self.other_positions = profile.other_positions.split(",")
			else:
				self.other_positions = None
			self.pref_region = profile.pref_region
			self.carries = profile.carries
			self.supports = profile.supports
			self.offlaners = profile.offlaners
			self.mids = profile.mids

			self.s_carry = profile.selected_carry
			self.s_mid = profile.selected_mid
			self.s_offlaner = profile.selected_offlaner
			self.s_support = profile.selected_support
			self.s_support2 = profile.selected_support2

			self.top_played = profile.top_played.split(",")
		else:
			response = HttpResponseRedirect('/dotaseeker/login?e=true')
			return response 

		return super(DSDashboardView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/dashboard.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSDashboardView, self).get_context_data(**kwargs)
		context['realname'] = self.realname
		context['personaname'] = self.personaname
		context['picture'] = self.picture
		context['location'] = self.location
		context['linked_steam'] = self.linked_steam
		context['matches'] = self.matches
		context['st_id'] = self.st_id
		context['mmr'] = self.mmr
		context['pref_region'] = self.pref_region
		context['pref_position'] = self.pref_position
		context['other_positions'] = self.other_positions
		context['carries'] = self.carries
		context['supports'] = self.supports
		context['offlaners'] = self.offlaners
		context['mids'] = self.mids

		context['s_carry'] = self.s_carry
		context['s_mid'] = self.s_mid
		context['s_offlaner'] = self.s_offlaner
		context['s_support'] = self.s_support
		context['s_support2'] = self.s_support2

		context['top_played'] = self.top_played

		return context

class DSSigninView(View):
	def post(self, request, *args, **kwargs):
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
				response = HttpResponseRedirect('/dotaseeker/dashboard')
				response.set_cookie('ds_usr', value=user.username)
				login(request,user)
				return response
			else:
				return HttpResponseRedirect('/dotaseeker/login?a=false')
		else:
			return HttpResponseRedirect('/dotaseeker/login?p=false')

class DSRegisterView(View):
	def post(self, request, *args, **kwargs):
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username=username, password=password)
		if user is not None:
			return HttpResponseRedirect('/dotaseeker/login?u=true')
		else: 
			#doesn't exist
			user = User.objects.create_user(username, None, password)
			user.save()

			profile = Player.objects.create(user=user)
			profile.save()

			response = HttpResponseRedirect('/dotaseeker/dashboard')
			response.set_cookie('ds_usr', value=user.username)
			n_usr = authenticate(username=username, password=password)
			login(request, n_usr)
			return response

