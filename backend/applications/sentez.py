# backend/hr_app/sentez.py (veya ilgili dizininizdeki sentez.py)
import os
from openai import OpenAI
from dotenv import load_dotenv

# Pathlib ile daha güvenli dosya yolu yönetimi
from pathlib import Path

# .env dosyasındaki ortam değişkenlerini yükle
load_dotenv()

# OpenAI istemcisini API anahtarı ile başlat
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

# Prompt dosyasının yolu
# Bu yolu, sentez.py'nin bulunduğu yere göre ayarlayın.
# Örn: Eğer sentez.py -> backend/hr_app/sentez.py ise
# prompt_file_path -> backend/hr_app/prompts/sentez_erp_tips.txt
current_dir = Path(__file__).parent
prompt_file_path = current_dir / "prompts" / "sentez_erp_tips.txt"

# Sistem mesajını dosyadan oku
def load_system_prompt(file_path: Path) -> str:
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Hata: Prompt dosyası bulunamadı: {file_path}")
        return "Sen bir yardımcı asistansın." # Yedek sistem mesajı
    except Exception as e:
        print(f"Hata: Prompt dosyası okunurken bir hata oluştu: {e}")
        return "Sen bir yardımcı asistansın." # Yedek sistem mesajı

SYSTEM_PROMPT = load_system_prompt(prompt_file_path)

# Eğer prompt dosyası boş veya okunamadıysa varsayılan bir değer ata
if not SYSTEM_PROMPT.strip():
    SYSTEM_PROMPT = "Sen bir İnsan Kaynakları asistanısın. Adaylarla ilgili sorulara doğru ve yardımcı cevaplar ver."
    print("Uyarı: Prompt dosyası boş veya okunamadı. Varsayılan sistem mesajı kullanılıyor.")


def get_chatgpt_response(user_prompt: str) -> str:
    """
    ChatGPT modelinden bir yanıt alır. Sistem mesajı bir dosyadan okunur.

    Args:
        user_prompt (str): Kullanıcının mesajı.

    Returns:
        str: ChatGPT'den gelen yanıt metni.
    """
    try:
        completion = client.chat.completions.create(
            model="gpt-4o-mini", # Modelinizi buradan seçin
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_prompt}
            ],
            max_tokens=500,
            temperature=0.7,
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(f"ChatGPT'den yanıt alırken hata oluştu: {e}")
        return "Üzgünüm, şu anda yanıt veremiyorum. Lütfen daha sonra tekrar deneyin."

# Örnek kullanım
if __name__ == "__main__":
    print(f"Kullanılan sistem prompt'u:\n---\n{SYSTEM_PROMPT}\n---")

    test_query = "Sentez ERP'de raporları nasıl filtreleyebilirim?"
    response = get_chatgpt_response(test_query)
    print(f"\nSoru: {test_query}")
    print(f"ChatGPT Cevabı: {response}")

    test_query_2 = "Menüye kısayol ekleme nasıl yapılır?"
    response_2 = get_chatgpt_response(test_query_2)
    print(f"\nSoru: {test_query_2}")
    print(f"ChatGPT Cevabı: {response_2}")