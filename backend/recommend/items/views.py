from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from .models import Item

class ItemSerializer(serializers.Serializer):
    name = serializers.CharField()
    bands = serializers.SerializerMethodField()

    def get_bands(self, obj):
        return list(obj.band_set.all().values_list('id', flat=True))

class ItemListAPI(APIView):
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)