from django.test import TestCase
from strange.models import Location

def defaultLocation(name='@johnpaulett', user_agent='', position='', accuracy=10):
    return Location.objects.create(name=name, user_agent=user_agent,
                                   point=point, accuracy)

class LocationTest(TestCase):
    def test_basics(self):
        Location.objects.create(name='@johnpaulett',
                                user_agent='',
                                point='',
                                accuracy=10000)

        

    def test_unique_user(self):
        defaultLocation()
        self.failUnless(Location.Duplicate, defaultLocation)

    def test_twitterfy_twitter_name(self):
        defaultLocation()
        self.assertEqual('<a href="http://twitter.com/johnpaulett">@johnpaulett</a>',
                         location.twitterfy())
        
    def test_twitterfy_regular_name(self):
        defaultLocation()
        self.assertEqual('johnpaulett', location.twitterfy())
        
class RobotsTest(TestCase):
    def test_response(self):
        resp = self.client.get('/robots.txt')
        self.assertEqual(
