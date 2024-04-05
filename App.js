
import { useState } from 'react';
import Appnav from './app/screens/Appnav';
import { AuthProvider } from './app/context/Authcontext';
import AptList from './app/component/AptList';
import registerNNPushToken from 'native-notify';



export default function App() {

  registerNNPushToken(11470, 'vlWrDSIZ9I74ltjyZe0csb');
  const [isLogged, setislogged]=useState(true)


  return (

       <AuthProvider>
       <Appnav/>
       </AuthProvider>

      // <AptList/>
  );
}


