import "./posterProfile.css";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function PosterProfile() {
  //related to updating the user via dispatch
  //const { user, dispatch } = useContext(AuthContext);
  const [poster, setPoster] = useState();

  //useParams
  const params = useParams();

  //runs twice due to strict mode
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users/${params.id}`, { timeout: 10000 });
        console.log(res.data[0].name);
        return res.data[0];
      } catch (err) {
        return err;
      }
    };
    fetchUser()
      .then((result) => {
        setPoster(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {poster ? (
        <>
          <Topbar />

          <div className="profilePage">
            <div className="profileContentBox">
              <img
                className="profileImg"
                src="../assets/default_pfp.jpeg"
                alt=""
              />
              <h4 className="profileName">{poster.name}</h4>

              <div className="bioInfoBox" id="bio" disabled="disabled">
                {poster.bioDescription}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
