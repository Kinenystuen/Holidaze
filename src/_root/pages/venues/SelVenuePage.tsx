import H1 from "../../../components/shared/Typography/H1";
import SelVenue from "./SelVenue";

const SelVenuePage = () => {
  return (
    <div className="container mx-auto">
      <div className="max-w-screen-xl mx-auto px-10">
        <H1>Venue</H1>
        <SelVenue />
      </div>
    </div>
  );
};

export default SelVenuePage;
