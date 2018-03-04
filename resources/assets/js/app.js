require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import Index from './components/Index';
import Devices from './components/DevicesComponent';
import User from './components/UserComponent';

// class App extends React.Component {
//     render(){
//         return (
//             <Router>
//                 <Index/>
//             </Router>
//         );
//     }
// }

render(<Index/>, document.getElementById('happyfarm'));

