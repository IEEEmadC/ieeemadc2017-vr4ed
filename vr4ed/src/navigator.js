import { StackNavigator, NavigationActions } from 'react-navigation';
import BoardingHome from './screens/boarding/boardingHome';
import DashboardHome from './screens/category';
import GamesScreen from './screens/games';
import VRScreen from './screens/vr';
import LoginScreen from './screens/boarding/login';
import ForgotScreen from './screens/boarding/forgotPassword';
import RegisterScreen from './screens/boarding/register';
import ProfileScreen from './screens/profile';
import VrSchool from './screens/vrSchool';

const routes = {
  Boarding: {
    screen: BoardingHome,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Dash: {
    screen: DashboardHome,
    navigationOptions: {
      header: null,
    },
  },
  Games: {
    screen: GamesScreen,
    navigationOptions: {
      header: null,
    },
  },
  VR: {
    screen: VRScreen,
    navigationOptions: {
      header: null,
    },
  },
  VRSchool: {
    screen: VrSchool,
    navigationOptions: {
      header: null,
    },
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      header: null,
    },
  },
  Forgot: {
    screen: ForgotScreen,
    navigationOptions: {
      header: null,
    },
  },
  Register: {
    screen: RegisterScreen,
    navigationOptions: {
      header: null,
    },
  },

};

export const AppNavigator = StackNavigator(routes,
  {
    initialRouteName: 'Boarding',
    headerMode: 'none',
  },
);