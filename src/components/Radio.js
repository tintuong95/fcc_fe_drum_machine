import React from "react";

export default function Radio({ name, value, setValue }) {
  return (
    <div class="switch">
      <input
        defaultChecked={true}
        className="input-radio"
        type={"radio"}
        name={name}
        value={1}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
      <input
        value={2}
        className="input-radio"
        type={"radio"}
        name={name}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></input>
    </div>
  );
}
