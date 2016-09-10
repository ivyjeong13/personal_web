import requests
from json import dumps
from django.http import HttpResponse, JsonResponse
from django.conf import settings
import oauth2 as oauth

def search_twitter_tweets(request):
	search_url = 'https://api.twitter.com/1.1/search/tweets.json?result_type=popular&q=' + request.GET.get('q')

	consumer = oauth.Consumer(settings.TWITTER_API_KEY, settings.TWITTER_SECRET_KEY)
	client = oauth.Client(consumer)

	resp, content = client.request(search_url, "GET")
	return HttpResponse(
		content, 
		status=200, 
		content_type='application/json'
	)