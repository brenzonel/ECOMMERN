import React, {useState} from "react";
import Layout from "./../components/Layout/Layout";
import { useAuth } from "../context/auth";
import axios from "axios";

const HomePage = () => {
  const [auth, setAuth] = useAuth();
  const [location, setLocation] = useState();

  const handleLocation = async () => {
    try {
      const res = await axios.get("http://localhost:5000/map");
      setLocation(res.data);
      console.log(location)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <h1>HomePage</h1>
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <div>
        <button className="location" onClick={ () => handleLocation()} >Set Location</button>
        {location ?
          <a class="btn btn-primary" href={location} role="button">Location</a>
        : <a></a>
        }
      </div>
    </Layout>
  );
};

export default HomePage;