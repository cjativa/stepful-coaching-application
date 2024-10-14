import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const StyledLoginPaper = styled(Paper)(({ theme }) => ({
  width: "400px",
  height: "max-content",

  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const StyledBackground = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100vh",
  background: "#7c8ef2",

  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const StyledTabPanel = styled("div")(({}) => ({
  padding: "3em",
  height: "600px",
}));

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <StyledTabPanel
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </StyledTabPanel>
  );
}

export const Login = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <StyledBackground>
      <Stack>
        <StyledLoginPaper variant="outlined">
          <TabPanel value={value} index={0} dir={theme.direction}>
            Coach Login
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Student Login
          </TabPanel>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Coach Login" />
              <Tab label="Student Sign-in" />
            </Tabs>
          </AppBar>
        </StyledLoginPaper>
      </Stack>
    </StyledBackground>
  );
};
