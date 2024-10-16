import * as React from "react";
import { useTheme, styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useAuthentication } from "../../hooks";

const StyledLoginPaper = styled(Paper)(({ theme }) => ({
  width: "400px",
  height: "max-content",

  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const StyledTabPanel = styled("div")(({}) => ({
  padding: "3em",
  height: "600px",
}));

const StyledInputContainer = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: "1",
  rowGap: "2em",
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
      {value === index && <>{children}</>}
    </StyledTabPanel>
  );
}

export const Login = () => {
  const { login } = useAuthentication();
  const theme = useTheme();
  const navigate = useNavigate();

  const [loginName, setLoginName] = React.useState("");
  const [loginError, setLoginError] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newTabValue: number) => {
    // Handle changing of the tab selection
    // We'll also clear out the entered login name when
    // the end-user switches between login tabs and reset an error state
    setLoginName("");
    setSelectedTab(newTabValue);
    setLoginError(false);
  };

  const onCoachLogin = async () => {
    const loginIsSuccessful = await login(loginName, "coach");

    // We'll navigate to the next step if login was successful
    if (loginIsSuccessful) {
      setLoginError(false);
      navigate("/booking/coach");
    }

    // Otherwise, unsuccessful login, let's indicate a basic error
    else {
      setLoginError(true);
    }
  };

  const onStudentLogin = async () => {
    const loginIsSuccessful = await login(loginName, "student");

    // We'll navigate to the next step if login was successful
    if (loginIsSuccessful) {
      setLoginError(false);
      navigate("/booking/student");
    }

    // Otherwise, unsuccessful login, let's indicate a basic error
    else {
      setLoginError(true);
    }
  };

  const onLoginInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginName(event.target.value);
  };

  const LoginErrorMessage = () => {
    return (
      <Typography color="red">
        Could not login with the provided credential
      </Typography>
    );
  };

  return (
    <Stack>
      <StyledLoginPaper variant="outlined">
        <img
          style={{ marginTop: "1em" }}
          src={"./stepful.png"}
          alt="Stepful Logo"
          width="200px"
        />
        <TabPanel value={selectedTab} index={0} dir={theme.direction}>
          <StyledInputContainer>
            <p>Coach Login</p>
            <TextField
              id="coach-name"
              label="Coach Name"
              variant="filled"
              onChange={onLoginInputChange}
            />
            <Button variant="contained" onClick={onCoachLogin}>
              Login
            </Button>
            {loginError ? <LoginErrorMessage /> : null}
          </StyledInputContainer>
        </TabPanel>
        <TabPanel value={selectedTab} index={1} dir={theme.direction}>
          <StyledInputContainer>
            <p>Student Login</p>
            <TextField
              id="student-name"
              label="Student Name"
              variant="filled"
              onChange={onLoginInputChange}
            />
            <Button variant="contained" onClick={onStudentLogin}>
              Login
            </Button>
            {loginError ? <LoginErrorMessage /> : null}
          </StyledInputContainer>
        </TabPanel>
        <AppBar position="static">
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
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
  );
};
