require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Index from './components/Index';

render(<Index/>, document.getElementById('happyfarm'));

