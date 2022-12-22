import React, { useEffect, useRef, useState } from "react";
import { notify } from "../../constants/notify";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { httpClient } from "../../constants/httpClient";
import Swal from "sweetalert2";
import InsertRecord from "../landingPage/outlayDesign";
import "./user.css"

function Viewuser(props) {
  const [userdata, setuserdata] = useState([]);
  const [time, setTime] = useState(new Date());
  
  const userapi = async () => {
    httpClient.apiCall("", "GET", "products");
  };

  const handleEdit = (e, rowData) => {
    props.history.push("/useredit", rowData);
  };

  const handleDelete = (e, rowData) => {
    console.log(rowData);
    let id = rowData.ID;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        httpClient
          .DELETE(`api-delete/company/${id}`, false, true)
          .then((resp) => {
            notify.success(resp.data.message);
            console.log(resp);
            setTimeout(() => {
              userapi();
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
        Swal.fire("Deleted!", "Your Record has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    console.log(props);
    userapi();
  }, []);
  const tableRef = React.createRef();
  return (
    <div className="details_user">
      
      <div className="heading_line">
        <h2 className="text04">User</h2>
      </div>

      <div className="buttons-line">
        <Link to="../Dashboard">
          <button className="btn-details">User Detail</button>
        </Link>
        <button className="btn-details" id="btn-selected">
          User View
        </button>
      </div>
      <Row className="rows-branch">
        <Col sm={12} className="cols">
          <Typography
            variant="h5"
            color="textSecondary"
            component="h2"
            gutterBottom
            style={{ padding: "20px 0px 10px 0px" }}
          ></Typography>
          <MaterialTable
            tableRef={tableRef}
            options={{
              pageSize: 10,

              search: true,
              actionsColumnIndex: -1,

              headerStyle: {
                backgroundColor: "#25385f",
                color: "#FFF",
                position: "sticky",
                top: "0",
              },
              maxBodyHeight: "400px",
            }}
            title="User"
            columns={[
              { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
              { title: "Name", field: "NAME" },
              { title: "Description", field: "DESCRIPTION" },
              {
                title: "Status",
                field: "STATUS",
                cellStyle: (e, rowData) => {
                  if (rowData.STATUS == "Active") {
                    return { color: "#32CD32" };
                  } else {
                    return { color: "red" };
                  }
                },
              },
            ]}
            data={userdata}
            localization={{
              pagination: {
                previousAriaLabel: "",
                previousTooltip: "",
                nextAriaLabel: "",
                nextTooltip: "",
                firstAriaLabel: "",
                firstTooltip: "",
                lastAriaLabel: "",
                lastTooltip: "",
              },
            }}
            actions={[
              {
                icon: Add,
                tooltip: "Add User",
                isFreeAction: true,
              },
              {
                icon: Edit,
                tooltip: "Edit User",
                onClick: (e, rowData) => {
                  handleEdit(e, rowData);
                },
              },
              {
                icon: Delete,
                tooltip: "Delete Record",
                onClick: (e, rowData) => {
                  handleDelete(e, rowData);
                },
              },
            ]}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Viewuser;