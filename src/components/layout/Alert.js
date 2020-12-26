import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

// it's gonna take in props that is passed in
const Alert = (props) => {
  const { message, messageType } = props; // when props is passed in as functional component, then just write "props"
  return (
    <div
      className={classnames("alert", {
        "alert-success": messageType === "success", // alert-success if the message type is equal to success
        "alert-danger": messageType === "error", // alert-danger if the message type is equal to error
      })}
    >
      {/* we want the message that's passed in */}
      {message}
    </div>
  );
};

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  messageType: PropTypes.string.isRequired,
};
export default Alert;
