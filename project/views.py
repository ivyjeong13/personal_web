from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.generic import View
from project.models import Player
from django.http import HttpResponseRedirect
from django.core.context_processors import csrf

# Create your views here.
class ProjectView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		self.introduction = 'Hello There!'
		return super(ProjectView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'project.html', context)

	def get_context_data(self, **kwargs):
		context = super(ProjectView, self).get_context_data(**kwargs)
		context['introduction'] = 'Hello There!'
		return context

class DotaseekerView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		self.introduction = 'Hello There!'
		return super(DotaseekerView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/home.html', context)

	def get_context_data(self, **kwargs):
		context = super(DotaseekerView, self).get_context_data(**kwargs)
		context['introduction'] = 'Hello There!'
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
		self.introduction = 'Hello There!'
		return super(DSDashboardView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'dotaseeker/dashboard.html', context)

	def get_context_data(self, **kwargs):
		context = super(DSDashboardView, self).get_context_data(**kwargs)
		context['introduction'] = 'Hello There!'
		return context

class DSSigninView(View):
	def post(self, request, *args, **kwargs):
		username = request.POST.get('username')
		password = request.POST.get('password')

		try:
			player = Player.objects.get(username=username)
			if player.password == password:
				return HttpResponseRedirect('/dotaseeker/dashboard')
			return HttpResponseRedirect('/dotaseeker/login?p=false')
		except:
			return HttpResponseRedirect('/dotaseeker/login?u=false')

class DSRegisterView(View):
	def post(self, request, *args, **kwargs):
		username = request.POST.get('username')
		password = request.POST.get('password')

		try:
			player = Player.objects.get(username=username)
			return HttpResponseRedirect('/dotaseeker/login?u=true')
		except: 
			#doesn't exist
			Player.objects.create(username=username, password=password).save()
			return HttpResponseRedirect('/dotaseeker/dashboard')

