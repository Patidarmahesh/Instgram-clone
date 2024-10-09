import React ,{ lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
import Mainlayout from "./components/mainlayout";
import Paginations from "./components/pagination";
import UserProfile from "./components/userProfile";
import Story from "./components/story";
import "react-toastify/dist/ReactToastify.css";
import EditProfile from "./components/EditProfile";
import { PrivateRoute } from "./components/PrivateRoute";
import ChatePage from "./components/ChatPage/ChatePage";
import { io } from "socket.io-client";
import { setSocket } from "./redux/socketSlice";
import { setOnline } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/notificationSlice";
import Design from "./pages/Design";
// import Explore from "./components/Explore";
const MyLazyComponent = lazy(() => import("./components/Explore"));

const items = [
  "https://storage.pics-x.com/gallery-images/125345/0047.jpg?md5=0b0d7006a36eb08f074c2a390cfbc270",
  "https://storage.pics-x.com/gallery-images/125345/0046.jpg?md5=dfe68b241a7c89e6f76a30e3c555e8ff",
  "https://storage.pics-x.com/gallery-images/125345/0053.jpg?md5=1f632d3182f9033a56fd460cb94867f1",
  "https://storage.pics-x.com/gallery-images/125345/0048.jpg?md5=2c6ecc92b4d26cf9d7d9fe6b4461d013",
];

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Mainlayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            {" "}
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile/:_id",
        element: (
          <PrivateRoute>
            {" "}
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/account/edit",
        element: (
          <PrivateRoute>
            {" "}
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/chat",
        element: (
          <PrivateRoute>
            <ChatePage />
          </PrivateRoute>
        ),
      },
      {
        path: "/explore",
        element: (
          <PrivateRoute>
            <Suspense fallback={<div className="text-red-700">Loading.....</div>}>
              <MyLazyComponent />
            </Suspense>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/pagination",
    element: <Paginations />,
  },
  {
    path: "/story",
    element: <Story />,
  },
  {
    path: "/design",
    element: <Design />,
  },
]);
function App() {
  const { dark } = useSelector((store) => store.darkMode);
  let showMode = `${dark === "dark" ? "dark" : "white"}`;
  const { user } = useSelector((state) => state.auth);
  const { socket } = useSelector((state) => state.socketIo);
  const dispatch = useDispatch();
  const { likeNotification } = useSelector((state) => state.appNotification);

  React.useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
        transports: ["websocket"],
      });
      dispatch(setSocket(socketio));

      // listen get all online events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnline(onlineUsers));
      });
      // notification
      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket?.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <div className={`${showMode}`}>
      {/* <div className="bg-[#212121] text-white">  */}
      <ToastContainer />
      <RouterProvider router={browserRouter} />
    </div>
  );
}

export default App;
