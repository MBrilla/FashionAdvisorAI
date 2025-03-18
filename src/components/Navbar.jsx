import { AppBar, Toolbar, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Logo from '../default-monochrome-black.svg';

function Navbar() {
  const theme = useTheme();

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{
        background: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          component="img"
          src={Logo}
          alt="Fashion Advisor AI Logo"
          sx={{
            height: { xs: 40, sm: 45 },
            width: 'auto',
            filter: 'invert(1)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;