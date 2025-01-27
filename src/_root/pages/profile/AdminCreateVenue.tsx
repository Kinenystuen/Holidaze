import { useState } from "react";
import { VenueProvider } from "../../../components/context/VenueContext";
import VenueForm from "../../../components/createVenue/CreateVenueForm";
import VenuePreview from "../../../components/createVenue/VenuePreview";
import Button from "../../../components/shared/Button/Button";

const AdminCreateVenue = () => {
  const [togglePreview, setTogglePreview] = useState(false);

  const handlePreview = () => {
    setTogglePreview(!togglePreview);
    console.log(togglePreview);
  };

  return (
    <VenueProvider>
      <div className="container mx-auto">
        <div className="max-w-screen-xl mx-auto px-10">
          <h2 className="text-2xl font-semibold mt-8">Create Venue</h2>
          <p className="mt-4">Create a new venue to add to the database.</p>
          <VenueForm />

          <div className="flex gap-2">
            <Button
              buttonType="violetSecondary"
              className="mt-4"
              onClick={handlePreview}
            >
              Preview Venue
            </Button>
            <Button buttonType="violet" className="mt-4">
              Create Venue
            </Button>
          </div>
          {togglePreview && <VenuePreview />}
        </div>
      </div>
    </VenueProvider>
  );
};

export default AdminCreateVenue;
