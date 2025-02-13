import { Link } from "react-router-dom";
import H2 from "../../../components/shared/Typography/H2";

const popularDestinations = [
  {
    name: "Oslo",
    country: "Norway",
    flag: "NO",
    image:
      "https://images.unsplash.com/photo-1433757741270-94a3bcadc2f3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Bergen",
    country: "Norway",
    flag: "NO",
    image:
      "https://images.unsplash.com/photo-1580946443359-1126222f9224?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Trondheim",
    country: "Norway",
    flag: "NO",
    image:
      "https://images.unsplash.com/photo-1639687809372-fe6e87e05fe4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG5pZGFyb3N8ZW58MHx8MHx8fDA%3D"
  },
  {
    name: "London",
    country: "United Kingdom",
    flag: "GB",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    name: "Riga",
    country: "Latvia",
    flag: "LV",
    image:
      "https://images.unsplash.com/photo-1522054541898-adc6abd570e5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

const PopularDestinations = () => {
  return (
    <div className="container max-w-screen-xl mx-auto my-20 px-10 ">
      <div className="relative">
        <H2 className="text-2xl font-bold mb-6">Popular Destinations</H2>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
          {popularDestinations.map((destination, index) => (
            <Link
              to={`/venues?search=${destination.name}`}
              key={destination.name}
              className={`relative group ${
                index < 2
                  ? "col-span-2 xs:col-span-1 sm:col-span-3"
                  : "col-span-2 xs:col-span-1 sm:col-span-2"
              }`}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-52 object-cover rounded-lg shadow-md group-hover:opacity-80 transition-opacity duration-300"
              />
              <div className="absolute top-3 left-3 text-white font-bold text-lg bg-black bg-opacity-50 px-2 py-1 rounded-md">
                {destination.name}{" "}
                <small className="text-xs font-normal">
                  {destination.flag}
                </small>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularDestinations;
