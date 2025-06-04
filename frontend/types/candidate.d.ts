// frontend/types/candidate.d.ts
export interface Candidate {
  id: string; // veya number, backend'den gelen ID tipine göre
  candidate_name: string;
  position: string;
  category?: string; // Kategori adı, eğer backend'den geliyorsa veya frontend'de eşleştirilecekse
  uploaded_at: string; // Tarih string formatında
  notes: string | null;
  status?: string; // Adayın durumu (örneğin: "başvurdu", "görüşme", "tamamlandı" gibi)
  // Diğer aday özellikleri varsa ekleyebilirsiniz
}