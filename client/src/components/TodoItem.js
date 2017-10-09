//@flow
import React from "react";
export default ({ todo }) => {
  return (
    <li>
      <div>
        <input type="checkbox" />
        <label htmlFor="">{todo.text}</label>
        <button>X</button>
      </div>
      <input type="text" defaultValue={todo.text} />
    </li>
  );
};
