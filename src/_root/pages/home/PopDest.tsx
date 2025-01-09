import { Link } from "react-router-dom";
import H2 from "../../../components/shared/Typography/H2";
import TopRated from "./TopRated";
import Button from "../../../components/shared/Button/Button";

const PopDest = () => {
  return (
    <div className="container max-w-screen-xl mx-auto my-20 ">
      <div className="relative">
        <H2 className="my-6 text-2xl px-10">Popular Destinations</H2>
        <TopRated />
        <div className="flex justify-center mt-5">
          <Link to="/venues">
            <Button buttonType="violet" className="font-semibold rounded-full">
              View all venues
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PopDest;