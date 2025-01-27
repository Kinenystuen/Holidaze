import { Outlet } from "react-router-dom";
import { useUserContext } from "../../../components/context/useUserContext";
import AdminSidebar from "../../../components/AdminSideBar";
import H1 from "../../../components/shared/Typography/H1";

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
            <div className=" border-b-2 dark:border-customBgDark-500 w-full mt-3 pb-3 mb-6 flex items-center justify-start">
              <H1 className="mx-6 ml-12 text-customBgDark-500 dark:text-whiteFont-600 font-extrabold">
                Dashboard
              </H1>
            </div>
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
