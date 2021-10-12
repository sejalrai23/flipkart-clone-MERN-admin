import React, { useState, useEffect } from 'react';
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createPage } from "../../actions/page-action";

function Page() {
  const dispatch = useDispatch();
  const category = useSelector(state =>
    state.category);
  const [show, setShow] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [bannerImages, setBannerImages] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const page = useSelector(state =>
    state.page);

  useEffect(() => {
    setCategories(optionCategories(category.categories));
  }, [category]);

  useEffect(() => {
    console.log(page);
  }, [page])




  // console.log(categories);

  const handleClose = () => {
    setShow(false);
  }

  const handleShow = () => {
    setShow(true);
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

  const handleBannerImages = (e) => {
    setBannerImages([...bannerImages, e.target.files[0]])
    console.log(e);
  }

  const handleProductImages = (e) => {
    setProductImages([...productImages, e.target.files[0]])
    console.log(e);
  }

  const onCategoryChange = (e) => {
    console.log(e.target.value);
    console.log("cats", categories);
    categories.filter(c => c.value === e.target.value).map(c => setType(c.type));
    setCategoryId(e.target.value);
    // console.log("selectedcat", cat);
    // setType(cat.type);
  }

  const submitPage = (e) => {
    e.preventDefault();

    if (title === "") {
      alert("title is required");
      setShow(false);
      return;
    }
    const form = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    bannerImages.forEach((ban, index) => {
      form.append('banners', ban);
    })
    productImages.forEach((pro, index) => {
      form.append('products', pro);
    });
    dispatch(createPage(form));
    setShow(false);

  }


  return (
    <div>
      <Layout sidebar>
        <Button onClick={handleShow}>OPEN</Button>
      </Layout>
      <Modal show={show} centered >
        <Modal.Header >
          <Modal.Title> CREATE NEW PAGE</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Select aria-label="Default select example" className="mb-3" value={categoryId} onChange={onCategoryChange} >
            <option>select category</option>
            {
              categories.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
            }
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Control type="text" name="pagetitle" placeholder="Page Tilte" onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control type="text" name="description" placeholder="Add Description" onChange={(e) => setDesc(e.target.value)} />
          </Form.Group>

          <Row>
            {
              bannerImages.length > 0 ?
                bannerImages.map((ban, index) =>
                  <Row key={index}>
                    <Col>{ban.name}</Col>
                  </Row>
                ) : null
            }
          </Row>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" name="banners" onChange={handleBannerImages} />
          </Form.Group>

          <Row>
            {
              productImages.length > 0 ?
                productImages.map((pro, index) =>
                  <Row key={index}>
                    <Col>{pro.name}</Col>
                  </Row>
                ) : null
            }
          </Row>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" name="products" onChange={handleProductImages} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={submitPage}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </div>
  )
}

export default Page;
