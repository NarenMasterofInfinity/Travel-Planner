import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";


const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  backgroundImage:
    "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
  backgroundRepeat: "no-repeat",
}));


export default function SignIn({ toggleForm }) {
  const [isVerified, setIsVerified] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  // const [username, settoke] = React.useState("");
  const navigate = useNavigate();
  React.useEffect(() => {
    if (isVerified) {
      localStorage.setItem("username", username);
      // console.log(token);
      navigate('/');
    }
  }, [isVerified, navigate,username]);
  const handleLogin = async () => {
    // event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", { username, password });
      setIsVerified(response.data);
      // settoken(response.data);
    } catch (error) {
      console.error("Error verifying user:", error);
    }
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();

  };
  
  const handleSignin = () => {
    navigate("/signin");

  }

  return (
    <ThemeProvider theme={lightTheme}>
      <SignInContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              required
              fullWidth
              id="username"
              placeholder="Username"
              name="username"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" fullWidth variant="contained" onClick={handleSubmit}>
              Sign in
            </Button>
           
            {isVerified !== null && (
              <Typography sx={{ textAlign: "center", marginTop: 2 }}>
              {console.log(`Verified : ${isVerified}`)}
               { isVerified ? "successful" : "Credentials are wrong"}
              </Typography>
            )}
            <Typography sx={{ textAlign: "center" }}>
              Don't have an account?{" "}
              <Button variant="text" onClick={handleSignin}>
                Sign up
              </Button>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </ThemeProvider>
  );
}

