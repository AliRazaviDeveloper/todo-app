import {createSlice} from '@reduxjs/toolkit';

export enum Theme {
    BLUE_THEME = "BLUE_THEME",
    GREEN_THEME = "GREEN_THEME",
    ORANGE_THEME = "ORANGE_THEME",
}

interface StateType {
    activeTheme?: Theme
}

const initialState = {
    activeTheme: Theme.BLUE_THEME
};

export const CustomizerSlice = createSlice({
    name: 'customizer',
    initialState,
    reducers: {
        setTheme: (state: StateType, action) => {
            state.activeTheme = action.payload;
        },
    },
});

export const {
    setTheme,
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
