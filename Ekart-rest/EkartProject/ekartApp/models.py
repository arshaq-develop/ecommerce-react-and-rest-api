from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxLengthValidator

# Create your models here.

class Category(models.Model):
    category_name = models.CharField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.category_name
    
class Product(models.Model):
    product_name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    price = models.PositiveIntegerField()
    description = models.CharField(max_length=100)
    image = models.ImageField(upload_to='media')
     
    def __str__(self):
        return self.product_name
    
    def list_reviews(self):
        return self.reviews_set.all()
    
    def total_reviews(self):
        rating = self.reviews_set.all()
        ratin = [i.ratings for i in rating]
        if ratin:
            total_review = sum(ratin) / len(ratin)
            return total_review
        else:
            return 0
    
class Cart(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MinValueValidator(15)])
    status = models.CharField(max_length=100, default='in-cart')
    date = models.DateField(auto_now_add=True)


class Orders(models.Model):
    product = models.ForeignKey(Cart, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.CharField(max_length=100)
    status = models.CharField(max_length=100, default='order-placed')


class reviews(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.CharField(max_length=100)
    ratings = models.PositiveIntegerField(default=1, validators=[MinValueValidator(1), MinValueValidator(5)])

    class Meta:
        unique_together = ('user', 'product') 