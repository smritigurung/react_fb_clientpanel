import { NOTIFY_USER } from "./types";

export const notifyUser = (message, messageType) => {
  return {
    type: NOTIFY_USER,
    // if the key and value are same for example: message: message, you don't have to write both like that
    message,
    messageType,
  };
};
