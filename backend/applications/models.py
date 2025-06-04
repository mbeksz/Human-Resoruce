from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name    
    
    
class CV(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Görüşülmedi'),
        ('positive', 'Olumlu'),
        ('negative', 'Olumsuz'),
        ('interviewed', 'Görüşüldü'),
        ('archived', 'Arşivlendi'),
        ('rejected', 'Reddedildi'),
        ('hired', 'İşe Alındı'),
    ]

    candidate_name = models.CharField(max_length=255)
    position = models.CharField(max_length=255)
    category = models.ForeignKey(Category, related_name='cvs', on_delete=models.SET_NULL, blank=True, null=True)
    notes = models.TextField(blank=True)
    file = models.FileField(upload_to='cv_files/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=200, choices=STATUS_CHOICES, default='pending')  

    def __str__(self):
        return self.candidate_name