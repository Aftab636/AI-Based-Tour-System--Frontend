import { createContext, useReducer, useContext } from 'react';

// Initial state
const initialState = {
  comparedTours: [],
  maxCompareLimit: 3,
};

// Action Types
const ADD_TO_COMPARE = 'ADD_TO_COMPARE';
const REMOVE_FROM_COMPARE = 'REMOVE_FROM_COMPARE';
const CLEAR_COMPARE = 'CLEAR_COMPARE';

// Reducer
const comparisonReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_COMPARE:
      if (
        state.comparedTours.length < state.maxCompareLimit &&
        !state.comparedTours.includes(action.payload)
      ) {
        return {
          ...state,
          comparedTours: [...state.comparedTours, action.payload],
        };
      }
      return state;

    case REMOVE_FROM_COMPARE:
      return {
        ...state,
        comparedTours: state.comparedTours.filter((id) => id !== action.payload),
      };

    case CLEAR_COMPARE:
      return { ...state, comparedTours: [] };

    default:
      return state;
  }
};

// Context
const ComparisonContext = createContext(initialState);

// Provider
export const ComparisonProvider = ({ children }) => {
  const [state, dispatch] = useReducer(comparisonReducer, initialState);

  const addToCompare = (tourId) => dispatch({ type: ADD_TO_COMPARE, payload: tourId });
  const removeFromCompare = (tourId) => dispatch({ type: REMOVE_FROM_COMPARE, payload: tourId });
  const clearCompare = () => dispatch({ type: CLEAR_COMPARE });

  return (
    <ComparisonContext.Provider
      value={{ ...state, addToCompare, removeFromCompare, clearCompare }}
    >
      {children}
    </ComparisonContext.Provider>
  );
};

// Hook
export const useComparison = () => useContext(ComparisonContext);
