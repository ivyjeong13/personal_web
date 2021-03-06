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
from pytrends.request import TrendReq
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

class PokedexView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(PokedexView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'pokedex/main.html', context)

	def get_context_data(self, **kwargs):
		context = super(PokedexView, self).get_context_data(**kwargs)
		return context

class MovieView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(MovieView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'movie/main.html', context)

	def get_context_data(self, **kwargs):
		context = super(MovieView, self).get_context_data(**kwargs)
		return context

class TopTrendsView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(TopTrendsView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()

		COUNTRIES = {
			"40": {
				"name": "South Africa",
				"postal": "ZA"
			},
			"15": {
				"name": "Germany",
				"postal": "DE"
			},
			"36": {
				"name": "Saudi Arabia",
				"postal": "SA"
			},
			"30": {
				"name": "Argentina",
				"postal": "AR"
			},
			"8": {
				"name": "Australia",
				"postal": "AU"
			},
			"44": {
				"name": "Austria",
				"postal": "AT"
			},
			"41": {
				"name": "Belgium",
				"postal": "BE"
			},
			"18": {
				"name": "Brazil",
				"postal": "BR"
			},
			"13": {
				"name": "Canada",
				"postal": "CA"
			},
			"38": {
				"name": "Chile",
				"postal": "CL"
			},
			"32": {
				"name": "Colombia",
				"postal": "CO"
			},
			"23": {
				"name": "South Korea",
				"postal": "KR"
			},
			"49": {
				"name": "Denmark",
				"postal": "DK"
			},
			"29": {
				"name": "Egypt",
				"postal": "EG"
			},
			"26": {
				"name": "Spain",
				"postal": "ES"
			},
			"1": {
				"name": "United States",
				"postal": "US"
			},
			"50": {
				"name": "Finland",
				"postal": "FI"
			},
			"16": {
				"name": "France",
				"postal": "FR"
			},
			"48": {
				"name": "Greece",
				"postal": "GR"
			},
			"10": {
				"name": "Hong Kong",
				"postal": "HK"
			},
			"45": {
				"name": "Hungary",
				"postal": "HU"
			},
			"3": {
				"name": "India",
				"postal": "IN"
			},
			"19": {
				"name": "Indonesia",
				"postal": "ID"
			},
			"6": {
				"name": "Israel",
				"postal": "IL"
			},
			"27": {
				"name": "Italy",
				"postal": "IT"
			},
			"4": {
				"name": "Japan",
				"postal": "JP"
			},
			"37": {
				"name": "Kenya",
				"postal": "KE"
			},
			"34": {
				"name": "Malaysia",
				"postal": "MY"
			},
			"21": {
				"name": "Mexico",
				"postal": "MX"
			},
			"52": {
				"name": "Nigeria",
				"postal": "NG"
			},
			"51": {
				"name": "Norway",
				"postal": "NO"
			},
			"17": {
				"name": "Netherlands",
				"postal": "NL"
			},
			"25": {
				"name": "Philippines",
				"postal": "PH"
			},
			"31": {
				"name": "Poland",
				"postal": "PL"
			},
			"47": {
				"name": "Portugal",
				"postal": "PT"
			},
			"43": {
				"name": "Czech Republic",
				"postal": "CZ"
			},
			"39": {
				"name": "Romania",
				"postal": "RO"
			},
			"9": {
				"name": "United Kingdon",
				"postal": "GB"
			},
			"14": {
				"name": "Russia",
				"postal": "RU"
			},
			"5": {
				"name": "Singapore",
				"postal": "SG"
			},
			"42": {
				"name": "Sweden",
				"postal": "SE"
			},
			"46": {
				"name": "China",
				"postal": "CH"
			},
			"12": {
				"name": "Taiwan",
				"postal": "TW"
			},
			"33": {
				"name": "Thailand",
				"postal": "TH"
			},
			"24": {
				"name": "Turkey",
				"postal": "TR"
			},
			"35": {
				"name": "Ukraine",
				"postal": "UA"
			},
			"28": {
				"name": "Vietnam",
				"postal": "VN"
			},
		}

		pytrends = TrendReq(settings.GOOGLE_ACCT, settings.GOOGLE_PW)
		hottrendslist = pytrends.hottrends({'geo': 'World'})
		for postal, trend in hottrendslist.items():
			COUNTRIES[postal]['trending'] = trend

		context['countries'] = COUNTRIES

		return render(request, 'toptrends/main.html', context)

	def get_context_data(self, **kwargs):
		context = super(TopTrendsView, self).get_context_data(**kwargs)
		return context

class RandomMangaView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		return super(RandomMangaView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'randommanga/main.html', context)

	def get_context_data(self, **kwargs):
		context = super(RandomMangaView, self).get_context_data(**kwargs)
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
		username = request.COOKIES.get('ds_usr')

		REGIONS = ['Australia', 'Chile', 'China', 'Europe East', \
		'Europe West', 'India', 'Japan', 'Peru', 'Russia', \
		'South Africa', 'South America', 'South Korea', 'Southeast Asia', \
		'US East', 'US West']
		self.regions = REGIONS 

		POSITIONS = ['Carry', 'Mid', 'Offlaner', 'Support']
		self.positions = POSITIONS

		if username:
			try:
				user = User.objects.get(username=username)
				profile = Player.objects.get(user=user)
			except:
				return HttpResponseRedirect('/dotaseeker/login?e=true')

			self.profile = profile
		else:
			return HttpResponseRedirect('/dotaseeker/login?e=true')
		return super(DSEditView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/edit.html', context)

	def post(self, request, *args, **kwargs):
		# changes made to profile, make them and save
		# before grabbing context data
		profile = self.profile
		profile.real_name = request.POST.get('name')
		if request.GET.get("mmr", None):
			profile.mmr = request.POST.get('mmr')
		profile.pref_region = request.POST.get('pref_region')
		profile.pref_position = request.POST.get('pref_pos')
		profile.other_positions = ",".join(request.POST.getlist('other_pos'))
		profile.pref_heroes = request.POST.get('sel_heroes')

		profile.carries = request.POST.getlist('carries')
		profile.supports = request.POST.getlist('supports')
		profile.offlaners = request.POST.getlist('offlaners')
		profile.mids = request.POST.getlist('mids')

		profile.selected_carry = request.POST.get('c')
		profile.selected_support = request.POST.get('s')
		profile.selected_support2 = request.POST.get('s2')
		profile.selected_offlaner = request.POST.get('o')
		profile.selected_mid = request.POST.get('m')
		profile.save()

		self.profile = profile

		context = self.get_context_data()
		return render(request, 'dotaseeker/edit.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSEditView, self).get_context_data(**kwargs)
		context['heroes'] = self.heroes

		context['real_name'] = self.profile.real_name
		if self.profile.mmr:
			context['mmr'] = self.profile.mmr
		context['pref_region'] = self.profile.pref_region
		context['pref_position'] = self.profile.pref_position
		if self.profile.other_positions:
			context['other_positions'] = self.profile.other_positions.split(',')
		if self.profile.pref_heroes:
			context['pref_heroes']=self.profile.pref_heroes

		context['carries'] = self.profile.carries
		context['supports'] = self.profile.supports
		context['offlaners'] = self.profile.offlaners
		context['mids'] = self.profile.mids

		context['selected_carry'] = self.profile.selected_carry
		context['selected_support'] = self.profile.selected_support
		context['selected_support2'] = self.profile.selected_support2
		context['selected_offlaner'] = self.profile.selected_offlaner
		context['selected_mid'] = self.profile.selected_mid
		context['regions'] = self.regions
		context['positions'] = self.positions
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
		elif request.GET.get('e'):
			self.error = 'Sorry, there was a problem grabbing your user information. Please login again.'
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
				self.st_id = None
				self.top_played = None
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
			if profile.pref_heroes:
				self.pref_heroes = profile.pref_heroes.split(",")
				if len(self.pref_heroes) != 5:
					self.pref_left = 5 - len(self.pref_heroes)
				else:
					self.pref_left = 0
			else:
				self.pref_heroes = None
				self.pref_left = 0
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

			if profile.top_played:
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
		context['pref_heroes'] = self.pref_heroes
		context['pref_left'] = self.pref_left
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

