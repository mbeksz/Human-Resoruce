// frontend/api/candidates.ts
import { API_BASE_URL } from './config';
import { Candidate } from '../types/candidate';

export const getCandidates = async (): Promise<Candidate[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/cv/upload/`); // Backend'deki aday listesi endpoint'i
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Candidate[] = await response.json();
    return data;
  } catch (error) {
    console.error("Adaylar çekilemedi:", error);
    throw error; // Hatayı çağıran yere fırlat
  }
};