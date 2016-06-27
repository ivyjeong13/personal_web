from django.conf.urls import include, url
from django.contrib import admin
from home.views import HomeView, CodeView, HobbyView
from project.views import ProjectView, DotaseekerView, DSLoginView, DSRegisterView, DSSigninView

urlpatterns = [
    # Examples:
    url(r'^$', HomeView.as_view()),
    url(r'^code/', CodeView.as_view()),
    url(r'^hobbies/', HobbyView.as_view()),
    url(r'^projects/', ProjectView.as_view()),
    url(r'^dotaseeker/signin', DSSigninView.as_view()),
    url(r'^dotaseeker/register', DSRegisterView.as_view()),
    url(r'^dotaseeker/login', DSLoginView.as_view()),
    url(r'^dotaseeker/', DotaseekerView.as_view()),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
]
