import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout';
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory, addCategory, updateCategory, deleteCategoryAction } from "../../actions/category-action";
import CheckboxTree from "react-checkbox-tree";
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowDown, IoIosArrowForward, IoIosCloseCircleOutline, IoIosApps } from "react-icons/io";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import "./style.css";

function Category() {
  const dispatch = useDispatch();
  const category = useSelector(state =>
    state.category

  );
  console.log("state", category);

  // useEffect(() => {
  //   dispatch(getAllCategory());
  // }, [])
  // console.log("xyyyzz", category.categories)
  const [categoryName, setCategoryName] = useState("");
  const [parentID, setParentID] = useState("");
  const [categoryImage, setCategoryImage] = useState();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow(false);
  // console.log("options", category.categories);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose2 = () => setShow1(false);
  const handleShow1 = () => {
    checkedAndExpandedArray();
    setShow1(true);

  }

  const checkedAndExpandedArray = () => {
    const categories = optionCategories(category.categories);
    const checkedArray = [];
    const expandedArray = [];
    checked.length > 0 && checked.forEach((catId, index) => {
      const cat = categories.find((c, _index) => catId == c.value)
      cat && checkedArray.push(cat);
    });
    expanded.length > 0 && expanded.forEach((catId, index) => {
      const cat = categories.find((c, _index) => catId == c.value)
      cat && expandedArray.push(cat);
    });
    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);
    console.log({ categories, checked, expanded, checkedArray, expandedArray });

  }

  const updateCategoriesForm = () => {
    const form = new FormData();

    expandedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    })
    checkedArray.forEach((item, index) => {
      form.append("_id", item.value);
      form.append("name", item.name);
      form.append("parentId", item.parentId ? item.parentId : "");
      form.append("type", item.type);
    });
    dispatch(updateCategory(form))
    // window.location.reload(false);
    // console.log(form);

    setShow1(false);
  }


  const renderCategories = (categories) => {
    // console.log("hey", categories);
    let mycategories = [];
    for (let cat of categories) {
      mycategories.push(
        {
          label: cat.name,
          value: cat._id,
          children: cat.children.length > 0 && renderCategories(cat.children)
        }
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

  const handleUpdateCategory = (key, value, index, type) => {
    if (type == 'checked') {
      const updatedCheckedArray = checkedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
      setCheckedArray(updatedCheckedArray);

    } else if (type == 'expanded') {
      const updatedExpandedArray = expandedArray.map((item, _index) => index == _index ? { ...item, [key]: value } : item)
      setExpandedArray(updatedExpandedArray);

    }
  }


  const deleteNo = () => {
    setShow2(false);

  }

  const deleteCategoryYes = () => {
    const checkedIdArray = checkedArray.map((item, index) => ({ _id: item.value }));
    const expandedIdArray = expandedArray.map((item, index) => ({ _id: item.value }));
    if (checkedIdArray.length > 0) {
      dispatch(deleteCategoryAction(checkedIdArray));
    }
    setShow2(false);


  }
  const deleteCategory = () => {
    checkedAndExpandedArray();
    setShow2(true);
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
            {/* <ul>
              {renderCategories(category.categories)}
            </ul> */}
            <CheckboxTree
              nodes={renderCategories(category.categories)}
              checked={checked}
              expanded={expanded}
              onCheck={checked => setChecked(checked)}
              onExpand={expanded => setExpanded(expanded)}
              icons={{

                check: <IoIosCheckbox />,
                uncheck: <IoIosCheckboxOutline />,
                halfCheck: <IoIosCheckboxOutline />,
                expandClose: <IoIosArrowForward />,
                expandOpen: <IoIosArrowDown />,
                collapseAll: <IoIosCloseCircleOutline />,
                parentClose: <BsEyeSlashFill />,
                parentOpen: <BsEyeFill />,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="danger" onClick={deleteCategory} className="mx-3 my-3">Delete</Button>

            <Button className="mx-3 my-3" onClick={handleShow1}>Update/Edit</Button>
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

      {/* Edit Categories */}
      <Modal show={show1} centered size="lg">
        <Modal.Header >
          <Modal.Title> UPDATE CATEGORY</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h6>Checked</h6>
            </Col>
          </Row>
          {
            checkedArray.length > 0 && checkedArray.map((item, index) =>
              <Row key={index}>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Control value={item.name} placeholder="Enter Category Name" onChange={(e) => handleUpdateCategory('name', e.target.value, index, 'checked')} />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Select aria-label="Default select example" className="mb-3" value={item.parentId} onChange={(e) => handleUpdateCategory('parentId', e.target.value, index, 'checked')}>
                    <option>select category</option>
                    {
                      optionCategories(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Select aria-label="Default select example" className="mb-3" value={item.type} onChange={(e) => handleUpdateCategory('type', e.target.value, index, 'checked')}>
                    <option value="">select Type</option>
                    <option value="Store">Store</option>
                    <option value="Product">Product</option>
                    <option value="Page">Page</option>
                  </Form.Select>
                </Col>
              </Row>)
          }
          <Row>
            <Col>
              <h6>Expanded</h6>
            </Col>
          </Row>
          {
            expandedArray.length > 0 && expandedArray.map((item, index) =>
              <Row key={index}>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Control value={item.name} placeholder="Enter Category Name" onChange={(e) => handleUpdateCategory('name', e.target.value, index, 'expanded')} />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Select aria-label="Default select example" className="mb-3" value={item.parentId} onChange={(e) => handleUpdateCategory('parentId', e.target.value, index, 'expanded')}>
                    <option>select category</option>
                    {
                      optionCategories(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                    }
                  </Form.Select>
                </Col>

                <Col>
                  <Form.Select aria-label="Default select example" className="mb-3" value={item.type} onChange={(e) => handleUpdateCategory('type', e.target.value, index, 'expanded')}>
                    <option value="">select Type</option>
                    <option value="Store">Store</option>
                    <option value="Product">Product</option>
                    <option value="Page">Page</option>
                  </Form.Select>
                </Col>
              </Row>)
          }


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={updateCategoriesForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show2} centered >
        <Modal.Header >
          <Modal.Title> CONFIRM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="text-center"> Are you sure? </h5>
          <h5>Expanded</h5>
          {expandedArray.length > 0 && expandedArray.map((item, index) =>
            <span className="text-center" key={index}>{item.name}</span>
          )}
          <h5>Checked</h5>
          {checkedArray.length > 0 && checkedArray.map((item, index) =>
            <span className="text-center" key={index}>{item.name}</span>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteNo}>
            No
          </Button>
          <Button variant="danger" onClick={deleteCategoryYes} >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>


  )
}

export default Category;
