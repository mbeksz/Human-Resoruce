from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CVSerializer , CategorySerializer
from .models import CV, Category
from django.http import Http404 # 404 hataları için
from .sentez import get_chatgpt_response 
import json

class SentezChatView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            data = json.loads(request.body)
            user_message = data.get('message')
        except json.JSONDecodeError:
            return Response({"detail": "Geçersiz JSON formatı."}, status=status.HTTP_400_BAD_REQUEST)

        if not user_message:
            return Response({"detail": "Mesaj boş olamaz."}, status=status.HTTP_400_BAD_REQUEST)

        bot_response = get_chatgpt_response(user_message)

        return Response({"response": bot_response}, status=status.HTTP_200_OK)

class CVUploadView(APIView):
    def post(self, request):
        print("POST DATA:", request.POST)
        print("FILES:", request.FILES)
        files = request.FILES.getlist('files')
        position = request.data.get('position')
        category_id = request.data.get('categoryId')
        notes = request.data.get('notes', '')
        candidate_names = request.data.getlist('candidateNames')

        if not position or not category_id or not files:
            return Response({'error': 'Eksik veri'}, status=status.HTTP_400_BAD_REQUEST)

        for idx, file in enumerate(files):
            data = {
                'candidate_name': candidate_names[idx],
                'position': position,
                'category_id': category_id,
                'notes': notes,
                'file': file
            }
            serializer = CVSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response({'message': 'CV\'ler başarıyla yüklendi'}, status=status.HTTP_201_CREATED)
    
    def get(self, request):
        cvs = CV.objects.all()
        serializer = CVSerializer(cvs, many=True)
        return Response(serializer.data)


class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CategoryDetailView(APIView): # YENİ EKLENECEK
    """
    Belirli bir kategori nesnesini alır, günceller veya siler.
    """
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None): # Kısmi güncelleme için
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data, partial=True) # partial=True önemli
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        category = self.get_object(pk)
        # Frontend'deki "kategoriye bağlı aday varsa silinemez" mantığını burada da uygulayabilirsiniz.
        # if category.candidate_set.count() > 0: # Eğer Category modelinizde related_name tanımlıysa
        #    return Response({"detail": "Bu kategoriye bağlı adaylar olduğu için silinemez."}, status=status.HTTP_409_CONFLICT) # Conflict hatası
        
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)