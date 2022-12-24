import React, { useEffect, useRef, useState } from "react";
import { notify } from "../../constants/notify";
import { Row, Col } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { Edit, Add, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { Link } from "react-router-dom";
import { httpClient } from "../../constants/httpClient";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./product.css";

function Viewproduct(props) {
  const [userdata, setuserdata] = useState([]);
  const [ProductData, setProductData] = useState([]);

  const userapi = async () => {
    httpClient.apiCall("", "GET", "products").then((res) => {
      setProductData(res.data.products);
      
    });
  };

  const handleEdit = (e, rowData) => {
    props.history.push("/Dashboard", rowData);
  };

  const handleView = (rowdata) => {
    console.log(rowdata);

    new Swal({
      customClass: "swal-wide",
      html: `
  <img src=${rowdata.thumbnail} alt="image" class="popup_image"/>
  <div class="sub_image_popup">

<img src=${rowdata.images[1]} alt="image" class="subimages"/>
<img src=${rowdata.images[2]} alt="image" class="subimages"/>
<img src=${rowdata.images[3]} alt="image" class="subimages"/>

<div class="subimage>
<img src=${rowdata.thumbnail} alt="image" />
</div>
  </div>
  <h1 class="description">Description</h1>
  
                    <div class="left_side_popup">
<h4 class="popup_title"> <b> Title: </b> <i>${rowdata.title}</i></h4>
<h4 class="popup_title"><b>Brand:</b> <i> ${rowdata.brand}</i></h4>
<h4 class="popup_title"><b>Category:</b> <i>${rowdata.category}</i></h4>
<h4 class="popup_title"><b>Discount:</b> <i>${rowdata.discountPercentage} %</i></h4>
                    </div>
                    <div class="right_side_popup">
                    <h4 class="popup_title"><b>Rating:</b> <i>${rowdata.rating}</i></h4>
                    <h4 class="popup_title"><b>Stock:</b> <i>${rowdata.stock}</i></h4>
                    <h4 class="popup_title"><b>Price:</b> <i>${rowdata.price}</i></h4>
                    
                    </div>
                    



                        `,
    });
  };
  const handleDelete = (e, rowData) => {
    console.log(rowData);
    let id = rowData.id;

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
          .apiCall(" ", "DELETE", `products/${id}`)
          .then((resp) => {
            notify.success(resp.data.message);
            console.log(resp);
            let del_id = resp.data.id;
            let newProduct = ProductData.filter((value) => value.id != del_id);
            setProductData(newProduct);
            // setTimeout(() => {
            //   userapi();
            // });
          })
          .catch((err) => {
            console.log(err.response);
          });
        Swal.fire("Deleted!", "Your Record has been deleted.", "success");
      }
    });
  };

  useEffect(() => {
    
    userapi();
  }, []);
  const tableRef = React.createRef();
  return (
    <div className="details_user">
      <div className="heading_line">
        <h2 className="text04">View Product</h2>
      </div>

      <div className="buttons-line">
        <Link to="../Dashboard">
          <button className="btn-details">Product Detail</button>
        </Link>
        <button className="btn-details" id="btn-selected">
          Product View
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
            title="Product"
            columns={[
              { title: "S.N", render: (rowData) => rowData.tableData.id + 1 },
              {
                title: "Image",
                field: "thumbnail",
                render: (rowData) => (
                  <img
                    src={rowData.thumbnail}
                    style={{
                      width: "58%",
                      height: "50px",
                      borderRadius: "50%",
                    }}
                  />
                ),
              },
              { title: "Title", field: "title" },
              { title: "Brand", field: "brand" },
              { title: "Category", field: "category" },
              // { title: "Description", field: "description" },
              { title: "Discount (%)", field: "discountPercentage" },
              { title: "Price", field: "price" },
              { title: "Rating", field: "rating" },
              { title: "Stock", field: "stock" },
            ]}
            data={ProductData}
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
                tooltip: "Add Product",
                isFreeAction: true,
              },
              {
                icon: () => <i class="fa-sharp fa-solid fa-eye fa-xs"></i>,
                tooltip: "View Product",
                onClick: (e, rowData) => {
                  handleView(rowData);
                },
              },

              {
                icon: Edit,
                tooltip: "Edit Products",
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

export default Viewproduct;
