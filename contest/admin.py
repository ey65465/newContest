from django.contrib import admin
from .models import *

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "pw", "create_date")
admin.site.register(User, UserAdmin)

class QuestionAdmin(admin.ModelAdmin):
    list_display = ("id", "about","content","answer","authority","user","finish_times","currect_times","create_date","pic_url","type")
admin.site.register(Question, QuestionAdmin)