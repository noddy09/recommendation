from django.db import models
from items.models import Item

class Band(models.Model):
    """
    Band model class.
    """
    name = models.CharField("Name", max_length=64, unique=True, blank=False, null=False)
    img_url = models.URLField("Image url")
    info = models.TextField("Information.")
    items = models.ManyToManyField(Item)

    def __str__(self):
        return self.name