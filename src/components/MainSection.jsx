import { Navbar, Nav } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch } from "react-redux";
import { clearReservation } from "../features/bookings/bookingsSlice";

export default function MainSection({ children, mainImage }) {
    const auth = getAuth();
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currentUser) {
            dispatch(clearReservation());
            navigate("/");
        }
    }, [currentUser, navigate]);
    
    const handleLogout = () => {
        auth.signOut();
    };

    const navigatePage = (page) => {
        navigate(`/${page}`);
    };
    
    const backgroundImage = mainImage
        ? { 
            background: `url(${mainImage})`,
            backgroundSize: 'cover',
            height: '100%',
            minHeight: '100vh',
            width: '100%',
            overflow: 'hidden',
            position: 'relative'
        }
        : {
            position: 'relative',
            minHeight: 'auto',
            height: 'auto',
            width: '100%'
        };

    return (
        <>
            <div style={backgroundImage}>
                <Navbar className="p-3 ps-5 pe-5 d-flex align-items-center justify-content-between homepage-custom-nav-content" expand="md" variant="dark">
                    <Navbar.Brand className="me-auto">
                        <button className="homepage-custom-brand homepage-custom-button" style={{ fontSize: "2.5rem" }} onClick={() => navigatePage("home")}>silverhand</button>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarNav" />
                    <Navbar.Collapse id="navbarNav">
                        <Nav>
                            <Nav.Link className="ms-3 pt-3 homepage-custom-nav" style={{ fontFamily: "Genos" }}>
                                <button className="homepage-custom-button" onClick={() => navigatePage("aboutus")}>About Us</button>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className="ms-3 pt-3 homepage-custom-nav" style={{ fontFamily: "Genos" }}>
                                <button className="homepage-custom-button" onClick={() => navigatePage("gallery")}>Gallery</button>
                            </Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link className="ms-3 pt-3 homepage-custom-nav" style={{ fontFamily: "Genos" }}>
                                <button className="homepage-custom-button" onClick={() => navigatePage("services")}>Services</button>
                            </Nav.Link>
                        </Nav>
                        <Nav className="ms-auto">
                            <Nav.Link>
                                <button className="ms-3 mt-2 homepage-custom-button" style={{ fontFamily: "Genos" }} onClick={handleLogout}>Logout</button>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                {mainImage ? (
                children
                ) : (
                    <div
                        style={{
                            position: "absolute",
                            top: "100px",
                            width: "100%"
                        }}
                    >
                        {children}
                    </div>
                )}
            </div>
        </>
    );
}
