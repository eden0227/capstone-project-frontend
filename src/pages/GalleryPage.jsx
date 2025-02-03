import MainSection from "../components/MainSection";
import FooterSection from "../components/FooterSection";
import { Row, Col, Image, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchGallery } from "../features/bookings/bookingsSlice";

export default function GalleryPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const gallery = useSelector(store => store.bookings.gallery);

    useEffect(() => {
        dispatch(fetchGallery());
    }, [dispatch]);

    const navigatePage = (page) => {
        navigate(`/${page}`);
    };
    
    return (
        <>
            <MainSection>
                <div className="pb-5 d-flex flex-column justify-content-center align-items-center">
                    <p className="mt-5 text-center" style={{ fontFamily: "Michroma, cursive", fontSize: "2rem" }}>Gallery - Neokitsch</p>
                    <Row className="m-1 p-5">
                        {gallery.map((image) => (
                            <Col key={image.fileName} xs={6} md={3} className="mb-lg-5 mb-4 d-flex justify-content-center align-items-center">
                                <Image 
                                        src={image.imageUrl}
                                    style=
                                    {{ 
                                        width: "100%",
                                        maxWidth: "277px",
                                        height: "auto"
                                    }} 
                                    alt={`Gallery Image: ${image.fileName}`}
                                />
                            </Col>
                        ))}
                    </Row>
                    <Button variant="dark" className="mb-5" style={{ fontFamily: "Genos, cursive", fontSize: "1.3rem" }} onClick={() => navigatePage("services")}>Book Reservation</Button>
                </div>
                <FooterSection />
            </MainSection>
        </>
    );
}
