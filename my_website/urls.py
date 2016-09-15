from django.conf.urls import include, url
from django.contrib import admin
from home.views import HomeView, CodeView, HobbyView
from project.views import ProjectView, DotaseekerView, DSLoginView, \
DSRegisterView, DSSigninView, DSDashboardView, DSEditView, DSSearchView, \
RandomMangaView, TopTrendsView, PokedexView

urlpatterns = [
    # Examples:
    url(r'^$', HomeView.as_view()),
    url(r'^code/', CodeView.as_view()),
    url(r'^hobbies/', HobbyView.as_view()),
    url(r'^projects/', ProjectView.as_view()),
    url(r'^dotaseeker/dashboard/edit', DSEditView.as_view()),
    url(r'^dotaseeker/dashboard', DSDashboardView.as_view()),
    url(r'^dotaseeker/login', DSLoginView.as_view()),
    url(r'^dotaseeker/register', DSRegisterView.as_view()),
    url(r'^dotaseeker/search', DSSearchView.as_view()),
    url(r'^dotaseeker/signin', DSSigninView.as_view()),
    url(r'^dotaseeker/', DotaseekerView.as_view()),
    url(r'^randommanga/', RandomMangaView.as_view()),
    url(r'^toptrends/api/twitter', 'project.api.search_twitter_tweets'),
    url(r'^toptrends', TopTrendsView.as_view()),
    url(r'^pokedex', PokedexView.as_view()),
    # url(r'^blog/', include('blog.urls')),
    url(r'^ijeong/2016/admin/', include(admin.site.urls)),
    url('', include('social.apps.django_app.urls', namespace='social'))
]
