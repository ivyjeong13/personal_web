from django.shortcuts import render
from django.views.generic import TemplateView

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