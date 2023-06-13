import { useEffect, useRef, useState } from "react";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [asc, setAsc] = useState(true);
  const searchRef = useRef(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      `http://localhost:5000/services?search=${search}&sort=${
        asc ? "asc" : "desc"
      }`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [asc, search]);

  const handleSearch = () => {
    console.log(searchRef.current.value);
    setSearch(searchRef.current.value);
  };

  return (
    <div className="mt-4">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-orange-600">Our Services</h3>
        <h2 className="text-5xl font-bold">Our Service Area</h2>
        <p>
          the majority have suffered alteration in some form, by injected
          humour, or randomised <br /> words which do not look even slightly
          believable.{" "}
        </p>

        <div className="join m-16">
          <div>
            <div>
              <input
                type="text"
                ref={searchRef}
                className="input input-bordered join-item"
                placeholder="Search..."
              />
            </div>
          </div>
          <div className="indicator">
            {/* <span className="indicator-item badge badge-secondary">new</span> */}
            <button onClick={handleSearch} className="btn join-item">
              Search
            </button>
          </div>
        </div>

        <button className="btn btn-primary" onClick={() => setAsc(!asc)}>
          {asc ? "Price: High to Low" : "Price: Low to High"}
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
