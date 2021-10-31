import React, { Component } from "react";
import axios from "axios";

class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventorylist: [],
      modelTitle: "",
      Name: "",
      Description: "",
      Price: "",
      InventoryID: 0,
    };
  }
  refreshList() {
    axios({
      method: "GET",
      dataType: "json",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      withCredentials: false,
      crossorigin: true,
      url: "http://localhost:44326/api/Inventory/Get",
    }).then((response) => {
      this.setState({ inventorylist: response.data });
    });
  }
  componentDidMount() {
    this.refreshList();
  }

  changeDescription = (e) => {
    this.setState({ Description: e.target.value }, () => {
      //callback
      console.log(this.state.Description);
    });
  };
  changeName = (e) => {
    this.setState({ Name: e.target.value }, () => {
      console.log(this.state.Name);
    });
  };
  changePrice = (e) => {
    this.setState({ Price: e.target.value }, () => {
      console.log(this.state.Name);
    });
  };
  addClick() {
    this.setState({
      modelTitle: "Add Inventory",
      InventoryID: 0,
      Name: "",
      Description: "",
      Price: "",
    });
    this.setState({ message: "" });
  }
  editClick(dep) {
    this.setState({
      modelTitle: "Edit Inventory",
      InventoryID: dep.inventoryId,
      Name: dep.name,
      Description: dep.description,
      Price: dep.price,
    });
    this.setState({ message: "" });
  }
  deleteClick(dep) {
    const confirmBox = window.confirm(
      "Do you really want to delete this record?"
    );
    if (confirmBox === true) {
      axios({
        method: "POST",
        dataType: "json",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        withCredentials: false,
        crossorigin: true,
        url: "http://localhost:44326/api/Inventory/DeleteByID",
        data: JSON.stringify({
          InventoryID: dep.inventoryId,
          Name: dep.name,
          Description: dep.description,
          Price: dep.price,
        }),
      }).then((response) => {
        console.log(response.data);
        this.setState({ message: response.data.message });
        this.refreshList();
      });
    }
  }
  CreateUpdateClick() {
    axios({
      method: "POST",
      dataType: "json",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      withCredentials: false,
      crossorigin: true,
      url: "http://localhost:44326/api/Inventory/InsertUpdateInventory",
      data: JSON.stringify({
        InventoryID: this.state.InventoryID,
        Name: this.state.Name,
        Description: this.state.Description,
        Price: this.state.Price,
      }),
    }).then((response) => {
      console.log(response.data);
      this.setState({ message: response.data.message });
      this.refreshList();
    });
  }
  render() {
    const {
      inventorylist,
      modelTitle,
      Name = this.state.Name,
      Description,
      Price,
      InventoryID,
    } = this.state;
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#editModal"
          onClick={() => this.addClick()}
        >
          Add Inventory
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            {inventorylist.map((inv) => (
              <tr key={inv.inventoryId}>
                <td>{inv.name}</td>
                <td>{inv.description}</td>
                <td>{inv.price}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    onClick={() => this.editClick(inv)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(inv)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-hidden="true"
          style={{
            width: "50%",
            border: "3px solid black",
            height: "70%",
            backgroundColor: "white",
          }}
        >
          <div className="modal-dialog modal-lg model-dialog-left">
            <div
              className="modal-content"
              style={{ backgroundColor: "#0d6efd" }}
            >
              <div className="modal-header">
                <h5 className="model-title">{modelTitle} </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>

          <div className="modal-body" style={{ width: "50%" }}>
            <div>
              {" "}
              <p>{this.state.message}</p>{" "}
            </div>
            <div className="input-group mb-4">
              <span className="input-group-text">Name</span>
              <input
                className="form-control"
                type="text"
                value={Name}
                onChange={this.changeName}
              />
            </div>
            <div className="input-group mb-4">
              <span className="input-group-text">Description</span>
              <input
                className="form-control"
                type="text"
                value={Description}
                onChange={this.changeDescription}
              />
            </div>
            <div className="input-group mb-4">
              <span className="input-group-text">Price</span>
              <input
                className="form-control"
                type="text"
                value={Price}
                onChange={this.changePrice}
              />
            </div>
            <div>
              <tr>
                <td>
                  {InventoryID == 0 ? (
                    <button
                      type="button"
                      onClick={() => this.CreateUpdateClick()}
                      className="btn btn-primary float-start"
                    >
                      Create
                    </button>
                  ) : null}

                  {InventoryID != 0 ? (
                    <button
                      type="button"
                      onClick={() => this.CreateUpdateClick()}
                      className="btn btn-primary float-start"
                    >
                      Update
                    </button>
                  ) : null}
                </td>

                <td>
                  <button
                    type="button"
                    style={{ marginLeft: "10px" }}
                    className="btn btn-primary float-start"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                    Close
                  </button>
                </td>
              </tr>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Inventory;
