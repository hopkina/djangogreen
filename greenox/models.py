from django.db import models
from django.contrib.gis.db import models as gismodels


class GreenSite(gismodels.Model):

    id = models.CharField(max_length=40, primary_key=True)
    function = models.CharField(max_length=40)
    name = models.CharField(max_length=254)
    geom = gismodels.GeometryField()

    def __unicode__(self):
        return self.function


class Wards(gismodels.Model):

    id = models.CharField(max_length=40, primary_key=True)
    name = models.CharField(max_length=70)
    unitid = models.IntegerField()
    code = models.CharField(max_length=9)
    hectares = models.DecimalField(max_digits=12, decimal_places=3)
    geom = gismodels.GeometryField()

    def __unicode__(self):
        return self.unitid


class GreenSiteWard(gismodels.Model):

    """
    Defines PostGIS view and is unmanaged.
    SQL to create view:
    SELECT g.id, g.function, g.name, w.name as wardname
    FROM greenox_greensite as g 
	    INNER JOIN greenox_wards as w
		    ON ST_Intersects(ST_PointOnSurface(g.geom), w.geom)
    """

    id = models.CharField(max_length=40, primary_key=True)
    function = models.CharField(max_length=40)
    name = models.CharField(max_length=254)
    wardname = models.CharField(max_length=70)
    geom = gismodels.GeometryField() 

    def __unicode__(self):
        return self.function

    class Meta:
        managed = False
