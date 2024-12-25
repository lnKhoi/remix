import React, {
  Suspense,
  useEffect,
  useState,
} from 'react';

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

  const handleProcedureContentChange = (content: string) => {
    setCode(content);
    onChange?.(content);
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
