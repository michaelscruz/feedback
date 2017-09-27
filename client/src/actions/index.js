import axios from "axios"
import { FETCH_USER } from "./types"

// This function makes an axios get request to the server for the current_user.
// After the request completes, dispatch is called with the response as the
// payload.
export const fetchUser = () => async dispatch => {
  // Using thunk and returning a function so that we can dispatch the action
  // AFTER the request completes.
  const res = await axios.get("/api/current_user")
  dispatch({ type: FETCH_USER, payload: res.data })
}

// Since this handles a type of FETCH_USER, every time this executes,
// the user will be updated, and any component that takes the user as a
// prop will be automatically updated.
export const handleToken = (token) => async dispatch => {
  const res = await axios.post("/api/stripe", token)
  dispatch({ type: FETCH_USER, payload: res.data })
}
