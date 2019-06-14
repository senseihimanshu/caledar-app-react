import React, {Component} from 'react';
import Year from './Year';
import Month from './Month';
import './Nav.css';

class Nav extends Component{
    render(){
        return(
            <div className="Nav">
                <Year />
                <Month />
            </div>
        );
    }
}

export default Nav;