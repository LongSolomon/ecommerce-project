import { Outlet } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminMenu from "./pages/Admin/AdminMenu";
import { useSelector } from "react-redux";

const App = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div className="relative flex">
      <div className="w-full">
        <ToastContainer />
        <Navigation />
        <main className="overflow-x-hidden w-full">
          {userInfo && userInfo.isAdmin && (
            <div className="absolute top-0 left-0 z-50">
              <AdminMenu />
            </div>
          )}
          <div className="relative z-40 h-auto pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;