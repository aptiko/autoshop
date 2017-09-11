from django.conf.urls import include, url

import autoshop.urls

urlpatterns = [
    url(r'^', include(autoshop.urls)),
]
