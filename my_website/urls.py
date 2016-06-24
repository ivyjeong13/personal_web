from django.conf.urls import include, url
from django.contrib import admin
from home.views import HomeView

urlpatterns = [
    # Examples:
    url(r'^$', HomeView.as_view()),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
]
