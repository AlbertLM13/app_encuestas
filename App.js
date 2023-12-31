import 'react-native-gesture-handler'
import React from 'react';
import NavigationApp from './components/NavigationApp';
import { AuthProvider } from './context/AuthContext';


export default function App() {
  return (
    <AuthProvider>      
      <NavigationApp/>      
    </AuthProvider>
  );
}


 