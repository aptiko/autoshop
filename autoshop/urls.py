from django.conf.urls import include, url

from rest_framework.urlpatterns import format_suffix_patterns

from . import views


urlpatterns = [
    url(r'^repairs/$', views.AdminRepairList.as_view()),
    url(r'^repairs/(?P<pk>[0-9]+)/$', views.RepairDetail.as_view()),
    url(r'^users/$', views.UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/repairs/$', views.UserRepairList.as_view()),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^$', views.Dummy.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
