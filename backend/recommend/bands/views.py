from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import serializers

from .models import Band


class BandSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    img_url = serializers.URLField()
    info = serializers.CharField()
    items = serializers.SerializerMethodField()

    def get_items(self, obj):
        return list(obj.items.all().values_list('id', flat=True))

class BandListAPI(APIView):
    def get(self, request):
        bands = Band.objects.all()
        serializer = BandSerializer(bands, many=True)
        return Response(serializer.data)
