import React, {Component} from 'react';
import Days from './Days';
import moment from 'moment';
import Dates from './Dates';

class DatesContainer extends Component{
    constructor(props){
        super(props);
        this.state = {


        }
    }
    render(){
        var day = function(){
            moment("2019-01-01").day();
        }

        return(
            <div className="DatesContainer">
                <Days />    
                <Dates />
                
            </div>
        );
    }
}

export  default DatesContainer;