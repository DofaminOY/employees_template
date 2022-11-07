import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor( props ) {
        super(props);
        this.initState =  {
            name: "",
            salary: "",
        };

        this.state = this.initState;
    }
    onValueChange = (e, isNeedValid = false ) => {
        let { name, value } = e.target;
        let isCanSetState = !isNeedValid || ( isNeedValid && this.isValid( value ) );

        if ( isCanSetState )
        this.setState({
            // { salary: "text" }
            [ name ] : value
        });

        // let stateUpdate = {};
        // stateUpdate[e.target.name] = e.target.value;
        // this.setState( stateUpdate );

        // if ( e.target.name === 'salary' ) {
        //     this.setState({ salary: e.target.value })
        // } else if ( e.target.name === 'name' ) {
        //     this.setState({ name: e.target.value });
        // }
    }

    // onAddItem = ( e ) => {
    //     e.preventDefault();
        
    //     // code 
    //     const { name, salary } = this.state;
    //     this.props.onAddItem( name, salary );
        
    //     // clear/reSet state 
    //     this.setState( this.initState );
        

    // }

    onAddItem = (e) => {
        e.preventDefault();
        this.props.onAddItem(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }
   
    render () {
        const { name, salary } = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex"
                >
                    <input 
                        type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?" 
                        name="name"
                        value={ name }
                        // window.onClick = (e) => this.onValueChange( e, true )
                        onChange={ (e) => this.onValueChange( e, true ) }
                        // onChange={ this.testHandler }
                        // pattern="[a-z]{1,15}"
                    />

                    <input 
                        type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?" 
                        name="salary"
                        value={ salary }
                        // window.onClick = this.onValueChange
                        onChange={ this.onValueChange }
                    />
                    <button 
                        type="submit"
                        className="btn btn-outline-light"
                        onClick={ this.onAddItem }
                    >Добавить</button>
                </form>
            </div>
        )
    }

    testHandler = ( event ) => {
        console.log( 'testHandler started' );
        console.log('event', event );
        let val = event.target.value;


        if ( this.isValid( val ) )
        this.setState({
            // { salary: "text" }
            [ event.target.name ] : event.target.value
        });
    };

    isValid = ( data ) => {
        let res = false;

        let isCondition = allLetter( data );
        if ( isCondition ) {
            //  code
            res = true;
        } 
        // else {
        //     // code 2
        //     res = false;
        // }
        return res;
    };
    
}

export default EmployeesAddForm;

function allLetter( value )  {
    // var letters = /^[A-Za-z]+$/;
    var letters = /[0-9]/g;
    if ( value.match(letters) ) {
        console.log( 'numbers is founded' );
        return false;
    } else {
        console.log( 'numbers is NOT founded' );
        return true;
    }
}
  