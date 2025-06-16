from django.shortcuts import render
from ekartApp.models import Category, Product, Cart, Orders, reviews
from rest_framework.viewsets import ModelViewSet,ViewSet
from rest_framework.response import Response
from ekartApp.serializers import ProductSerializer, CartSerializer, UserSerializer, OrderSerialzer, ReviewSerializer
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.core.mail import send_mail, settings
from django.db.utils import IntegrityError
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView


# Create your views here.

class UserDetail(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self,request):
        user=request.user
        return Response({'id':user.id})

class ProductView(ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

    @action(methods=['POST'], detail=True, authentication_classes=[TokenAuthentication], permission_classes = [IsAuthenticated])
    def add_to_cart(self, request, *args, **kwargs):
        product = Product.objects.get(id = kwargs.get('pk'))
        user = request.user
        serialzer = CartSerializer(data = request.data)
        if serialzer.is_valid():
            item = Cart.objects.filter(user=user, product=product, status='in-cart')
            if item:
                cart_obj = item[0]
                cart_obj.quantity = int(serialzer.validated_data.get('quantity'))
                cart_obj.save()
                return Response({'msg':'item added'})
            else:
                Cart.objects.create(user=user, product=product, **serialzer.validated_data)
                return Response({'msg':'item added'})
            
    @action(methods=['POST'], detail=True, authentication_classes=[TokenAuthentication], permission_classes = [IsAuthenticated])
    def add_reviews(self, request, *args, **kwargs):
        product = Product.objects.get(id = kwargs.get('pk'))
        user = request.user
        serializer = ReviewSerializer(data = request.data)
        if serializer.is_valid():
            try:
                reviews.objects.create(**serializer.validated_data, user=user, product=product)
                print("dfghjkkjhgfdjhgf")
                return Response({'msg':'Review Added'})
            except IntegrityError:
                return Response({'msg':'invalid input'})
            except:
                return Response({'msg':'error'})
        else:
            return Response(data=serializer.errors)
        


class CartView(ModelViewSet):
    authentication_classes = [TokenAuthentication]
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    serializer_class = CartSerializer
    queryset = Cart.objects.all()

    def list(self, request, *args, **kwargs):
        user = request.user
        query = Cart.objects.filter(user=user)
        serializer = CartSerializer(query, many = True)
        return Response(data = serializer.data)
    
    @action(methods=['POST'], detail=True)
    def order_placed(self, request, *args, **kwargs):
        product = Cart.objects.get(id=kwargs.get('pk'))
        user = request.user
        email = user.email #request.user.email - another way to get email
        serializer = OrderSerialzer(data = request.data)
        if serializer.is_valid():
            Orders.objects.create(**serializer.validated_data, product=product, user=user)
            product.status = 'order-placed'
            product.save()
            send_mail('ekart', 'order placed', settings.EMAIL_HOST_USER, {email})
            return Response({'msg':'order placed'})
        else:
            return Response(data = serializer.errors)



class UserRegisterView(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = UserSerializer(data = request.data)
        if serializer.is_valid():
            User.objects.create_user(**serializer.validated_data)
            return Response(data=serializer.data)
        else:
            return Response(data = serializer.errors)
        
    @action(methods=['GET'], detail=True, authentication_classes=[TokenAuthentication], permission_classes = [IsAuthenticated])
    def list_cart_user(self,request, *args, **kwargs):
        print(request.user)
        user=User.objects.get(id=kwargs.get('pk'))
        cart = Cart.objects.filter(user=user)
        serializer = CartSerializer(cart, many=True)
        return Response(data=serializer.data) 




class ListReviewView(ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = reviews.objects.all()
