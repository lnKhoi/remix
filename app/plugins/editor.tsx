import axios from 'axios';
import { log } from 'node:console';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { BASE64_REGEX } from '~/constants/regex.constant';

const ReactQuill = React.lazy(() => import('react-quill'));

type EditorProps = {
  onChange?: (content: string) => void;
  value: string;
  showToolbar?: boolean;
  disabled?: boolean; // Add the disabled prop
};

const Editor = ({
  onChange,
  value,
  showToolbar = true,
  disabled = false, // Default to false
}: EditorProps) => {
  const [code, setCode] = useState<string>(value);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const handleProcedureContentChange = async (content: string) => {
    try {
      const base64Matches = content.matchAll(BASE64_REGEX);

      let updatedContent = content;

      for (const match of base64Matches) {
        const base64Image = match[1];
        const uploadedUrl = await uploadToImgBB(base64Image);

        updatedContent = updatedContent.replace(match[0], `${uploadedUrl}"`);
      }

      setCode(updatedContent);
      onChange?.(updatedContent);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadToImgBB = async (file: string) => {
    const apiKey = 'e37513ca1eb7dd64802347b892fafdb0';
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      if (response.status >= 200 && response.status < 300 && response.data.success) {
        return response.data.data.url;
      } else {
        console.log(response.data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const modules = {
    toolbar: showToolbar && !disabled // Hide toolbar when disabled
      ? [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ size: [] }],
        [{ font: [] }],
        [{ align: ['right', 'center', 'justify'] }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        [{ color: ['red', '#785412'] }],
        [{ background: ['red', '#785412'] }],
      ]
      : false, // Hide toolbar when showToolbar is false or disabled
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
    'size',
    'font',
  ];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReactQuill
        theme="snow"
        modules={modules}
        defaultValue={code}
        formats={formats}
        value={code}
        onChange={disabled ? undefined : handleProcedureContentChange} // Disable onChange if disabled
        readOnly={disabled} // Set ReactQuill to read-only mode
      />
    </Suspense>
  );
};

export default Editor;
