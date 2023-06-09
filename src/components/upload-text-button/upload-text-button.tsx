import { ChangeEvent } from 'react';
import './upload-text-button.scss';

type UploadTextButtonProps = {
  isDisabled: boolean;
  onFileLoad: (text: string) => void;
};

function UploadTextButton({ isDisabled, onFileLoad }: UploadTextButtonProps) {
  // Читает контент из загруженного файла
  const handleFileLoad = async (evt: ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    const reader = new FileReader();
    evt.target.files && reader.readAsText(evt.target.files[0]);
    reader.onload = async (evt) => {
      if (typeof evt.target?.result === 'string') {
        const text = evt.target?.result as string;
        onFileLoad(text);
      }
    };
  };

  return (
    <>
      <input
        className="visually-hidden"
        type="file"
        id="load-file"
        accept=".txt"
        onClick={(evt) => {
          evt.currentTarget.value = '';
          onFileLoad(evt.currentTarget.value);
        }}
        onChange={(evt) => {
          handleFileLoad(evt);
        }}
        disabled={isDisabled}
      />
      <label className="load-text-label" htmlFor="load-file">
        Загрузить файл
      </label>
    </>
  );
}

export default UploadTextButton;
