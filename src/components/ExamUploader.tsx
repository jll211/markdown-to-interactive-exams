import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

interface ExamUploaderProps {
  onUpload: (content: string) => void;
  icon: React.ReactNode;
  accept: string;
  label: string;
}

const ExamUploader = ({ onUpload, icon, accept, label }: ExamUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        const content = reader.result as string;
        onUpload(content);
      };

      reader.readAsText(file);
    },
    [onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/markdown": [".md"] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
        isDragActive
          ? "border-primary bg-primary/5"
          : "border-gray-300 hover:border-primary"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-2">
        {icon}
        <p className="text-sm text-gray-600">
          {isDragActive
            ? "Datei hier ablegen..."
            : `${label} hierher ziehen oder klicken zum Auswählen`}
        </p>
      </div>
    </div>
  );
};

export default ExamUploader;