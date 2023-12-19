import { useTheme } from "@mui/material/styles";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

type Props = {
  title?: string;
  action?: JSX.Element | any;
  footer?: JSX.Element;
  children?: JSX.Element;
  middlecontent?: string | JSX.Element;
};

const DashboardCard = ({
  title,
  children,
  action,
  footer,
  middlecontent,
}: Props) => {
  const theme = useTheme();
  const borderColor = theme.palette.grey[100];

  return (
    <Card sx={{ padding: 0, border: `1px solid ${borderColor}` }} elevation={0}>
      <CardContent sx={{ p: "30px" }}>
        {title ? (
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems={"center"}
            mb={3}
          >
            <Box>
              {title ? <Typography variant="h5">{title}</Typography> : ""}
            </Box>
            {action}
          </Stack>
        ) : null}

        {children}
      </CardContent>

      {middlecontent}
      {footer}
    </Card>
  );
};

export default DashboardCard;
