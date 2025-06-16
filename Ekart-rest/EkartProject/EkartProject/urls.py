"""
URL configuration for EkartProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import DefaultRouter
from ekartApp import views
from rest_framework.authtoken import views as authview
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('product', views.ProductView, basename='product_view')
router.register('user', views.UserRegisterView, basename='user_view')
router.register('cart', views.CartView, basename='cart_view')
router.register('reviews', views.ListReviewView, basename='review_view')
# router.register('user/detail', views.UserDetail, basename='detail_view')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('token', authview.obtain_auth_token),
    path('access', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/detail/',views.UserDetail.as_view(), name='detail'),

] + router.urls + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
