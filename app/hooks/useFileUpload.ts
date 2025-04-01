import { useState } from 'react';

import { uploadMedia } from '~/apis/auth';

const useFileUpload = () => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("files", file);

      const response = await uploadMedia(formData as FormData);
      const uploadedUrl = response?.data?.[0];

      setFileUrl(uploadedUrl);
      return uploadedUrl;
    } catch (error) {
      console.error("File upload error:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { fileUrl, uploadFile, loading };
};

export default useFileUpload;
