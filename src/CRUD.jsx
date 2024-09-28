import React, { useEffect, useState } from "react";
import Data from "./data";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const CRUD = () => {

  const [data, setData] = useState(Data);

  
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const[name, setName] = useState('');
  const[age, setAge] = useState('');
  const[isActive, setIsActive] = useState(0);

  const[editId, setEditId] = useState('');
  const[editName, setEditName] = useState('');
  const[editAge, setEditAge] = useState('');
  const[editIsActive, setEditIsActive] = useState(0);



  useEffect(() => {
    getData();
  }, []);
  

  const handleEdit = (id) => {
    handleShow();
    axios.get(`https://localhost:44341/api/Employee/${id}`)
    .then((result) =>{
      setEditName(result.data.name);
      setEditAge(result.data.age);
      setEditIsActive(result.data.isActive);
      setEditId(id);

    }).catch((error) =>{
      console.log(error)
    })
  };


  const handleUpdate = () =>{
    const url = `https://localhost:44341/api/Employee/${editId}`;
    const data = {
      "id" : editId,
      "name": editName,
      "age": editAge,
      "isActive": editIsActive

    }
    axios.put(url, data)
    .then((result) =>{
      handleClose();
      getData();
      clear();
      toast.success('Employee has been updated');
    }).catch((error) =>{
      toast.error(error);
    })


  }


  const getData = () => {
    axios.get('https://localhost:44341/api/Employee')
    .then((result) =>{
      setData(result.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      axios.delete(`https://localhost:44341/api/Employee/${id}`)
        .then((result) => {
          if (result.status === 204) {
            toast.success('Employee has been deleted successfully'); // Success message
            getData(); // Refresh the data on the UI
          }
        })
        .catch((error) => {
          toast.error(error); // Show error message
        });
    }
  };


  const handleActiveChange = (e) =>{
    if(e.target.checked){
      setIsActive(1);
    }
    else{
      setIsActive(0);
    }
  }

  const handleEditActiveChange = (e) =>{
    if(e.target.checked){
      setEditIsActive(1);
    }
    else{
      setEditIsActive(0);
    }
  }
  

  const handleSave = () =>{
    const url ='https://localhost:44341/api/Employee';
    const data = {
      
      "name": name,
      "age": age,
      "isActive": isActive

    }
    axios.post(url, data)
    .then((result) =>{
      getData();
      clear();
      toast.success('Employee has been added');
    }).catch((error) =>{
      toast.error(error);
    })
  }
 
  const clear = () =>{
    setName('');
    setAge('');
    setIsActive('0');
    setEditName('');
    setEditAge('');
    setEditIsActive('0');
    setEditId('');


  }

  


  return (
    <>
      <ToastContainer />
      <Container>
      <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
            <Col>
              <input type="checkbox"
                checked={isActive === 1 ? true : false}
                onChange={(e) => handleActiveChange(e)}
                value={isActive}
               />
              <label>IsActive</label>
            </Col>
            <Col>
              <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
            </Col>
          </Row>
      </Container>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Age</th>
            <th>isActive</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>{" "}
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / update Emplyee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input type="checkbox"
                checked={editIsActive === 1 ? true : false}
                onChange={(e) => handleEditActiveChange(e)}
                value={editIsActive}
               />
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CRUD;
