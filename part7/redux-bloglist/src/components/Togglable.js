import { useState, forwardRef, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" }; //visible is default false
  //if it is true, dont display; display variable becomes none
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        {/*when visible=false */}
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {/*when visible=true*/}
        {props.children}
        <Button onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  );
});
Togglable.displayName = "Togglable";
export default Togglable;
