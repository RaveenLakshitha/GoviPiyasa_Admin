import { Form, Button, Col, Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import "../../App.css";

const InfoCategoryForm = (props) => {

  return (
    <div>

      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>

      <Form className="formstyle">
        <Row>
          <Col>
          <Form.Group controlId="formFName">
            <Form.Label column="sm">Category name</Form.Label>
            <Form.Control className="m-2 w-75" type="text" size="sm" placeholder="Enter here..." />
          </Form.Group>
          </Col>
        </Row>
      
        
        <Button size="sm" className="m-3" variant="success">Submit</Button>
        
      </Form>
      </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
 
export default InfoCategoryForm;