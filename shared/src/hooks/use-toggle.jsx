import { useState, useCallback } from 'react';
/**
 * Custom hook to handle toggling a boolean state
 * @param {boolean} initialState - The initial value of the state (default: false)
 * @returns {[boolean, () => void, (value: boolean) => void]} - Current state, toggle function, and set function
 */
export const useToggle = (initialState = false) => {
    const [state, setState] = useState(initialState);
    // Toggle the state
    const toggle = useCallback(() => {
        setState((prev) => !prev);
    }, []);
    // Set the state explicitly
    const set = useCallback((value) => {
        setState(value);
    }, []);
    return [state, toggle, set];
};
