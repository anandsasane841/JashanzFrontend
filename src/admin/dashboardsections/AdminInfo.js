import React from "react";

const AdminInfo = ({ adminInfo }) => {
  return (
    <div>
      <p className="fs-3">Admin Information</p>
      <div className="text-center">
        <div className="btn ml-auto">
          <i className="fas fa-user-circle fa-5x"></i>{" "}
          {/* Increase icon size */}
        </div>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-md-3">
            <h5>Firm Name</h5>
          </div>
          <div className="col-md-9 text-secondary">{adminInfo.firmName}</div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h5>Specialization</h5>
          </div>
          <div className="col-md-9 text-secondary">
            {adminInfo.specialization}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h5>Mobile Number</h5>
          </div>
          <div className="col-md-9 text-secondary">
            {adminInfo.mobileNumber}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h5>Alternate Mobile Number</h5>
          </div>
          <div className="col-md-9 text-secondary">
            {adminInfo.alternateMobileNumber}
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            <h5>Email</h5>
          </div>
          <div className="col-md-9 text-secondary">{adminInfo.email}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminInfo;
