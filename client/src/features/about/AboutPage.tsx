import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  Container,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import api from "../../app/api/agent";

const AboutPage = () => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const getValidationError = () => {
    api.testErrors.getValidationError().catch((err) => {
      setValidationErrors(err);
    });
  };
  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Errors for testing purposes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() => api.testErrors.get400Error()}
        >
          Test 400 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => api.testErrors.get401Error()}
        >
          Test 401 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => api.testErrors.get404Error()}
        >
          Test 404 Error
        </Button>
        <Button
          variant="contained"
          onClick={() => api.testErrors.get500Error()}
        >
          Test 500 Error
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Test Validation Error
        </Button>
      </ButtonGroup>
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
    </Container>
  );
};

export default AboutPage;
