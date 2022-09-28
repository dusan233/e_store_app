import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, AlertTitle, List, ListItem, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import api from "../../app/api/agent";
import { useState } from "react";

export default function Register() {
  const [validationErrors, setValidationErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "all",
  });

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          api.account
            .register(data)
            .catch((error) => setValidationErrors(error))
        )}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={"username is required"}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={"Email is required"}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={"Password is required"}
        />

        {validationErrors.length > 0 && (
          <Alert severity="error">
            <AlertTitle>ValidationErrors</AlertTitle>
            <List>
              {validationErrors.map((err) => (
                <ListItem key={err}>{err}</ListItem>
              ))}
            </List>
          </Alert>
        )}

        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          loading={isSubmitting}
          disabled={!isValid}
          size="large"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link to="/login">{"Already have an account? Sign in"}</Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
