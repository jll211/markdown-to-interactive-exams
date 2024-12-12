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
        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
        isDragActive
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
      )}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        {icon}
        <div className="space-y-2">
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? "Datei hier ablegen..." : label}
          </p>
          <p className="text-sm text-gray-500">
            Datei hierher ziehen oder klicken zum Auswählen
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExamUploader;