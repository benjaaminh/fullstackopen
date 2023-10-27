import { useSelector } from "react-redux";

const Notification = () => {
  const notificationStyle = {
    color: "green",
    fontSize: 20,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    background: "lightgrey",
  };

  const errorStyle = {
    color: "red",
    fontSize: 20,
    borderStyle: "solid",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    background: "lightgrey",
  };

  const notification = useSelector(({ notification }) => {
    //take notification from store
    return notification;
  });

  if (notification === null) {
    return null;
  } else if (notification.toLowerCase().includes("fail")) {
    return <div style={errorStyle}>{notification}</div>;
  } else {
    return <div style={notificationStyle}>{notification}</div>;
  }
};

export default Notification;
