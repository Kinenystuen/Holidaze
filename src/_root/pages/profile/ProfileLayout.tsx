import { Outlet } from "react-router-dom";
import { useUserContext } from "../../../components/context/useUserContext";
import AdminSidebar from "../../../components/AdminSideBar";
import Header from "../../../components/shared/Header";

const ProfileLayout = () => {
  const { user } = useUserContext();

  return (
    <div className="relative container mx-auto min-w-full">
      <div className="mx-auto">
        <div className="w-full md:flex">
          {/* Left-side menu */}
          <div className="absolute md:relative md:block md:w-64">
            <AdminSidebar user={user} />
          </div>

          {/* Right-side content - Changes based on route */}
          <div className="flex flex-col flex-1 overflow-auto w-full">
            <Header />
            <div className="relative flex flex-col w-full md:flex 2xl:max-w-7xl flex-1 gap-2 custom-scrollbar mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
