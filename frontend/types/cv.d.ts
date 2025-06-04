// frontend/types/cv.d.ts
export interface CVUploadForm {
  position: string;
  categoryId: string;
  notes: string;
}

export interface UploadedFile {
  file: File;
  candidateName: string;
}