import {useSelector, useDispatch} from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {logout} from "../store/AuthSlice";
import {Badge, Button, Row} from "react-bootstrap";

function Header(){
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <nav style={{width:'100%'}}>
            <Link to="/" style={{textDecoration: 'none'}}>
                <h1 >Todo App</h1>
            </Link>
            {isAuthenticated ? (
                <div>
                    <Row>
                        <div className="col-10">
                            <span>Hoşgeldin, {user.email}! </span>
                            <Link to="/dashboard">
                                <Badge bg="primary">Dashboard</Badge>
                            </Link>
                        </div>
                        <div className="col-2">
                            <Button variant="danger" className="form-control btn-danger" onClick={() => {dispatch(logout())}}>Çıkış Yap</Button>
                        </div>

                    </Row>

                    <hr/>

                </div>
            ) : (
                <Link to="/login">Login</Link>
            )}

        </nav>
    )
}
export default Header;