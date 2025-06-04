from rest_framework import serializers
from .models import CV, Category

class CategorySerializer(serializers.ModelSerializer):
    # Bu kategoriye bağlı CV'lerin sayısını döndürecek yeni bir alan
    cv_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at', 'cv_count'] # 'cv_count' alanını buraya eklemeyi unutmayın!

    def get_cv_count(self, obj):
        """
        Her bir kategori nesnesi (obj) için ilişkili CV'lerin sayısını döndürür.
        """
        # obj: Serialize edilen Category nesnesidir.
        # obj.cvs, Category modelindeki 'category' ForeignKey alanının related_name'idir.
        # Eğer related_name belirtmediyseniz, varsayılan olarak 'cv_set' (obj.cv_set) kullanın.
        return obj.cvs.count() # Eğer related_name='cvs' ise
        # return obj.cv_set.count() # Eğer related_name belirtilmemişse


class CVSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)  # Kategori adını döndürür
    status = serializers.CharField(source='get_status_display', read_only=True)  # İnsan okunabilir hali
    category_id = serializers.PrimaryKeyRelatedField(  # 👈 bunu ekliyoruz
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )   
   
    class Meta:
        model = CV
        fields = [
            'id', 
            'candidate_name', 
            'position', 
            'category', 
            'notes', 
            'file', 
            'uploaded_at',
            'category_id' ,
            'status',
        ]
