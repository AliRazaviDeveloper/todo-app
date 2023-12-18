import _ from 'lodash';
import {createTheme} from '@mui/material/styles';
import {useSelector} from '../store/Store.ts';
import {AppState} from '../store/Store';
import components from './Components';
import typography from './Typography';
import {ThemeColor} from './ThemeColor.ts';
import * as locales from '@mui/material/locale';

export const BuildTheme = (config: any = {}) => {
    const themeOptions = ThemeColor.find((theme) => theme.name === config.theme);
    const defaultTheme = ThemeColor;
    const themeSelect = themeOptions
    const baseMode = {
        typography: typography,
    };
    const theme = createTheme(
        _.merge({}, baseMode, defaultTheme, locales, themeSelect, {
            direction: config.direction,
        }),
    );
    theme.components = components(theme);

    return theme;
};

const ThemeSettings = () => {
    const activeTheme = useSelector((state: AppState) => state.customizer.activeTheme);
    const theme = BuildTheme({
        theme: activeTheme,
    });

    return theme;
};

export {ThemeSettings};
