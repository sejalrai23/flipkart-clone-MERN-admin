import React, { useState, useEffect } from 'react'
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal, Form, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addProducts } from "../../actions/product-action";
import "./style.css";
import { generateUrl } from "../../url";

function Products() {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow1(false);
  const [productDetails, setProductDetails] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [productPics, setProductPics] = useState([]);
  const categoryList = useSelector(state => state.category);
  const dispatch = useDispatch();
  const product = useSelector(state => state.product)

  const handleClose1 = () => {
    const form = new FormData;
    form.append('name', name);
    form.append('quantity', quantity);
    form.append('price', price);
    form.append('description', desc);
    form.append('category', category);
    for (let pic of productPics) {
      console.log(pic);
      form.append('productPic', pic);
    }
    console.log(form);
    dispatch(addProducts(form));

    setShow(false);
  }

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
    setProductPics([...productPics, event.target.files[0]]);
    console.log(productPics);

  }

  const renderProducts = () => {
    return (
      <Table responsive="md" striped hover >
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Pictures</th>
          </tr>
        </thead>
        <tbody>
          {
            product.products.length > 0 ?
              product.products.map((pro, index) =>
                <tr className="row1" key={index} onClick={() => showProductModal(pro)}>
                  <td>{pro.name}</td>
                  <td>{pro.category.name}</td>
                  <td>{pro.price}</td>
                  <td>{pro.quantity}</td>
                  <td>Table cell</td>
                </tr>) : null
          }


        </tbody>
      </Table>
    );

  }

  const showProductModal = (pro) => {

    setProductDetails(pro);
    setShow1(true);
    console.log(pro);

  }

  const renderShowProducts = () => {

    if (!productDetails) {
      return null;
    }
    return (
      <Modal show={show1} centered size="lg" >
        <Modal.Header >
          <Modal.Title> PRODUCT DETAILS</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md="6">
              <label className="key">Name</label>
              <p className="value">{productDetails.name}</p>
            </Col>
            <Col md="6">
              <label className="key">Price</label>
              <p className="value">{productDetails.price}</p>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <label className="key">Quantity</label>
              <p className="value">{productDetails.quantity}</p>
            </Col>
            <Col md="6">
              <label className="key">Catgeory</label>
              <p className="value">{productDetails.category.name}</p>
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <label className="key">Description</label>
              <p className="value">{productDetails.description}</p>
            </Col>
          </Row>
          <Row>
            <Col >
              <label className="key">Product Pictures</label>
              <div style={{ display: 'flex' }}>
                {productDetails.productPics.map(img =>
                  <div className="productImage">
                    <img src={generateUrl(img.img)} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose2}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    );
  }

  return (

    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Products</h3>
              <Button variant="primary" onClick={handleShow}>
                Add
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            {renderProducts()}
          </Col>
        </Row>

      </Container>
      <Modal show={show} centered >
        <Modal.Header >
          <Modal.Title> ADD NEW PRODUCT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="number" placeholder="Enter Quantity" onChange={(e) => setQuantity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="number" placeholder="Enter Price" onChange={(e) => setPrice(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)} />
          </Form.Group>

          <Form.Select className="mb-3 form-control" value={category} onChange={(e) => {
            setCategory(e.target.value)
            console.log(e.target.value)
          }
          }>
            <option>select category</option>
            {
              optionCategories(categoryList.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </Form.Select>

          {productPics.length > 0 ? productPics.map((pic, index) => <div>{pic.name}</div>) : null}

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={fileHandler} />
          </Form.Group>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {renderShowProducts()}
    </Layout>


  )
}

export default Products;
