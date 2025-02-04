import { useEffect, useState } from "react";
import { UsersResponse } from "../../../components/library/types";
import { useApi } from "../../../components/hooks/UseApi";
import { apiHostUrl } from "../../../components/library/constants";
import Loader from "../../../components/ui/Loader";

import P from "../../../components/shared/Typography/P";
import { Link } from "react-router-dom";
import ErrorMessage from "../../../components/shared/ErrorMessage";
import Button from "../../../components/shared/Button/Button";
import MetaTags from "../../../components/metaTags";
import Breadcrumb from "../../../components/ui/BreadCrumbItem";
import { useUserContext } from "../../../components/context/useUserContext";
import ProfilesDisplay from "./ProfilesDisplay";

const ProfilesPage = () => {
  const [profileData, setProfileData] = useState<UsersResponse | null>(null);

  const { isAuthenticated } = useUserContext();

  // Fetch venue data
  const { response, isLoading, isError, errorMessage } = useApi<UsersResponse>(
    `${apiHostUrl}/holidaze/profiles?_bookings=true&_venues=true`
  );

  // Update state when response is available
  useEffect(() => {
    if (response?.data) {
      setProfileData(response.data);
    }
  }, [response]);

  console.log(profileData);

  if (!isAuthenticated) {
    return (
      <ErrorMessage message="Log in to view profile">
        <P>If you don't have an account, you can create one for free.</P>
        <Link to="/login" className="w-60">
          <Button buttonType="violet" className="my-5 px-4 inline-block w-full">
            Log in
          </Button>
        </Link>
      </ErrorMessage>
    );
  }
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

  if (!profileData) return null;

  // Breadcrumb navigation
  const breadcrumbItems = [
    { label: "", href: "/" },
    { label: "Profiles", href: "/profiles", current: true }
  ];

  return (
    <div>
      <MetaTags
        title={`Profiles - Holidaze`}
        keywords="holidaze, venue, hotel, booking, holiday, vacation"
        description={`Book your stay at Holidaze. Enjoy great amenities and a wonderful experience!`}
      />
      <div className="container max-w-screen-xl mx-auto px-5 md:px-10">
        <Breadcrumb items={breadcrumbItems} />
        <ProfilesDisplay data={profileData} />
      </div>
    </div>
  );
};

export default ProfilesPage;
