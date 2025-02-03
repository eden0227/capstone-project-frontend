import MainSection from "../components/MainSection";
import FooterSection from "../components/FooterSection";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../features/bookings/bookingsSlice";

export default function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const images = useSelector(store => store.bookings.images);
    const mainImageURL = images.length > 0 ? images[1].imageUrl : null;
    
    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);
    
    const navigatePage = (page) => {
        navigate(`/${page}`);
    };

    return (
        <>
            <MainSection mainImage={mainImageURL}>
                <div className="d-flex flex-column justify-content-center align-items-center homepage-custom-text">
                    <p className="homepage-custom-title" style={{ fontFamily: "Michroma, cursive" }}>Style & Substance</p>
                    <p className="homepage-custom-subheading" style={{ fontFamily: "Genos, cursive" }}>Defining Your Identity with Unmatched Skill and Vision</p>
                    <br />
                    <div className="d-flex">
                        <Button variant="light" className="me-3 p-2" style={{ fontFamily: "Genos, cursive", width: "150px" }} onClick={() => navigatePage("Gallery")}>View Gallery</Button>
                        <Button variant="light" className="p-2" style={{ fontFamily: "Genos, cursive", width: "150px" }} onClick={() => navigatePage("Services")}>Book Reservation</Button>
                    </div>
                </div>
            </MainSection>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100 homepage-custom-info">
                <p>BUSINESS HOUR</p>
                <p>11 AM - 9 PM</p>
                <p style={{ fontFamily: "Genos, cursive", fontSize: "23px" }}>77 Upper District, Morro Bay</p>
                <Button variant="dark" style={{ fontFamily: "Genos, cursive", fontSize: "23px" }} onClick={() => navigatePage("Services")}>Book Reservation</Button>
            </div>
            <FooterSection />
        </>
    );
}
