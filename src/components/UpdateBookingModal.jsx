import { Modal, Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { fetchBarbers, fetchScheduleAvailable, updateReservation } from "../features/bookings/bookingsSlice";

export default function UpdateBookingModal({ showUpdate, handleCloseUpdate }) {
    const { currentUser } = useContext(AuthContext);
    const currentUid = currentUser ? currentUser.uid : "";

    const dispatch = useDispatch();
    const barbers = useSelector((store) => store.bookings.barbers);
    const schedulesAvailable = useSelector((store) => store.bookings.schedulesAvailable);
    const reservation = useSelector((store) => store.bookings.reservation);

    const [selectedBarber, setSelectedBarber] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    useEffect(() => {
        if (showUpdate) {
            dispatch(fetchBarbers());
            dispatch(fetchScheduleAvailable(reservation?.barber_id));
        }
    }, [dispatch, showUpdate, reservation]);

    useEffect(() => {
        if (reservation) {
            setSelectedBarber(reservation.barber_id);
            setSelectedDate(reservation.date);
            setSelectedTime(reservation.time);
        }
    }, [reservation]);

    useEffect(() => {
        if (selectedBarber) {
            dispatch(fetchScheduleAvailable(selectedBarber));
        }
    }, [dispatch, selectedBarber]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedBarber && selectedDate && selectedTime) {
            dispatch(updateReservation({
                currentUid,
                userBarber_id: selectedBarber,
                userDate: selectedDate,
                userTime: selectedTime,
                userName: e.target.name.value,
                userPhoneNumber: e.target.phoneNumber.value
            }));
            handleCloseUpdate();
        } else {
            alert("Please fill out all the fields");
        }
    };

    const handleBarberChange = (e) => {
        setSelectedBarber(e.target.value);
        setSelectedDate("");
        setSelectedTime("");
    };

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setSelectedTime("");
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const availableSchedules = selectedBarber ? schedulesAvailable[selectedBarber] || [] : [];

    const uniqueAvailableDates = Array.from(new Set(availableSchedules.map(schedule => schedule.date)));

    const availableTimes = selectedDate ? availableSchedules.filter(schedule => schedule.date === selectedDate).map(schedule => schedule.time) : [];

    return (
        <Modal show={showUpdate} onHide={handleCloseUpdate} centered style={{ fontFamily: "Genos, cursive", fontSize: "1.2rem" }}>
            <Modal.Header closeButton className="d-flex justify-content-center">
                <Modal.Title className="w-100 text-center">Update Reservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="p-2 d-flex flex-column" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Barber</Form.Label>
                        <Form.Select value={selectedBarber || ""} onChange={handleBarberChange}>
                            <option value="">Select Barber</option>
                            {barbers.map((barber) => (
                                <option key={barber.id} value={barber.id}>{barber.name}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {selectedBarber && (
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Select value={selectedDate} onChange={handleDateChange}>
                                <option value="">Select Date</option>
                                {uniqueAvailableDates.length > 0 ? uniqueAvailableDates.map((date, index) => (
                                    <option key={index} value={date}>{date}</option>
                                )) : <option>No available dates</option>}
                            </Form.Select>
                        </Form.Group>
                    )}

                    {selectedDate && (
                        <Form.Group className="mb-3">
                            <Form.Label>Time</Form.Label>
                            <Form.Select value={selectedTime} onChange={handleTimeChange}>
                                <option value="">Select Time</option>
                                {availableTimes.length > 0 ? availableTimes.map((time, index) => (
                                    <option key={index} value={time}>{time}</option>
                                )) : <option>No available times</option>}
                            </Form.Select>
                        </Form.Group>
                    )}

                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control required type="text" name="name" defaultValue={reservation?.name || ""} placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control required type="text" name="phoneNumber" defaultValue={reservation?.phone_number || ""} placeholder="Enter your phone number" />
                    </Form.Group>

                    <div className="pt-2 d-flex justify-content-center">
                        <Button variant="dark" type="submit" style={{ width: "60%" }}>Update</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
