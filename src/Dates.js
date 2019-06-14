import React, {Component} from 'react';
import './Dates.css';
import moment from 'moment';

class Dates extends Component{
    // render(){
    //     var cells = [];
    //     var rows = [];

    //     var daysInMonth = () => {
    //         return moment().daysInMonth();
    //     } 

    //     var startOfMonth = () => {
    //         return moment().startOf('month').format('d');
    //     }

    //     for(let i = 1; i<=startOfMonth()-1; i++)
    //         cells.push('#'+i);

    //     for(let i = 0; i<daysInMonth(); i++){
    //         cells.push(i+1);
    //     }

    //     rows.push([cells.slice(0,7)]);
    //     rows.push([cells.slice(7,14)]);
    //     rows.push([cells.slice(14,21)]);
    //     rows.push([cells.slice(21,28)]);
    //     rows.push([cells.slice(28,35)]);

    //     console.log(rows);


    state = {
        dateContext: moment(),
        today: moment(),
        showMonthPopup: false,
        showYearPopup: false,
        selectedDay: null
    }

    constructor(props) {
        super(props);
        this.style = props.style || {};
        this.style.width = this.width; // add this
    }


    weekdays = moment.weekdays(); 
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    }
    month = () => {
        return this.state.dateContext.format("MMMM");
    }
    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    }
    currentDate = () => {
        console.log("currentDate: ", this.state.dateContext.get("date"));
        return this.state.dateContext.get("date");
    }
    currentDay = () => {
        return this.state.dateContext.format("D");
    }

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf('month').format('d'); // Day of week 0...1..5...6
        return firstDay;
    }

    setMonth = (month) => {
        let monthNo = this.months.indexOf(month);
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("month", monthNo);
        this.setState({
            dateContext: dateContext
        });
    }

    onSelectChange = (e, data) => {
        this.setMonth(data);
        this.props.onMonthChange && this.props.onMonthChange();

    }
    SelectList = (props) => {
        let popup = props.data.map((data) => {
            return (
                <div key={data}>
                    <a href="#" onClick={(e)=> {this.onSelectChange(e, data)}}>
                        {data}
                    </a>
                </div>
            );
        });

        return (
            <div className="month-popup">
                {popup}
            </div>
        );
    }

    onChangeMonth = (e, month) => {
        this.setState({
            showMonthPopup: !this.state.showMonthPopup
        });
    }

    MonthNav = () => {
        return (
            <span className="label-month"
                onClick={(e)=> {this.onChangeMonth(e, this.month())}}>
                {this.month()}
                {this.state.showMonthPopup &&
                 <this.SelectList data={this.months} />
                }
            </span>
        );
    }

    showYearEditor = () => {
        this.setState({
            showYearNav: true
        });
    }

    setYear = (year) => {
        let dateContext = Object.assign({}, this.state.dateContext);
        dateContext = moment(dateContext).set("year", year);
        this.setState({
            dateContext: dateContext
        })
    }
    onYearChange = (e) => {
        this.setYear(e.target.value);
        this.props.onYearChange && this.props.onYearChange(e, e.target.value);
    }

    YearNav = () => {
        return (
            this.state.showYearNav ?
            <input
                defaultValue = {this.year()}
                className="editor-year"
                ref={(yearInput) => { this.yearInput = yearInput}}
                onKeyUp= {(e) => this.onKeyUpYear(e)}
                onChange = {(e) => this.onYearChange(e)}
                type="number"
                placeholder="year"/>
            :
            <span
                className="label-year"
                onDoubleClick={(e)=> { this.showYearEditor()}}>
                {this.year()}
            </span>
        );
    }


        render() {
            // Map the weekdays i.e Sun, Mon, Tue etc as <td>
            let weekdays = this.weekdaysShort.map((day) => {
                return (
                    <td key={day} className="week-day">{day}</td>
                )
            });
    
            let blanks = [];
            for (let i = 0; i < this.firstDayOfMonth(); i++) {
                blanks.push(<td key={i * 80} className="emptySlot">
                    {""}
                    </td>
                );
            }
    
            console.log("blanks: ", blanks);
    
            let daysInMonth = [];
            for (let d = 1; d <= this.daysInMonth(); d++) {
                let className = (d == this.currentDay() ? "day current-day": "day");
                let selectedClass = (d == this.state.selectedDay ? " selected-day " : "")
                daysInMonth.push(
                    <td key={d} className={className + selectedClass} >
                        <span onClick={(e)=>{this.onDayClick(e, d)}}>{d}</span>
                    </td>
                );
            }
    
    
            console.log("days: ", daysInMonth);
    
            var totalSlots = [...blanks, ...daysInMonth];
            let rows = [];
            let cells = [];
    
            totalSlots.forEach((row, i) => {
                if ((i % 7) !== 0) {
                    cells.push(row);
                } else {
                    let insertRow = cells.slice();
                    rows.push(insertRow);
                    cells = [];
                    cells.push(row);
                }
                if (i === totalSlots.length - 1) {
                    let insertRow = cells.slice();
                    rows.push(insertRow);
                }
            });
    
            let trElems = rows.map((d, i) => {
                return (
                    <tr key={i*100}>
                        {d}
                    </tr>
                );
            })
    
            return (
                <div className="calendar-container" style={this.style}>
                    <table className="calendar">
                        <thead>
                            <tr className="calendar-header">
                                <td colSpan="5">
                                    <this.MonthNav />
                                    {" "}
                                    <this.YearNav />
                                </td>
                                <td colSpan="2" className="nav-month">
                                    <i className="prev fa fa-fw fa-chevron-left"
                                        onClick={(e)=> {this.prevMonth()}}>
                                    </i>
                                    <i className="prev fa fa-fw fa-chevron-right"
                                        onClick={(e)=> {this.nextMonth()}}>
                                    </i>
    
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {weekdays}
                            </tr>
                            {trElems}
                        </tbody>
                    </table>
    
                </div>
    
            );
        }

    }



export default Dates;