import React from "react";

// store imports
import { useDispatch, useSelector } from "react-redux";
import { bulkInsert } from "../../../store/users/admin/UsersAdminThunk";

export default function UploadCsvButton() {
  // store
  const dispatch = useDispatch();
  const insertionStatus = useSelector(
    (state) => state.usersAdmin.bulkInsertStatus
  );

  // local vars
  const csv =
    "ITS_ID,HOF_ID,First_Prefix,First_Name,Surname,TanzeemFile_No,Sector,Sub_Sector,Building,Gender,Age,Jamaat,Mobile,Email";
  const blob = new Blob([csv], { type: "text/csv" });
  const sampleCsvUrl = window.webkitURL.createObjectURL(blob);
  const sampleFileName = "users_import_sample.csv";

  function uploadCsvFile(e) {
    const reader = new FileReader();

    reader.onload = (e) => {
      let users = processCSV(e.target.result);
      users = prepareUsersForBulkInserApi(users);
      dispatch(bulkInsert(users));
    };

    reader.readAsText(e);
  }

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    return newArray;
  };

  function prepareUsersForBulkInserApi(users) {
    return users.map((user) => {
      const usr = {
        itsNumber: user.ITS_ID,
        hofItsNumber: user.HOF_ID,
        namePrefix: user.First_Prefix,
        firstName: user.First_Name,
        lastName: user.Surname,
        tanzeemFileNumber: user.TanzeemFile_No,
        sector: user.Sector,
        subSector: user.Sub_Sector,
        building: user.Building,
        gender: user.Gender,
        age: user.Age,
        jamaat: user.Jamaat,
      };

      if (user.Password && user.Password.length) usr.password = user.Password;

      if (user.Mobile && `+${user.Mobile}`.match(/^\+91\d{10}$/))
        usr.mobileNumber = `+${user.Mobile}`;

      if (
        user.Email &&
        user.Email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
      ) {
        usr.email = user.Email;
      }

      return usr;
    });
  }

  function renderUploadButton() {
    if (insertionStatus === "loading") {
      return (
        <label
          className="btn btn-sm btn-secondary"
          style={{ cursor: "progress" }}
        >
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Importing...</span>
          </div>
          &nbsp;&nbsp;Importing...
        </label>
      );
    } else {
      return (
        <>
          <label
            htmlFor="csvUpload"
            className="btn btn-sm btn-secondary"
            style={{ cursor: "pointer" }}
          >
            <i className="fa fa-file-csv"></i>&nbsp;&nbsp; Import CSV
          </label>
          <input
            type="file"
            accept=".csv"
            id="csvUpload"
            onChange={(e) => {
              uploadCsvFile(e.target.files[0]);
            }}
            style={{ display: "none" }}
          />
        </>
      );
    }
  }

  return (
    <>
      {renderUploadButton()}
      <a
        href={sampleCsvUrl}
        download={sampleFileName}
        data-toggle="tooltip"
        title="Download Sample CSV"
      >
        <small>Sample CSV</small>
      </a>
    </>
  );
}
