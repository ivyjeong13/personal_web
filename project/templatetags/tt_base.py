from datetime import datetime, timedelta
from django import template
from django.utils.timesince import timesince
from project.models import Hero, Item
import re

register = template.Library()

@register.filter
def age(timestamp):
	then = datetime.fromtimestamp(int(timestamp))
	now = datetime.now()
	try:
		difference = now - then
	except:
		return then

	if difference <= timedelta(minutes=1):
		return 'just now'
	return '%(time)s ago' % {'time': timesince(then).split(', ')[0]}

@register.filter
def find_match_result(p, rad_win):
	if p['player_side'] == 'radiant' and rad_win:
		return True
	return False

@register.filter
def player_details(match, p_id):
	for p in match['players']:
		acc_id = '{0:32b}'.format(p['account_id']).strip()
		st_id = '{0:64b}'.format(p_id)[-32:].strip()
		if p['account_id'] == int(st_id,2):
			return p
	return None

@register.filter
def get_hero_img(h_id, t):
	if type(h_id) == str:
		h_id = int(h_id)
	loc_name = Hero.objects.get(hero_id=h_id).name
	hero = re.sub('npc_dota_hero_', '', loc_name)
	if t == 'small':
		return '/static/images/dota2/heroes/59x33/'+hero+'_sb.png'
	if t == 'large':
		return '/static/images/dota2/heroes/256x144/'+hero+'_full.png'

@register.filter
def get_item_img(i_id):
	if i_id:
		loc_name = Item.objects.get(item_id=i_id).name
		item = re.sub('item_', '', loc_name)
		return '<img src="/static/images/dota2/items/'+item+'_lg.png">'
	else:
		return '<div class="x"><div class="icon_blocked"></div></div>'

@register.filter
def joinby(value, arg):
    return arg.join(value)