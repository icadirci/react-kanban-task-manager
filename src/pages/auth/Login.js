import {useDispatch, useSelector} from "react-redux";
import {login} from "../../store/AuthSlice";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Button, Row, Col} from "react-bootstrap";

function Login() {

    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const user = {
            email: e.target.username.value
        };
        localStorage.setItem("user", JSON.stringify(user));

        dispatch(login({user: user, token: user.token}));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    return (
        <Row className="justify-content-center" style={{minHeight: '100vh', alignItems: 'center'}}>
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                <div style={{
                    padding: '15px 20px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <h2>Giriş Yap</h2>
                    <hr/>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter username"
                                name="username"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                name="password"
                                required
                            />
                        </Form.Group>

                        <Form.Group style={{marginTop: '10px'}}>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form.Group>
                    </Form>
                </div>
            </Col>
        </Row>
    );
}

export default Login;
