import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 400,
    margin: 'auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(2),
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 10,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  },
  formContainer: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const HelpSection = () => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Submit message, file, and location data to backend
    const formData = new FormData();
    formData.append('message', message);
    formData.append('file', file);
    formData.append('latitude', location.latitude);
    formData.append('longitude', location.longitude);
    // Use fetch or Axios to send formData to your backend
    // fetch('/api/help', {
    //   method: 'POST',
    //   body: formData,
    // });
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error('Error getting location:', error);
      }
    );
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant="h4">Help Section</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={classes.formContainer}
          />
          <input
            accept="video/*,audio/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button variant="outlined" component="span" className={classes.formContainer}>
              Upload File
            </Button>
          </label>
          {file && <span>{file.name}</span>}
          <Button variant="contained" color="primary" onClick={getLocation} className={classes.formContainer}>
            Get Location
          </Button>
          {location && (
            <Typography variant="body1" className={classes.formContainer}>
              Latitude: {location.latitude}, Longitude: {location.longitude}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default HelpSection;
