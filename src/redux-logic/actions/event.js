import Swal from "sweetalert2";
import { fetchConToken } from "../../helpers/fetch";
import { prepareEvents } from "../../helpers/prepareEvents";
import { types } from "../types/types";

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});

export const eventClearActive = () => ({
  type: types.eventClearActive,
});

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    
    const {uid, name} = getState().auth;

    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();

      if(body.ok){
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        }

        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
    
  }
}

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventStartUpdate = (event) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(`events/${event.id}`, event, "PUT");
      const body = await resp.json();

      if(body.ok){
        dispatch(eventUpdate(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }

    } catch (error) {
      console.log(error);
    }
  }
}

const eventUpdate = (event) => ({
  type: types.eventUpdate,
  payload: event,
});

export const eventStartDelete = () => {
  return async (dispatch, getState) => {

    const {id} = getState().event.activeEvent;

    try {
      const resp = await fetchConToken(`events/${id}`, {}, "DELETE");
      const body = await resp.json();

      if(body.ok){
        dispatch(eventDelete());
      } else {
        Swal.fire("Error", body.msg, "error");
      }

    } catch (error) {
      console.log(error);
    }
  }
}

const eventDelete = () => ({
  type: types.eventDelete,
});

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("events");
      const body = await resp.json();
      const events = prepareEvents(body.eventos);
      
      dispatch(eventLoad(events));

    } catch (error) {
      console.log(error);
    }
  }
}

const eventLoad = (events) => ({
  type: types.eventLoad,
  payload: events,
})


export const eventLogout = () => ({
  type: types.eventLogout
})

