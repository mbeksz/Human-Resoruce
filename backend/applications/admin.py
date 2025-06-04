# applications/admin.py
from django.contrib import admin
from .models import CV, Category
admin.site.register(Category)

admin.site.register(CV)
