import { useState } from 'react';

import { uploadMedia } from '~/apis/auth';

const useFileUpload = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      const formData = new FormData();
      formData.append("files", file);

      const response = await uploadMedia(formData as FormData); 
      const uploadedUrl = response?.data?.[0];

      setFileUrl(uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("File upload error:", error);
      return null;
    }
  };

  return { fileUrl, uploadFile };
};

export default useFileUpload;
