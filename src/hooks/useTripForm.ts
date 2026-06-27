import { useReducer } from "react";
import type { TripRequest } from "@/types/itinerary";

type Action =
  | { type: "SET_FIELD"; field: keyof TripRequest; value: any }
  | { type: "TOGGLE_INTEREST"; interest: string }
  | { type: "RESET" };

const initialState: TripRequest = {
  destination: null,
  duration: null,
  budget: null,
  travelers: null,
  travelStyle: null,
  travelMonth: null,
  accommodation: null,
  transport: null,
  interests: [],
};

function tripReducer(state: TripRequest, action: Action): TripRequest {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "TOGGLE_INTEREST":
      return {
        ...state,
        interests: state.interests.includes(action.interest)
          ? state.interests.filter((i) => i !== action.interest)
          : [...state.interests, action.interest],
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function useTripForm() {
  const [state, dispatch] = useReducer(tripReducer, initialState);

  const setField = (field: keyof TripRequest, value: any) => {
    dispatch({ type: "SET_FIELD", field, value });
  };

  const toggleInterest = (interest: string) => {
    dispatch({ type: "TOGGLE_INTEREST", interest });
  };

  const reset = () => dispatch({ type: "RESET" });

  const isValid = Boolean(state.destination && state.destination.trim().length >= 2);

  return { state, setField, toggleInterest, reset, isValid };
}
