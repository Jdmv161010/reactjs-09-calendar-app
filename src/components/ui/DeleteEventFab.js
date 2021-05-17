import React from "react";
import { useDispatch } from "react-redux";
import { eventDelete } from "../../redux-logic/actions/event";

export const DeleteEventFab = () => {
  const dispatch = useDispatch();

  const handleDeleteEvent = () => {
    dispatch(eventDelete());
  };

  return (
    <button className="btn btn-danger fab-danger" onClick={handleDeleteEvent}>
      <i className="fas fa-trash"></i>
      <span>Borrar Evento</span>
    </button>
  );
};
