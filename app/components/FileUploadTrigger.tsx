import React from 'react';

interface FileUploadTriggerProps {
  onFileSelect: (file: File) => void;
  children: React.ReactNode;
}

const FileUploadTrigger: React.FC<FileUploadTriggerProps> = ({ onFileSelect, children }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div style={{ display: "inline-block", cursor: "pointer" }}>
      <input
        type="file"
        style={{ display: "none" }}
        id="fileInput"
        onChange={handleFileChange}
      />
      <div onClick={() => document.getElementById("fileInput")?.click()}>
        {children}
      </div>
    </div>
  );
};

export default FileUploadTrigger;
