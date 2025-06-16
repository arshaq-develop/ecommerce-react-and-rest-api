from rest_framework import serializers
from ekartApp.models import Category, Product, Cart, Orders, reviews
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email','password']


class ReviewSerializer(serializers.ModelSerializer):
    product = serializers.CharField(read_only = True)
    user = serializers.CharField(read_only = True)
    class Meta:
        model = reviews
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.CharField(read_only=True)
    id = serializers.IntegerField(read_only=True)
    list_reviews = ReviewSerializer(many=True, read_only = True)
    total_reviews = serializers.FloatField(read_only = True)
    class Meta:
        model = Product
        fields = '__all__'

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    user = UserSerializer(read_only = True)
    date = serializers.DateField(read_only = True)
    class Meta:
        model = Cart
        fields = '__all__'


class OrderSerialzer(serializers.ModelSerializer):
    product = serializers.CharField(read_only = True)
    user = serializers.CharField(read_only = True)
    class Meta:
        model = Orders
        fields = '__all__'


