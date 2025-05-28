import React from 'react';
import styles from './InputField.module.css';

interface InputFieldProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  disabled?: boolean;
  // Props from Figma component properties if needed:
  // hasError?: boolean;
  // label?: string;
  // hasLabel?: boolean;
  // description?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  name,
  id,
  disabled = false,
  // hasError = false,
}) => {
  // const wrapperClasses = [
  //   styles.inputWrapper,
  //   hasError ? styles.errorState : ''
  // ].join(' ');

  return (
    <div className={styles.inputFieldContainer}>
      {/* Label and Description logic can be added here if hasLabel/hasDescription is true */}
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={styles.input}
      />
      {/* Error message logic can be added here if hasError is true */}
    </div>
  );
};

export default InputField;
