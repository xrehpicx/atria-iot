/** @jsxImportSource @emotion/react */
import {
  Box,
  Container,
  TextField,
  Typography,
  useTheme,
  css,
  Button,
  darken,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "react-supabase";
import { useDefault } from "../contexts/DefaultContext";
import { useEffect } from "react";
import React from "react";
import { validateEmail } from "../utils";

export function Login() {
  const theme = useTheme();
  const { group } = useDefault();
  const [signin, setSignin] = useState<boolean>(true);
  const navigate = useNavigate();
  const [{ error, fetching, session, user }, signIn] = useSignIn();
  const [signupProps, signUp] = useSignUp();

  const [creds, setCreds] = useState({ email: "", password: "" });

  useEffect(() => {
    console.log(error, fetching, session, user);
    if (error || signupProps.error) {
      alert(error?.message || signupProps.error?.message);
      return;
    }
    if (signupProps.user) {
      window.location.reload();
    }
    if (user) {
      navigate("/dashboard");
    }
  }, [error, fetching, navigate, session, user, signupProps]);

  return (
    <Container
      css={css`
        justify-content: center;
        align-items: center;
        display: flex;
        height: 100vh;
      `}
    >
      <Box
        css={css`
          background: ${darken(theme.palette.primary.main, 0.85)};
          border: 2px solid ${theme.palette.primary.main};
          border-radius: 1rem;
          padding: 2rem 4rem;
          display: flex;
          align-items: stretch;
          justify-content: space-between;

          min-width: 800px;
          min-height: 400px;
          width: 100%;

          @media only screen and (max-width: 600px) {
            min-width: 0;
            flex-direction: column;
          }
        `}
      >
        <Box
          css={css`
            flex: 1;
            display: flex;
            /* align-items: center; */
            justify-content: center;
            flex-direction: column;
            border-right: 1px solid ${theme.palette.divider};
            @media only screen and (max-width: 600px) {
              border-right: none;
              border-bottom: 1px solid ${theme.palette.divider};
            }
          `}
        >
          <Typography variant="h5" fontWeight={800}>
            IoT Sandbox
          </Typography>
          <Typography variant="subtitle1">Hosted by {group}</Typography>
          <Box>
            <TextField
              onChange={(e) =>
                setCreds((v) => ({ ...v, email: e.target.value }))
              }
              variant="standard"
              label="email"
              type={"email"}
            />
            <TextField
              onChange={(e) =>
                setCreds((v) => ({ ...v, password: e.target.value }))
              }
              variant="standard"
              label={signin ? "password" : "Create password"}
              type={signin ? "password" : "email"}
            />
            <div
              css={css`
                display: flex;

                margin-top: 1rem;
              `}
            >
              <Button
                disabled={!(creds.email && creds.password)}
                css={css`
                  border-radius: 42px;
                `}
                variant="outlined"
                onClick={(e) => {
                  if (signin) {
                    signIn(creds, { redirectTo: "/dashboard" });
                    return;
                  }
                  signUp(creds, { redirectTo: "/dashboard" });
                }}
              >
                {signin ? "sign in" : "sign up"}
              </Button>

              <Button onClick={() => setSignin((s) => !s)}>
                {signin ? "sign up" : "sign in"}
              </Button>
            </div>
          </Box>
        </Box>

        <Box
          css={css`
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          <SignInWithEmail />
        </Box>
      </Box>
    </Container>
  );
}

function SignInWithEmail() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [loading, setLoading] = useState(false);
  const [helper, setHelper] = useState("");
  const [email, setEmail] = useState("");
  const [_, signIn] = useSignIn();

  return (
    <>
      <Button
        color="success"
        variant="contained"
        sx={{ borderRadius: 42 }}
        size="large"
        onClick={handleClickOpen}
      >
        Sign in with Email
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send Magic link</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Login link will be sent to ur email
          </DialogContentText>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            helperText={helper}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={async () => {
              setLoading(true);
              await signIn({
                email,
              });
              setLoading(false);
              setHelper("Link sent");
            }}
            disabled={!validateEmail(email)}
          >
            Send
          </Button>
        </DialogActions>
        {loading && <LinearProgress />}
      </Dialog>
    </>
  );
}
