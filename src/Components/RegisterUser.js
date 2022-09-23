import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../CSS/Register.css";

function BasicExample() {
  return (
    <Form>
      <Form.Group className="mb-2 email-reg" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 password-reg" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="secondary" type="submit" id="submit-reg">
        Submit
      </Button>
    </Form>
  );
}

export default BasicExample;
