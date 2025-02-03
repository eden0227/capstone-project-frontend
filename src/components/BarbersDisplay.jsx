import { Row, Col, Button, Card, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarbers, fetchSchedule } from "../features/bookings/bookingsSlice";

export default function BarbersDisplay() {
    const dispatch = useDispatch();
    const barbers = useSelector((store) => store.bookings.barbers);
    const schedules = useSelector((store) => store.bookings.schedules);
    
    useEffect(() => {
        dispatch(fetchBarbers());
    }, []);

    const [show, setShow] = useState(false);
    const [selectedBarber, setSelectedBarber] = useState(null);
    
    const handleShowModal = (barber) => {
        setSelectedBarber(barber);
        dispatch(fetchSchedule(barber.id));
        setShow(true);
    };

    const handleCloseModal = () => {
        setSelectedBarber(null);
        setShow(false);
    };

    return (
        <>
            <p className="pt-5 text-center" style={{ fontFamily: "Michroma, cursive", fontSize: "23px" }}>Choose Your Professional</p>
            <Row className="p-3 p-md-5 d-flex justify-content-center">
                {barbers.length > 0 && barbers.map((barber) => (
                    <Col key={barber.id} md={4} sm={6} xs={12} className="d-flex justify-content-center">
                        <Card className="m-3 mb-5 text-center servicespage-custom-card">
                            <Card.Img
                                variant="top"
                                src={barber.image_url}
                                alt={`${barber.name}`}
                                style={{ objectFit: "cover" }}
                            />
                            <Card.Body>
                                <Card.Title style={{ fontFamily: "Michroma", fontSize: "1.2rem", whiteSpace: "nowrap" }}>{barber.name}</Card.Title>
                                <Card.Text style={{ fontFamily: "genos", fontSize: "1.1rem", whiteSpace: "nowrap" }}>Specialty: {barber.specialty}</Card.Text>
                                <Button variant="dark" style={{ fontFamily: "Genos, cursive", fontSize: "1.1rem", minWidth: "77%" }} onClick={() => handleShowModal(barber)}>View Schedule</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal show={show} onHide={handleCloseModal} centered>
                <Modal.Header closeButton className="d-flex justify-content-center">
                    <Modal.Title className="w-100 text-center" style={{ fontFamily: "Michroma", fontSize: "1.2rem"}} >{selectedBarber ? selectedBarber.name : "Barber"}'s Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {schedules[selectedBarber?.id] && schedules[selectedBarber.id].length > 0 ? (
                        <ul style={{ listStyle: "none", fontFamily: "Genos", fontSize: "1.1rem" }}>
                            {schedules[selectedBarber.id].map((slot, index) => (
                                <li key={index} className="gap-5 me-4 border border-secondary rounded-2 mb-3 d-flex">
                                    <div className="gap-2 ms-md-5 ms-2 me-auto d-flex justify-content-between" style={{ width: "50%", whiteSpace: "nowrap" }}>
                                        <div>{slot.date}</div>
                                        <div>{slot.time}</div>
                                    </div>
                                    <div className="me-md-5 me-3">
                                        {slot.status}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading schedule....</p>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
}