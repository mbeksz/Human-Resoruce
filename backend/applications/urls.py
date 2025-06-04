from django.urls import path
from .views import CVUploadView, CategoryListView, CategoryDetailView

urlpatterns = [
    path('upload/', CVUploadView.as_view(), name='cv-upload'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
]
