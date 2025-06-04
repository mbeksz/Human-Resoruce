import React, { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Upload, File, X } from 'lucide-react';
import Button from './Button';
import * as pdfjsLib from 'pdfjs-dist';

interface FileUploadProps {
  label?: string;
  helperText?: string;
  error?: string;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  onFilesSelect?: (files: File[], names: string[]) => void;
  className?: string;
}

const FileUpload = ({
  label,
  helperText,
  error,
  accept = '.pdf',
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = true,
  onFilesSelect,
  className,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);

  const extractNameFromPDF = async (file: File): Promise<string> => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1);
      const textContent = await page.getTextContent();
      const text = textContent.items.map((item: any) => item.str).join(' ');
      
      // Extract name from the first page (you might need to adjust this logic)
      const nameMatch = text.match(/[A-Z][a-z]+ [A-Z][a-z]+/);
      return nameMatch ? nameMatch[0] : file.name.replace('.pdf', '');
    } catch (error) {
      console.error('Error extracting name from PDF:', error);
      return file.name.replace('.pdf', '');
    }
  };

  const processFiles = async (files: File[]) => {
    const validFiles: File[] = [];
    const names: string[] = [];
    
    for (const file of files) {
      if (file.size > maxSize) {
        setFileError(`File ${file.name} exceeds the maximum limit (${Math.floor(maxSize / (1024 * 1024))}MB)`);
        continue;
      }
      
      if (!file.type.includes('pdf')) {
        setFileError(`File ${file.name} is not a PDF`);
        continue;
      }
      
      validFiles.push(file);
      const name = await extractNameFromPDF(file);
      names.push(name);
    }
    
    if (validFiles.length > 0) {
      setSelectedFiles(validFiles);
      if (onFilesSelect) {
        onFilesSelect(validFiles, names);
      }
      setFileError(null);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    await processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      if (onFilesSelect && newFiles.length > 0) {
        onFilesSelect(newFiles, newFiles.map(f => f.name.replace('.pdf', '')));
      }
      return newFiles;
    });
  };

  return (
    <div className={twMerge('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div
        className={twMerge(
          'border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors duration-200',
          fileError || error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400',
        )}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              Drag and drop your PDF files here or click to browse
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Only PDF files are accepted
            </p>
            <p className="text-xs text-gray-500">
              Maximum size per file: {Math.floor(maxSize / (1024 * 1024))}MB
            </p>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>

      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center p-3 border rounded-lg bg-blue-50 border-blue-200">
              <File className="h-5 w-5 text-blue-500 mr-3" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => handleRemoveFile(index)}
                aria-label="Remove file"
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      {(fileError || error) && (
        <p className="mt-2 text-sm text-red-600">{fileError || error}</p>
      )}
      
      {!fileError && helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default FileUpload;