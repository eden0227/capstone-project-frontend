import MainSection from "../components/MainSection";
import FooterSection from "../components/FooterSection";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchImages } from "../features/bookings/bookingsSlice";

export default function AboutUsPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const images = useSelector(store => store.bookings.images);
    const aboutUsImageURL = images.length > 0 ? images[2].imageUrl : null;
    
    useEffect(() => {
        dispatch(fetchImages());
    }, [dispatch]);
    
    const navigatePage = (page) => {
        navigate(`/${page}`);
    };
    
    return (
        <>
            <MainSection>
            <div className="d-flex flex-column justify-content-center align-items-center text-center aboutuspage-custom-info">
                <p className="mb-5" style={{ fontFamily: "Michroma, cursive", fontSize: "23px" }}>Welcome to Silverhand Barbershop</p>
                <Image className="mb-2" style={{ height: "35vh", objectFit: "contain" }} src={aboutUsImageURL}></Image>
                <p className="mb-5" style={{ fontFamily: "Iceberg, cursive" }}>Vincent, Founder</p>
                <p className="mb-4 aboutuspage-custom-text">At Silverhand Barbershop, we believe a great haircut is more than just a style—it's a statement. Located in the heart of the community, we combine tradition with modern trends to create a barbershop experience unlike any other.</p>
                <p className="mb-4 aboutuspage-custom-text">Our barbers are not only skilled craftsmen but also passionate artists who take pride in every cut, trim, and shave. Whether you're looking for a sharp fade, a classic pompadour, or a bold new look, we've got you covered. At Silverhand, we don’t just cut hair; we help you express your personality and confidence through your style.</p>
                <p className="mb-4 aboutuspage-custom-text">Our philosophy revolves around delivering high-quality service in a welcoming and relaxed atmosphere. We take time to understand your preferences, ensuring that every visit leaves you feeling refreshed, confident, and ready to take on the world.</p>
                <p className="mb-4 aboutuspage-custom-text">Beyond just haircuts, Silverhand Barbershop is a hub for connection—a place where conversations flow freely, laughter is abundant, and everyone feels like family. We value community, and we’re committed to giving back through collaborations and events that bring people together.</p>
                <p className="mb-4 aboutuspage-custom-text">At Silverhand, we use only the best products to keep your hair and beard looking sharp and healthy. Our commitment to excellence is matched by our desire to make every client feel like the most important person in the room.</p>
                <p className="mb-4 aboutuspage-custom-text">Visit Silverhand Barbershop today and discover what sets us apart. Your next great style starts here.</p>
                <div className="d-flex">
                <Button variant="dark" className="my-5 me-3" style={{ fontFamily: "Genos, cursive", fontSize: "1rem", width: "150px" }} onClick={() => navigatePage("gallery")}>View Gallery</Button>
                <Button variant="dark" className="my-5" style={{ fontFamily: "Genos, cursive", fontSize: "1rem", width: "150px" }} onClick={() => navigatePage("services")}>Book Reservation</Button>
                </div>
            </div>
            <FooterSection />
            </MainSection>
        </>
    );
}
