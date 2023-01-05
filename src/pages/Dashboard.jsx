import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import axios from "axios";
import Pagination from "../components/Pagination";

function Dashboard() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [modal, setModal] = useState(false);
  const [clickData, setClickData] = useState();
  const [filterData, setFilterData] = useState("allLaunches");
  const [filterClick, setFilterClick] = useState(false);

  axios.get("https://api.spacexdata.com/v3/launches").then((res) => {
    setData(res.data);
  });

  const lastRowIndex = currentPage * rowsPerPage;
  const firstRowIndex = lastRowIndex - rowsPerPage;

  if (data.length <= 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div class="loader"></div>
      </div>
    );
  }

  const handleClick = (item) => {
    setClickData(item);
    setModal(true);
  };

  const filteredRowData = data.filter((item) => {
    if (filterData == "upcomingLaunches") {
      return item.launch_success == null;
    } else if (filterData == "successfullLaunches") {
      return item.launch_success == true;
    } else if (filterData == "failedLaunches") {
      return item.launch_success == false;
    }
    return true;
  });

  const currentRows = filteredRowData.slice(firstRowIndex, lastRowIndex);

  return (
    <div
      className="main"
      style={{
        position: "relative",
      }}
    >
      {modal && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            height: "500px",
            width: "800px",
            boxShadow: " 0 1px 50px 0 rgba(0, 0, 0, 0.2)",
            padding: "30px 40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "20px",
              }}
            >
              <img
                src={clickData?.links?.mission_patch}
                alt="Description when image is not found"
                width="100"
                height="100"
              />
              <div>
                <h3>{clickData?.mission_name}</h3>
                <p>{clickData?.rocket?.rocket_name}</p>
              </div>
              <div
                style={{
                  margin: "0 20px",
                  background:
                    clickData?.launch_success == true
                      ? "#b2f2bb"
                      : clickData?.launch_success == false
                      ? "#ffc9c9"
                      : clickData?.launch_success == null && "#ffe066",
                  borderRadius: 12,
                  padding: "3px 8px",
                }}
              >
                <p
                  style={{
                    color:
                      clickData?.launch_success == true
                        ? "#2b8a3e"
                        : clickData?.launch_success == false
                        ? "#e03131"
                        : clickData?.launch_success == null && "#e67700",
                  }}
                >
                  {clickData?.launch_success == true
                    ? "Success"
                    : clickData?.launch_success == false
                    ? "Failed"
                    : clickData?.launch_success == null && "Upcoming"}
                </p>
              </div>
            </div>
            <h4
              onClick={() => setModal(false)}
              style={{
                cursor: "pointer",
                padding: "10px",
              }}
            >
              X
            </h4>
          </div>
          <div>
            <p style={{ fontSize: 12 }}>{clickData?.details}</p>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Flight Number
                </p>
                <p>{clickData?.flight_number}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Mission Name
                </p>
                <p>{clickData?.mission_name}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Rocket Type
                </p>
                <p>{clickData?.rocket?.rocket_type}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Rocket Name
                </p>
                <p>{clickData?.rocket?.rocket_name}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Manufacturer
                </p>
                <p>Space X</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Nationality
                </p>
                <p>Space X</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Launch Date
                </p>
                <p>{clickData?.launch_date_utc}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Payload Type
                </p>
                <p>
                  {clickData?.rocket?.second_stage?.payloads[0]?.payload_type}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Orbit
                </p>
                <p>{clickData?.rocket?.second_stage?.payloads[0]?.orbit}</p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <p style={{ width: "140px", fontSize: 16, marginRight: 50 }}>
                  Launch Site
                </p>
                <p>{clickData?.launch_site?.site_name}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="header">
        <h4>SPACEX</h4>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
          position: "relative",
        }}
      >
        <p
          onClick={() => setFilterClick(!filterClick)}
          style={{
            cursor: "pointer",
            fontSize: "15px",
            background: "#fff",
          }}
        >
          All Launches +
        </p>
        {filterClick && (
          <div
            style={{
              background: "#fff",
              padding: "10px 5px",
              position: "absolute",
              top: "18px",
              boxShadow: " 0 1px 20px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => {
                setFilterData("allLaunches");
                setFilterClick(false);
              }}
            >
              ALL LAUNCHES
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => {
                setFilterData("upcomingLaunches");
                setFilterClick(false);
              }}
            >
              UPCOMING LAUNCHES
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => {
                setFilterData("successfullLaunches");
                setFilterClick(false);
              }}
            >
              SUCCESSFULL LAUNCHES
            </p>
            <p
              style={{
                fontSize: 13,
                fontWeight: "500",
                cursor: "pointer",
                marginTop: "5px",
              }}
              onClick={() => {
                setFilterData("failedLaunches");
                setFilterClick(false);
              }}
            >
              FAILED LAUNCHES
            </p>
          </div>
        )}
      </div>
      <div className="card">
        <div className="card-header">
          <div className="flexOne">
            <p>No:</p>
          </div>
          <div className="flexOne" style={{ flex: 1.5 }}>
            <p>Launched(UTC)</p>
          </div>
          <div className="flexOne">
            <p>Location</p>
          </div>
          <div className="flexOne">
            <p>Mission</p>
          </div>
          <div className="flexOne">
            <p>Orbit</p>
          </div>
          <div className="flexOne">
            <p>Launch Status</p>
          </div>
          <div className="flexOne">
            <p>Rocket</p>
          </div>
        </div>
        <div className="card-body">
          {currentRows.map((item, index) => {
            return (
              <CardRow
                key={index}
                fun={() => handleClick(item)}
                item={item}
                flight_number={item.flight_number}
                launch_date={item.launch_date_utc}
                site_name={item.launch_site.site_name}
                orbit={item.rocket.second_stage.payloads}
                mission_name={item.mission_name}
                launch_success={item.launch_success}
                rocket_name={item.rocket.rocket_name}
              />
            );
          })}
        </div>
      </div>
      <Pagination
        totalRows={data.length}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
      />
    </div>
  );
}

const CardRow = ({
  flight_number,
  launch_date,
  site_name,
  mission_name,
  launch_success,
  orbit,
  rocket_name,
  fun,
}) => {
  return (
    <div onClick={fun} className="card-row">
      <div className="flexOne">
        <p>{flight_number}</p>
      </div>
      <div className="flexOne" style={{ flex: 1.5 }}>
        <p>{launch_date}</p>
      </div>
      <div className="flexOne">
        <p>{site_name}</p>
      </div>
      <div className="flexOne">
        <p>{mission_name}</p>
      </div>
      <div className="flexOne">
        <p>{orbit[0].orbit}</p>
      </div>
      <div className="flexOne">
        <div
          style={{
            margin: "0 20px",
            background:
              launch_success == true
                ? "#b2f2bb"
                : launch_success == false
                ? "#ffc9c9"
                : launch_success == null && "#ffe066",
            borderRadius: 12,
            padding: "6px 5px",
          }}
        >
          <p
            style={{
              color:
                launch_success == true
                  ? "#2b8a3e"
                  : launch_success == false
                  ? "#e03131"
                  : launch_success == null && "#e67700",
            }}
          >
            {launch_success == true
              ? "Success"
              : launch_success == false
              ? "Failed"
              : launch_success == null && "Upcoming"}
          </p>
        </div>
      </div>
      <div className="flexOne">
        <p>{rocket_name}</p>
      </div>
    </div>
  );
};

export default Dashboard;
