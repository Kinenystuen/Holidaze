import { VenueProvider } from "../../../components/context/VenueContext";
import VenueForm from "../../../components/createVenue/CreateVenueForm";

const AdminCreateVenue = () => {
  return (
    <VenueProvider>
      <div className="container mx-auto mb-20">
        <div className="max-w-screen-xl mx-auto px-10">
          <h2 className="text-2xl font-semibold mt-8">Create Venue</h2>
          <p className="mt-4">Create a new venue to add to the database.</p>
          <VenueForm />
        </div>
      </div>
    </VenueProvider>
  );
};

export default AdminCreateVenue;
