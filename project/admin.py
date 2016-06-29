from django.contrib import admin
from project.models import Player, Hero, Item

class PlayerAdmin(admin.ModelAdmin):
    fields = ('user', 'st_time_created', 'real_name', 'picture', 'steam_name', 'mmr',\
    	'location', 'pref_position', 'other_positions', 'pref_region', \
    	'carries', 'supports', 'offlaners', 'mids', 'top_played')

class HeroAdmin(admin.ModelAdmin):
    fields = ('hero_id', 'name', 'localized_name')
    list_display = ('hero_id', 'localized_name')

class ItemAdmin(admin.ModelAdmin):
    fields = ('item_id', 'name', 'localized_name')
    list_display = ('item_id', 'localized_name')

admin.site.register(Player, PlayerAdmin)
admin.site.register(Hero, HeroAdmin)
admin.site.register(Item, ItemAdmin)