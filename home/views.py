from django.shortcuts import render
from django.views.generic import TemplateView

# Create your views here.
class HomeView(TemplateView):
	def dispatch(self, request, *args, **kwargs):
		self.introduction = 'Hello There!'
		return super(HomeView, self).dispatch(request, *args, **kwargs)

	def get(self, request, *args, **kwargs):
		context = self.get_context_data()
		return render(request, 'home.html', context)

	def get_context_data(self, **kwargs):
		context = super(HomeView, self).get_context_data(**kwargs)
		context['introduction'] = 'Hello There!'
		return context