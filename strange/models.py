#from django.db import models
from django.contrib.gis.db import models

class LocationManager(models.GeoManager):
    def closest(self):
        needle = self.queryset.filter(needle=True).point
        return self.queryset.filter(needle=False).distance(needle).order_by('distance')

# Create your models here.
class Location(models.Model):
    user_name = models.TextField()
    user_agent = models.TextField()
    needle = models.BooleanField(default=False)
    point = models.PointField()
    accuracy = models.IntegerField()

    objects = LocationManager()

    def __unicode__(self):
        return self.user_name

    def twitterfy(self):
        """HTML link to profile if user_name is a twitter handle"""
        pass

    class Meta:
        unique_together = (('name', 'user_agent'),)

    
