import { useTheme } from "@mui/material/styles";
import {
  Card as MuiCard,
  CardHeader,
  CardContent,
  Divider,
  Box,
} from "@mui/material";

type Props = {
  title: string;
  footer?: string | JSX.Element;
  children: JSX.Element;
};

const Card = ({ title, children, footer }: Props) => {
  const theme = useTheme();
  const borderColor = theme.palette.divider;

  return (
    <MuiCard
      sx={{ padding: 0, border: `1px solid ${borderColor}` }}
      variant={"outlined"}
    >
      <CardHeader title={title} />
      <Divider />

      <CardContent>{children}</CardContent>
      {footer ? (
        <>
          <Divider />
          <Box p={3}>{footer}</Box>
        </>
      ) : (
        ""
      )}
    </MuiCard>
  );
};

export default Card;
