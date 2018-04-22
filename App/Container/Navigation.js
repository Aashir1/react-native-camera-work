import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Signup from '../Component/signup';
import Login from '../Component/login';
import LoginDemo from '../Component/login';
import SignupDemo from '../Component/signup';
import { Tab1, Tab2 } from '../Component/home'
import Home from '../Component/home';
import { Provider } from 'react-redux';
import store from '../store/index';
import Camera from '../Component/camera';

const AuthStack = StackNavigator(
  {
    SignUp: {
      screen: SignupDemo,
    },
    LogIn: {
      screen: LoginDemo,
    },
  },
  {
    initialRouteName: 'LogIn',
    // headerMode: 'none'
  }
);

const Routes = StackNavigator({
  Auth: {
    screen: AuthStack
  },
  Tabes: {
    screen: TabNavigator({
      Camera: {
        screen: Camera
      },
      Home: {
        screen: Home
      },
    },
      {
        initialRouteName: 'Camera',
        // headerMode: 'none'
      }
    )
  },
},
  {
    headerMode: 'none'
  })

/* ***************************************** For History.replace functionality ********************************* */
// const prevGetStateForActionHomeStack = Routes.router.getStateForAction;
// Routes.router.getStateForAction = (action, state) => {
//   if (state && action.type === 'ReplaceCurrentScreen') {
//     const routes = state.routes.slice(0, state.routes.length - 1);
//     routes.push(action);
//     return {
//       ...state,
//       routes,
//       index: routes.length - 1,
//     };
//   }
//   return prevGetStateForActionHomeStack(action, state);
// };
const Tabs = TabNavigator({
  Home: {
    screen: Home
  },
  Camera: {
    screen: Camera
  },
});

export default class App extends React.Component {
  render() {
    try {
      return (
        <Provider store={store}>
          <Routes />
        </Provider>
      );
    } catch (error) {
      alert(error);
    }
  }
}



// export default class App extends React.Component {
//   render() {
//     return <AuthStack />;
//   }
// }