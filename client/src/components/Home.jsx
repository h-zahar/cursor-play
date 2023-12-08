import { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";
import throttle from "lodash.throttle";
import { Cursor } from "../Cursor";

const Home = ({ username }) => {
  const WS_URL = "wss://cursorplay-oh27lohg.b4a.run";

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 50;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  const renderCursors = (users) => {
    return Object.keys(users).map((uuid) => {
      const user = users[uuid];

      return <Cursor key={uuid} point={[user.state.x, user.state.y]} />;
    });
  };

  const renderUsersList = (users) => {
    return (
      <ul>
        {Object.keys(users).map((uuid) => {
          return <li key={uuid}>{JSON.stringify(users[uuid])}</li>;
        })}
      </ul>
    );
  };

  useEffect(() => {
    sendJsonMessage({
      x: 0,
      y: 0,
    });

    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled.current({
        x: e.clientX,
        y: e.clientY,
      });
    });
  }, []);

  if (lastJsonMessage) {
    return (
      <>
        {renderCursors(lastJsonMessage)}
        {renderUsersList(lastJsonMessage)}
      </>
    );
  }

  return <div>{username}</div>;
};

export default Home;
