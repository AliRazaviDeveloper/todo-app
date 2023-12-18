import { FC, useState } from "react";
import {
  Fab,
  Drawer,
  Grid,
  Divider,
  styled,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import { useSelector, useDispatch } from "../../../store/Store";
import Box, { BoxProps } from "@mui/material/Box";
import { Theme, setTheme } from "../../../store/customizer/CustomizerSlice";
import { AppState } from "../../../store/Store";
import { TbSettings, TbCheck, TbX } from "react-icons/tb";
import Scrollbar from "../scrollbar/Scrollbar";
const SidebarWidth = "320px";
interface colors {
  id: number;
  bgColor: string;
  disp?: string;
}
const Customizer: FC = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const customizer = useSelector((state: AppState) => state.customizer);

  const dispatch = useDispatch();

  const StyledBox = styled(Box)<BoxProps>(({ theme }) => ({
    boxShadow: theme.shadows[8],
    padding: "20px",
    cursor: "pointer",
    justifyContent: "center",
    display: "flex",
    transition: "0.1s ease-in",
    border: "1px solid rgba(145, 158, 171, 0.12)",
    "&:hover": {
      transform: "scale(1.05)",
    },
  }));

  const thColors: colors[] = [
    {
      id: 1,
      bgColor: "#5D87FF",
      disp: Theme.BLUE_THEME,
    },
    {
      id: 2,
      bgColor: "#0A7EA4",
      disp: Theme.GREEN_THEME,
    },
    {
      id: 6,
      bgColor: "#FA896B",
      disp: Theme.ORANGE_THEME,
    },
  ];

  return (
    <div>
      <Tooltip title="Settings">
        <Fab
          color="primary"
          aria-label="settings"
          sx={{ position: "fixed", right: "25px", bottom: "15px" }}
          onClick={() => setShowDrawer(true)}
        >
          <TbSettings size="1.5rem" />
        </Fab>
      </Tooltip>
      <Drawer
        anchor="right"
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        PaperProps={{
          sx: {
            width: SidebarWidth,
          },
        }}
      >
        <Scrollbar sx={{ height: "calc(100vh - 5px)" }}>
          <Box
            p={2}
            display="flex"
            justifyContent={"space-between"}
            alignItems="center"
          >
            <Typography variant="h4">Settings</Typography>

            <IconButton color="inherit" onClick={() => setShowDrawer(false)}>
              <TbX size="1rem" />
            </IconButton>
          </Box>
          <Divider />
          <Box p={3}>
            <Typography variant="h6" gutterBottom>
              Theme Colors
            </Typography>
            <Grid container spacing={2}>
              {thColors.map((thcolor) => (
                <Grid item xs={4} key={thcolor.id}>
                  <StyledBox onClick={() => dispatch(setTheme(thcolor.disp))}>
                    <Tooltip title={`${thcolor.disp}`} placement="top">
                      <Box
                        sx={{
                          backgroundColor: thcolor.bgColor,
                          width: "25px",
                          height: "25px",
                          borderRadius: "60px",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          color: "white",
                        }}
                        aria-label={`${thcolor.bgColor}`}
                      >
                        {customizer.activeTheme === thcolor.disp ? (
                          <TbCheck width={13} />
                        ) : (
                          ""
                        )}
                      </Box>
                    </Tooltip>
                  </StyledBox>
                </Grid>
              ))}
            </Grid>
            <Box pt={4} />
          </Box>
        </Scrollbar>
      </Drawer>
    </div>
  );
};

export default Customizer;
