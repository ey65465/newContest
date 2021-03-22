"""newContest URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
import contest.views as views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("login/", views.login),
    path("", views.login),
    path("to_login/", views.tologin),
    path("home/", views.home),
    path("upload_img/", views.upload_img),
    path("add_question/", views.add_question),
    path("add_option/", views.add_option),
    path("question/", views.question),
    path("getQuestion/", views.getQuestion),
]
