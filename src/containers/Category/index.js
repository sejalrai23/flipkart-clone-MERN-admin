import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory } from "../../actions/category-action";

function Category() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const category = useSelector(state =>
    state.category
    // console.log("xyyyzz", state.category.categories)
  );
  const [categoryName, setCategoryName] = useState("");
  const [parentID, setParentID] = useState("");
  const [categoryImage, setCategoryImage] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow(false);
  // console.log("options", category.categories);


  const renderCategories = (categories) => {
    // console.log("hey", categories);
    let mycategories = [];
    for (let cat of categories) {
      mycategories.push(
        <li key={cat.name}>
          {cat.name}
          {cat.children.length > 0 ?
            <ul>{renderCategories(cat.children)}</ul>
            : null}
        </li>
      )
    }
    return mycategories;

  };

  const optionCategories = (categories, options = []) => {
    for (let cat of categories) {
      options.push({
        value: cat._id,
        name: cat.name,
        parentId: cat.parentId,
        type: cat.type
      });
      if (cat.children.length > 0) {
        optionCategories(cat.children, options)
      }
    }
    return options;

  }


  const fileHandler = (event) => {
    setCategoryImage(event.target.files[0]);

  }

  const handleClose = (e) => {
    const form = new FormData();

    form.append('name', categoryName);
    form.append('parentId', parentID);
    form.append('categoryImage', categoryImage);

    dispatch(addCategory(form));
    setCategoryName("");
    setCategoryImage("");
    setParentID("");
    // window.location.reload(false);
    setShow(false);

  }




  return (

    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Category</h3>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>
              {renderCategories(category.categories)}
            </ul>
          </Col>
        </Row>

      </Container>
      <Modal show={show} centered >
        <Modal.Header >
          <Modal.Title> ADD NEW CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Enter Category Name" onChange={(e) => setCategoryName(e.target.value)} />
          </Form.Group>

          <Form.Select aria-label="Default select example" className="mb-3" value={parentID} onChange={(e) => setParentID(e.target.value)}>
            <option>select category</option>
            {
              optionCategories(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </Form.Select>


          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={fileHandler} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>


  )
}

export default Category;
