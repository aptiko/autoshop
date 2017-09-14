import { connect } from 'react-redux';

import MainNav from './ui/MainNav';

export const MainNavContainer = connect(
  state => ({ loggedOnUser: state.loggedOnUser }),
)(MainNav);
