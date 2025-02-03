import MainSection from "../components/MainSection";
import FooterSection from "../components/FooterSection";
import BarbersDisplay from "../components/BarbersDisplay";
import BookingDisplay from "../components/BookingDisplay";

export default function ServicesPage() {
    return (
        <>
            <MainSection>
                <div>
                    <BarbersDisplay />
                    <BookingDisplay />
                </div>
                <FooterSection />
            </MainSection>
        </>
    );
}
