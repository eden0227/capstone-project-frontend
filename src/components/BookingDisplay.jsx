import { Button, Card } from "react-bootstrap";
import NewBookingModal from "./NewBookingModal";
import UpdateBookingModal from "./UpdateBookingModal";
import ChatbotModal from "./ChatbotModal";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { readReservation, deleteReservation } from "../features/bookings/bookingsSlice";

export default function BookingDisplay() {
    const { currentUser } = useContext(AuthContext);
    const currentUid = currentUser ? currentUser.uid : "";

    const [showBooking, setShowBooking] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleOpenBooking = () => {
        setShowBooking(true);
    };

    const handleCloseBooking = () => {
        setShowBooking(false);
    };

    const handleOpenUpdate = () => {
        setShowUpdate(true);
    };

    const handleCloseUpdate = () => {
        setShowUpdate(false);
    };

    const dispatch = useDispatch();

    const reservation = useSelector((store) => store.bookings.reservation);
    const isBooked = useSelector((store) => store.bookings.isBooked);

    useEffect(() => {
        if (currentUid) {
            dispatch(readReservation(currentUid));
        }
    }, [showBooking, showUpdate, currentUid, dispatch]);

    const handleRefresh = () => {
        if (currentUid) {
            dispatch(readReservation(currentUid));
        }
    };

    const handleDeleteReservation = () => {
        dispatch(deleteReservation(currentUid));
    };

    const [showChatbot, setShowChatbot] = useState(false);

    const handleShowChatbot = () => setShowChatbot(true);
    const handleCloseChatbot = () => setShowChatbot(false);

    return (
        <>
            <div>
                <div className="p-3 d-flex flex-column align-items-center" style={{ fontFamily: "Genos, cursive", fontSize: "1.2rem" }}>
                    {!isBooked ? (
                        <div className="m-3 p-3 py-4 border border-secondary rounded-3 d-flex flex-column align-items-center text-center" style={{ width: "90%", maxWidth: "450px" }}>
                            <p>Ready for a Fresh Look?</p>
                            <p style={{ width: "77%" }}>
                                Book your appointment with ease—choose your barber, pick a time, and we will take care of the rest!
                            </p>
                            <Button variant="dark" style={{ width: "50%", maxWidth: "350px" }} onClick={handleOpenBooking}>
                                Book Reservation
                            </Button>
                        </div>
                    ) : null}
                    {isBooked ? (
                        <div className="m-3" style={{ width: "90%", maxWidth: "450px" }}>
                            <Card className="border border-secondary shadow-sm">
                                <Card.Header className="bg-dark text-white text-center d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0">Your Reservation</h5>
                                    <Button variant="light" className="btn-sm" onClick={handleRefresh}>
                                        <i className="bi bi-arrow-clockwise"></i>
                                    </Button>
                                </Card.Header>
                                <Card.Body className="d-flex flex-column align-items-center">
                                    <div className="py-3">
                                        <p>
                                            <strong>Barber: </strong>
                                            {reservation.barber}
                                        </p>
                                        <p>
                                            <strong>Date: </strong>
                                            {reservation.date}
                                        </p>
                                        <p>
                                            <strong>Time: </strong>
                                            {reservation.time}
                                        </p>
                                        <p>
                                            <strong>Name: </strong>
                                            {reservation.name}
                                        </p>
                                        <p>
                                            <strong>Phone Number: </strong>
                                            {reservation.phone_number}
                                        </p>
                                    </div>
                                    <div className="py-2 gap-2 w-100 d-flex justify-content-center">
                                        <Button variant="dark" style={{ width: "40%", maxWidth: "350px" }} onClick={handleOpenUpdate}>
                                            Change
                                        </Button>
                                        <Button variant="dark" style={{ width: "40%", maxWidth: "350px" }} onClick={handleDeleteReservation}>
                                            Cancel
                                        </Button>
                                    </div>
                                    <p className="text-center" style={{ fontSize: "0.9rem"}}>If the reservation is not updated or empty, please click the refresh button</p>
                                </Card.Body>
                            </Card>
                        </div>
                    ) : null}
                    <div className="m-3 p-3 py-4 border border-secondary rounded-3 d-flex flex-column align-items-center text-center" style={{ width: "90%", maxWidth: "450px" }}>
                        <p>
                            Have questions? Refer to our AI assistance <i className="bi bi-robot"></i>
                        </p>
                        <Button variant="dark" style={{ width: "50%", maxWidth: "350px" }} onClick={handleShowChatbot}>
                            Ask Away! <i className="bi bi-chat"></i>
                        </Button>
                    </div>
                </div>
                <NewBookingModal showBooking={showBooking} handleCloseBooking={handleCloseBooking} />
                <UpdateBookingModal showUpdate={showUpdate} handleCloseUpdate={handleCloseUpdate} />
                <ChatbotModal  show={showChatbot} handleClose={handleCloseChatbot} />
            </div>
        </>
    );
}
