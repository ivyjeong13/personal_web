from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic import View
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf
from social.apps.django_app.default.models import UserSocialAuth
import dota2api
from conf.settings import STEAM_API_KEY

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
				try:
					steam_info = UserSocialAuth.objects.get(user=user, provider='steam')
					print(steam_info.uid)
					api = dota2api.Initialise(STEAM_API_KEY)
					data = api.get_player_summaries(steamids=[steam_info.uid])
					print(data)
				except:
					steam_info = None
				self.steam_info = steam_info
			except:
				response = HttpResponseRedirect('/dotaseeker/login?e=true')
				return response

		return super(DSDashboardView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/dashboard.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSDashboardView, self).get_context_data(**kwargs)
		return context

class DSSigninView(View):
	def post(self, request, *args, **kwargs):
		username = request.POST.get('username')
		password = request.POST.get('password')

		user = authenticate(username=username, password=password)
		if user is not None:
			if user.is_active:
				response = HttpResponseRedirect('/dotaseeker/dashboard')
				response.set_cookie('ds_usr', value=player.username)
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
			player = User.objects.create_user(username, None, password)
			player.save()
			response = HttpResponseRedirect('/dotaseeker/dashboard')
			response.set_cookie('ds_usr', value=player.username)
			return HttpResponseRedirect('/dotaseeker/dashboard')

