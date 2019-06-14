import React, {Component} from 'react';
import './Month.css';

class Month extends Component{
    render(){
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var listItems = months.map((el) =>
            <option key={el} value={el.toLowerCase()}>{el}</option>
        )

        return(
            <div className="Month">
                <select>
                    {listItems}
                </select>
            </div>
        );
    }
}

export default Month;