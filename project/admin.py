from django.contrib import admin
from project.models import Player

class PlayerAdmin(admin.ModelAdmin):
    fields = ('user', 'real_name', 'picture', 'steam_name')

admin.site.register(Player, PlayerAdmin)