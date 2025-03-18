import { useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { GoogleGenerativeAI } from '@google/generative-ai';

function FashionAnalysis({ image, analysis, setAnalysis, loading, setLoading }) {
  useEffect(() => {
    const analyzeImage = async () => {
      if (!image || loading || analysis) return;

      try {
        setLoading(true);
        console.log('Starting image analysis...');
        
        if (!import.meta.env.VITE_GEMINI_API_KEY) {
          throw new Error('API key is not configured');
        }

        // Extract base64 data and validate
        const base64Data = image.split(',')[1];
        const mimeType = image.split(',')[0].split(':')[1].split(';')[0];

        if (!base64Data || base64Data.trim().length === 0) {
          throw new Error('Invalid image data: Empty or corrupted image');
        }

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = [
          "Analyze this outfit and provide:",
          "1. A detailed description of the clothing items",
          "2. Style assessment (1-10 rating)",
          "3. Suggestions for improvement",
          "4. Outfit coordination tips",
          "5. Occasion recommendations",
          "Be specific and constructive in your feedback."
        ].join('\n');

        console.log('Sending request to Gemini API...');

        const result = await model.generateContent({
          contents: [{
            parts: [
              { text: prompt },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              }
            ]
          }]
        });

        const response = await result.response;
        const text = response.text();
        
        if (!text || text.trim().length === 0) {
          throw new Error('No analysis generated: The AI model returned empty response');
        }

        setAnalysis(text);
      } catch (error) {
        console.error('Error during image analysis:', error);
        setAnalysis(`Error analyzing image: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    analyzeImage();
  }, [image, analysis, loading, setAnalysis, setLoading]);

  return (
    <Box sx={{ position: 'relative', px: { xs: 2, sm: 3, md: 4 } }}>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: { xs: 2, sm: 3, md: 4 },
          borderRadius: { xs: 1, sm: 2 },
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            '@media (hover: hover)': {
              transform: 'scale(1.02)'
            }
          },
          '&:active': {
            '@media (hover: none)': {
              transform: 'scale(0.98)'
            }
          }
        }}
      >
        <img 
          src={image} 
          alt="Uploaded outfit"
          style={{ 
            width: '100%',
            maxHeight: { xs: '300px', sm: '400px', md: '500px' },
            objectFit: 'contain',
            display: 'block'
          }}
        />
      </Box>

      {loading ? (
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: { xs: '150px', sm: '200px' },
            gap: { xs: 1.5, sm: 2 }
          }}
        >
          <CircularProgress size={{ xs: 40, sm: 48 }} />
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            Analyzing your outfit...
          </Typography>
        </Box>
      ) : analysis ? (
        <Box 
          sx={{ 
            whiteSpace: 'pre-line',
            animation: 'fadeIn 0.5s ease-in-out',
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(10px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            },
            px: { xs: 1, sm: 2 }
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: 'primary.light',
              fontWeight: 600,
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            Fashion Analysis
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              lineHeight: { xs: 1.6, sm: 1.8 },
              color: 'text.primary',
              '& strong': { color: 'primary.light' },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {analysis}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default FashionAnalysis;