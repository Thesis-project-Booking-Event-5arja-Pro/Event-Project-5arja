import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
import { StyledNavItem, StyledNavItemIcon } from './styles';

NavSection.propTypes = {
  data: PropTypes.array,
};

const data = [
  { title: 'dashboard', path: '/dashboard/app', icon: null },
  { title: 'user', path: '/dashboard/user', icon: null },
  { title: "events'", path: '/dashboard/products', icon: null },
  { title: 'login', path: '/login', icon: null },
  { title: 'Not found', path: '/404', icon: null },
];

export default function NavSection() {
  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  return (
    <StyledNavItem
      component={RouterLink}
      to={item.path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{item.icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={item.title} />
    </StyledNavItem>
  );
}
