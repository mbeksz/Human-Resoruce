// frontend/hooks/useCandidates.ts
import { useState, useEffect } from 'react';
import { candidatesAPI } from '../api';
import { Candidate } from '../types/candidate';

interface UseCandidatesResult {
  candidates: Candidate[];
  loading: boolean;
  error: Error | null;
  refetch: () => void; // Veriyi yeniden çekmek için bir fonksiyon
}

const useCandidates = (): UseCandidatesResult => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [triggerRefetch, setTriggerRefetch] = useState(0); // Yeniden çekmeyi tetiklemek için

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await candidatesAPI.getCandidates();
        setCandidates(data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [triggerRefetch]); // triggerRefetch değiştiğinde veriyi yeniden çek

  const refetch = () => {
    setTriggerRefetch(prev => prev + 1);
  };

  return { candidates, loading, error, refetch };
};

export default useCandidates;