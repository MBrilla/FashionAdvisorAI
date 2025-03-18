import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function ImageUploader({ onImageSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        onImageSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.500',
        borderRadius: { xs: 2, sm: 3 },
        p: { xs: 3, sm: 4 },
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
        background: isDragActive ? 'rgba(187, 134, 252, 0.08)' : 'transparent',
        backdropFilter: 'blur(8px)',
        mx: { xs: 2, sm: 0 },
        '&:hover': {
          '@media (hover: hover)': {
            borderColor: 'primary.light',
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
          }
        },
        '&:active': {
          '@media (hover: none)': {
            transform: 'scale(0.98)',
            borderColor: 'primary.light'
          }
        }
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon 
        sx={{ 
          fontSize: { xs: 48, sm: 64 }, 
          color: isDragActive ? 'primary.light' : 'primary.main',
          mb: { xs: 2, sm: 3 },
          transition: 'all 0.3s ease-in-out',
          transform: isDragActive ? 'scale(1.1)' : 'scale(1)'
        }} 
      />
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 500,
          color: isDragActive ? 'primary.light' : 'text.primary',
          transition: 'color 0.3s ease-in-out',
          fontSize: { xs: '1.125rem', sm: '1.5rem' }
        }}
      >
        {isDragActive ? 'Drop your image here' : 'Tap to upload your outfit'}
      </Typography>
      <Typography 
        variant="body1" 
        color="text.secondary"
        sx={{ 
          opacity: isDragActive ? 0.7 : 1,
          transition: 'opacity 0.3s ease-in-out',
          fontSize: { xs: '0.875rem', sm: '1rem' },
          display: { xs: 'none', sm: 'block' }
        }}
      >
        or drag & drop your image here
      </Typography>
    </Box>
  );
}

export default ImageUploader;