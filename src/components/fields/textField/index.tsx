import React from 'react';

export interface TextFieldProps {
  record?: any;
  source: string;
}

export const TextField: React.FC<TextFieldProps> = ({ record, source }) => {
  return <span>{record?.[source]}</span>;
};
