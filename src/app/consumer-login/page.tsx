"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import Link from "next/link";
import { toast } from "sonner";
import { consumerLogin } from "@/services/actions/consumerLogin";
import { storeUserInfo } from "@/services/auth.service";
import { FieldValues } from "react-hook-form";

const ConsumerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    const values = { email, password };
  
    try {
      const res = await consumerLogin(values);
      if (res?.data?.accessToken) {
        setMessage({ text: res.message, type: "success" });
        toast.success(res.message);
        storeUserInfo({ accessToken: res.data.accessToken });
      } else {
        setMessage({ text: res.message, type: "error" });
      }
    } catch (err: any) {
      setMessage({ text: err.message, type: "error" });
      console.error(err.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 400,
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            p: 4,
            textAlign: "center",
            backgroundColor: "white",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={600} color="#1976d2">
                Electricity Management - Consumer
              </Typography>
            </Box>
          </Stack>

          {message && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: message.type === "error" ? "red" : "green",
                  width: "100%",
                  marginLeft: "auto",
                  marginRight: "auto",
                  padding: "10px 0",
                  borderRadius: "5px",
                  color: "white",
                  marginTop: "10px",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          )}

          <Box mt={3}>
            <form onSubmit={handleLogin}>
              <Grid container spacing={2} my={1}>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                <Link href="/forget-password">Forgot Password?</Link>
              </Typography>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ mt: 2, mb: 2 }}
                onClick={() => console.log("Login button clicked")} 
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300} mt={2}>
                Are you an admin? <Link href="/login">Login as admin</Link>
              </Typography>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default ConsumerLoginPage;
