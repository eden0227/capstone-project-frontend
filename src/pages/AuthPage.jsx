import { Row, Col, Button, Image, Form } from "react-bootstrap";
import { useState, useEffect, useContext } from 'react';
import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages, fetchGallery } from "../features/bookings/bookingsSlice";

export default function AuthPage() {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
    };

    const dispatch = useDispatch();
    const images = useSelector(store => store.bookings.images);
    const authImageURL = images.length > 0 ? images[0].imageUrl : null;
    
    useEffect(() => {
        dispatch(fetchImages());
        dispatch(fetchGallery());
    }, [dispatch]);

    // Firebase Authentication
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            console.log(res.user);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {
        if(currentUser) {
            navigate("/home");
        }
    }, [currentUser, navigate]);

    return (
        <>
            <Row>
                <Col md={7} className="d-none d-md-block">
                    <Image
                        src={authImageURL}
                        fluid
                        className={`w-100 h-100 object-fit-cover ${!imageLoaded ? 'authpage-custom-img' : ''}`}
                        onLoad={handleImageLoad}
                    />
                </Col>
                <Col xs={12} md={5} className="d-flex flex-column justify-content-center align-items-center vh-100">
                    <p className="custom-logo" style={{ fontFamily: "Iceberg, cursive", fontSize: "56px" }}>silverhand</p>
                    <p className="fs-5 mb-5" style={{ fontFamily: "Michroma, cursive", marginTop: "-1.5rem" }}>Your Style, Our Craft</p>            
                    <Form 
                        className="d-flex flex-column align-items-center"
                        style={{ width: "50%" }}
                        onSubmit={isLogin ? handleLogin : handleSignUp}
                    >
                        <Form.Group className="mb-4 w-100 authpage-custom-p">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="authpage-custom-input"
                                style={{ width: "100%" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5 w-100">
                            <input
                                type="password"
                                placeholder="Password"
                                className="authpage-custom-input authpage-custom-p"
                                style={{ width: "100%" }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button 
                            type="submit"
                            className="w-100 mb-4 authpage-custom-p"
                            style={{ backgroundColor: "var(--charcoal)", borderRadius: 0 }}
                        >
                            {isLogin ? "Login" : "Sign Up"}
                        </Button>
                    </Form>
                    <div className="d-flex justify-content-center gap-1 authpage-custom-p">
                        {isLogin ? "Don't Have An Account?" : "Already Have An Account?"}
                        <button onClick={toggleMode} style={{ background: "none", border: "none", color: "blue", cursor: "pointer" }}>
                            {isLogin ? "Sign up" : "Login"}
                        </button>
                    </div>
                </Col>
            </Row>
        </>
    );
}
