import React from "react";
import {TextInput } from 'react-materialize';

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div>
      <TextInput {...rest} label={label} name={name} id={name} autoComplete="on" className="input-field col grey-text" />
      {error && <span className="red-text">{error}</span>}
    </div>
  );
};
export default Input;