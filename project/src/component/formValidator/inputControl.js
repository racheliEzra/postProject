import React from "react";

export const input = ({
  input,
  type,
  placeholder,
  id,
  meta: { touched, error },
  ...rest
}) => {

  return (
    <div>
      <input className="form-control"{...input} 
        type={type} placeholder={placeholder} id={id} />
      {touched && error && (
        <>
          <div>
            <span style={{ fontSize: "15px", color: "red" }}>{error}</span>
          </div>
        </>
      )}
    </div>
  );
};