from django.urls import path
from .views import CVUploadView, CategoryListView, CategoryDetailView, SentezChatView
urlpatterns = [
    path('cv/upload/', CVUploadView.as_view(), name='cv-upload'),
    path('cv/categories/', CategoryListView.as_view(), name='category-list'),
    path('cv/categories/<int:pk>/', CategoryDetailView.as_view(), name='category-detail'),
    path('sentez/', SentezChatView.as_view(), name='sentez-chat'),
]
