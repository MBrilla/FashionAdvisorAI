import { useState } from 'react';
import { ThemeProvider, CssBaseline, Container, Box, Typography, Paper } from '@mui/material';
import Navbar from './components/Navbar';
import { createTheme } from '@mui/material/styles';
import ImageUploader from './components/ImageUploader';
import FashionAnalysis from './components/FashionAnalysis';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#BB86FC',
      light: '#E0B0FF',
      dark: '#9A68DB'
    },
    secondary: {
      main: '#03DAC6',
      light: '#66FFF2',
      dark: '#00B3A6'
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E'
    },
    text: {
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)'
    }
  },
  typography: {
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.5px'
    },
    h6: {
      fontWeight: 400,
      letterSpacing: '0.15px'
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'
        }
      }
    }
  }
});

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    setAnalysis(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom align="center">
            Fashion Advisor AI
          </Typography>
          <Typography variant="h6" gutterBottom align="center" color="text.secondary">
            Upload your outfit and get personalized style recommendations!
          </Typography>
          
          <Paper elevation={3} sx={{ p: 3, my: 4 }}>
            <ImageUploader onImageSelect={handleImageSelect} />
          </Paper>

          {selectedImage && (
            <Paper elevation={3} sx={{ p: 3, my: 4 }}>
              <FashionAnalysis 
                image={selectedImage}
                analysis={analysis}
                setAnalysis={setAnalysis}
                loading={loading}
                setLoading={setLoading}
              />
            </Paper>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;