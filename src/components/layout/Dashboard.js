// This is the basic functional component
import React from "react";
import Clients from "../clients/Clients";
import Sidebar from "../layout/Sidebar";

const Dashboard = () => {
  return (
    <div className="row">
      {/* 10 column div */}
      <div className="col-md-10">
        <Clients />
      </div>
      {/* 2 column div */}
      <div className="col-md-2">
        <Sidebar />
      </div>
    </div>
  );
};

export default Dashboard;
