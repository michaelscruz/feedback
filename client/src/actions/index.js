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

export const handleToken = (token) => async dispatch => {
  const res = await axios.post("/api/stripe", token)
  dispatch({ type: FETCH_USER, payload: res.data })
}
