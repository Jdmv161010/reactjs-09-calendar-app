import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import Swal from "sweetalert2";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../redux-logic/actions/ui";
import {
  eventClearActive,
  eventStartAddNew,
  eventStartUpdate,
} from "../../redux-logic/actions/event";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const now = moment().minutes(0).seconds(0).add(1, "hours");
const later = now.clone().add(1, "hours");
const initEvent = {
  title: "",
  notes: "",
  start: now.toDate(),
  end: later.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.event);

  const [startDate, setStartDate] = useState(now.toDate());
  const [endDate, setEndDate] = useState(later.toDate());

  const [titleValid, setTitleValid] = useState(true);

  const [formValues, setFormValues] = useState(initEvent);

  const { title, notes, start, end } = formValues;

  useEffect(() => {
    if (activeEvent) {
      setFormValues(activeEvent);
    } else {
      setFormValues(initEvent);
    }
  }, [activeEvent, setFormValues]);

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(eventClearActive());
    setFormValues(initEvent);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e);
    setFormValues({
      ...formValues,
      start: e,
    });
  };

  const handleEndDateChange = (e) => {
    setEndDate(e);
    setFormValues({
      ...formValues,
      end: e,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error en fechas",
        "La fecha y hora fin debe ser mayor a la fecha y hora inicio",
        "error"
      );
    }

    if (title.trim().length < 2) {
      return setTitleValid(false);
    }

    //TODO: Grabar en BD

    if (activeEvent) {
      dispatch(eventStartUpdate(formValues));
    } else {
      dispatch(eventStartAddNew(formValues));
    }
    setTitleValid(true);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalOpen}
      //onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {activeEvent ? "Editar Evento" : "Nuevo evento"} </h1>

      <hr />

      <form className="container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndDateChange}
            value={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!titleValid ? "is-invalid" : "is-valid"
              }`}
            placeholder="Título del evento"
            autoComplete="off"
            name="title"
            value={title}
            onChange={handleInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
