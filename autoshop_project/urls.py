import os

from django.conf.urls import include, url
from django.http import HttpResponse
from django.views import View

import autoshop.urls


class MainView(View):
    """This view is a hack intended to work in development only. It serves
    index.html and webpack-generated assets/ as the root. In production the
    web server should do that directly and only pass api/ to Django.
    """

    def get(self, request, *args, **kwargs):
        filename = self.request.path[1:]
        if not filename.startswith('assets'):
            filename = 'index.html'
        with open(os.path.join('frontend', 'dist', filename)) as f:
            return HttpResponse(f.read())


urlpatterns = [
    url(r'^api/', include(autoshop.urls)),
    url(r'^login', MainView.as_view(), name='account_login'),
    url(r'^register', MainView.as_view(), name='account_signup'),
    url(r'^', MainView.as_view(), name='main-view'),
]
