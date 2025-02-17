import { VenueProvider } from "../../../components/context/VenueContext";
import VenueForm from "../../../components/createVenue/CreateVenueForm";
import H2 from "../../../components/shared/Typography/H2";
import P from "../../../components/shared/Typography/P";

const AdminCreateVenue = () => {
  return (
    <VenueProvider>
      <div className="container mx-auto mb-20">
        <div className=" max-w-2xl mx-auto px-5 md:px-10">
          <H2 className="text-2xl font-semibold mt-8">Create Venue</H2>
          <P className="mt-4">Create a new venue to start hosting</P>
          <VenueForm />
        </div>
      </div>
    </VenueProvider>
  );
};

export default AdminCreateVenue;
