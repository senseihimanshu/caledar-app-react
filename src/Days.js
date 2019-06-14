import React, {Component} from 'react';
import './Days.css'

class Days extends Component{
    render(){
        return(
            <div className="Days">
                <ul className="list">
                    <li>Sunday</li>
                    <li>Monday</li>
                    <li>Tueday</li>
                    <li>Wednesday</li>
                    <li>Thursday</li>
                    <li>Friday</li>
                    <li>Saturday</li>
                </ul>
            </div>
        );
    }
}

export default Days;