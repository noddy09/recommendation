from django.db import models

class Item(models.Model):
    """
    Item model class.
    """
    name = models.CharField("Name", max_length=64, unique=True, blank=False, null=False)

    def __str__(self):
        return self.name