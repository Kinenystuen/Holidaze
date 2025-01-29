import H1 from "../../../components/shared/Typography/H1";
import MyVenues from "./MyVenues";

const ManageVenues = () => {
  return (
    <div>
      <H1 className="max-w-4xl mx-auto font-semibold px-10 mt-4">My Venues</H1>
      <MyVenues />
    </div>
  );
};

export default ManageVenues;
