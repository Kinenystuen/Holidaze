import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useApi } from "../../../components/hooks/UseApi";
import { apiHostUrl } from "../../../components/library/constants";
import Loader from "../../../components/ui/Loader";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import P from "../../../components/shared/Typography/P";
import Button from "../../../components/shared/Button/Button";
import MetaTags from "../../../components/metaTags";
import Breadcrumb from "../../../components/ui/BreadCrumbItem";
import { UserProfile } from "../../../components/library/types";
import SelProfile from "../../../components/Profile/SelProfile";
import { useUserContext } from "../../../components/context/useUserContext";

const UserProfileData = () => {
  const { name } = useParams<{ name: string }>();
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const { isAuthenticated } = useUserContext();

  if (!isAuthenticated) {
    return (
      <ErrorMessage message="Log in to view profiles">
        <P>If you don't have an account, you can create one for free.</P>
        <Link to="/login" className="w-60">
          <Button buttonType="violet" className="my-5 px-4 inline-block w-full">
            Log in
          </Button>
        </Link>
      </ErrorMessage>
    );
  }

  // Fetch venue data
  const { response, isLoading, isError, errorMessage } = useApi<UserProfile>(
    `${apiHostUrl}/holidaze/profiles/${name}?_bookings=true&_venues=true`
  );

  // Update state when response is available
  useEffect(() => {
    if (response?.data) {
      setUserData(response.data);
    }
  }, [response]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage message="Profile not found">
        <P>{errorMessage}</P>
        <Link to="/profiles">
          <Button buttonType="violet" className="my-5 px-4 inline-block">
            Go back to profiles
          </Button>
        </Link>
      </ErrorMessage>
    );

  if (!userData) return null;

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: "", href: "/" },
    { label: "Profiles", href: "/profiles" },
    { label: userData.name, current: true }
  ];
  return (
    <div>
      <MetaTags
        title={`${userData.name} - Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at ${userData.name}. Enjoy great amenities and a wonderful experience!`}
      />
      <div className="container max-w-screen-xl mx-auto px-5 md:px-10">
        <Breadcrumb items={breadcrumbItems} />
        <SelProfile user={userData} />
      </div>
    </div>
  );
};

export default UserProfileData;
