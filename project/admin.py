from django.contrib import admin
from project.models import Player

class PlayerAdmin(admin.ModelAdmin):
    fields = ('username', 'password')

admin.site.register(Player, PlayerAdmin)