import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
  constructor( props ) {
    super(props);
    this.state = {
      data: [
        { name: "Yura", salary: 17800, increase: false, rise: false, id: 1, },
        { name: "Vasya", salary: 9800, increase: false, rise: false, id: 2, },
        { name: "Igor", salary: 7800, increase: false, rise: false, id: 3, },
        { name: "Igor1", salary: 7800, increase: false, rise: false, id: 4, },
        // add
        // { name: "Igor111", salary: 7800, increase: false, rise: false, id: 5, },

      ],
      term: '',
      filter: 'all',
    }
    this.maxId = this.state.data.length + 1;
    console.log( this.maxId + " this.maxId" );
  }
  
  deleteItem = ( id ) => {
    this.setState(( {data} ) => {
        // const index = data.findIndex( elem => elem.id === id );
        // console.log(index);
        // const before = data.slice( 0, index ); // вирізаємо від 0 ел до потрібного
        // const after = data.slice( index + 1 ); //вирізаємо від потрібного елементу до кінця
        // const newArr = [ ...before, ...after ];
        
        return {
          data: data.filter( elem => elem.id !== id )
          // data: newArr
        };
    });
  };

  // addItem = ( name , salary  ) => {
  // // addItem = ( value ) => {

  //   console.log( 'addItem value', name, salary );
    
  //   let id = this.state.data.length + 1;
  //   let getNewState = ( { salary, name } ) => {
  //     let data = this.state.data;
  //     let newObj = { 
  //       name: name,
  //       salary: +salary,
  //       increase: false,
  //       rise: false,
  //       id: id,
  //     };
      
  //     let mix = [ ...data, newObj ];
      
  //     return {
  //       data: mix
  //     };
  //   }
  //   this.setState( getNewState({ salary, name }) );
  // };

  addItem = (name, salary) => {
    let ifNumber = null;

    // провірка на коректність ввода даних

    let arrOfNumber = [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '0' ];

    // name.split('')[i]
    
    let nameArr = name.split('');
    
    for ( let i = 0; i < name.length; i++ ) {

      for ( let j = 0; j < arrOfNumber.length; j++  ) {

        let test = arrOfNumber[j].indexOf( nameArr[i] );

          if (  test !== -1 ) {
            ifNumber = true;
          } 
      }
    
    }

    // TODO ЗНАТЬ ЧЁТКО на чём споткнётся и что вернёт. 
    // 2 || true || false || 10 // return ?
    // 2 && true && false && 10 // return ?

    if ( 
      name === "" 
      ||  salary === "" 
      ||  name < 3 
      // || ifNumber === true 
      ) {
      alert("error! enter correct data");
    } else {
      const newItem = {
        name, 
        salary,
        increase: false,
        rise: false,
        id: this.maxId++
        
      }
      
  
      this.setState( ({data}) => {
        const newArr = [...data, newItem];
        return {
            data: newArr
        }
  
      });
     
    }

  }
   

onToggleProp = ( id, prop )  => {
  
  this.setState(( { data } )  => ({ 
    data: data.map ( item => {
      if ( item.id === id  ) {
        return { ...item, [prop]: !item[prop] } 
      }
      return item;
    })  
  }))

}


// FIX don't repeat yourself 
//-----------------------------------------
// onToggleIncrease = ( id )  => {
  
//   this.setState(( { data } )  => ({ 
//     data: data.map ( item => {
//       if ( item.id === id  ) {
//         return {...item, increase: !item.increase} 
//       }
//       return item;
//     })  
//   }))

// }


// onToggleRise = ( id )  => {
//   this.setState(( { data } )  => ({ 
//     data: data.map ( item => {
//       if ( item.id === id  ) {
//         return {...item, rise: !item.rise} 
//       }
//       return item;
//     })  
//   }))

// }

//-----------------------------------------------------

searchEmp = ( dataItem, term,  ) => {
 

  if ( term.length === 0 ) {
    return dataItem;
  } 
  return dataItem.filter(item => {
    return item.name.indexOf( term ) > -1
  })
}

onUpdateSearchGlobal = (term) => {
  this.setState({ term });
}

filterPost = ( items, filter ) => {
   switch (filter) {
      case 'rise':
          return items.filter(item => item.rise);
      case 'moreThen100':
        return items.filter(item => item.salary > 10000);
        case 'increase':
          return items.filter( item => item.increase );
      default: 
        return items;

   }
  
}


onFilterSelect = (filter) => {
  this.setState({filter});
}

render() {
  const { data, term, filter } = this.state;
  
  const employees = this.state.data.length;
  
  const increased = this.state.data.filter( item => item.increase ).length;
  //--------------------------------------------------------
  const visibleData = this.filterPost(this.searchEmp(data, term), filter);
  //--------------------------------------------------------- Створення нового масиву
  return (
    <div className="app">
        <AppInfo  employees = { employees } increased = { increased }/>

        <div className="search-panel">
            <SearchPanel
            onUpdateSearchGlobal = { this.onUpdateSearchGlobal }
            />
            <AppFilter
            filter = { filter } onFilterSelect={this.onFilterSelect}
            />
        </div>
        
        <EmployeesList 
          data={ visibleData }
          onDelete={  this.deleteItem }
          // onToggleIncrease = {this.onToggleIncrease}
          // onToggleRise = { this.onToggleRise }
          onToggleProp = { this.onToggleProp }
        />
        <EmployeesAddForm  
          onAddItem={ this.addItem }
        />
    </div>
  );
}

  
}
//------------------------------------------------------------- TODO переписать и нарисовать стрелочки (!) -- start
// // this function is parent component
// function A1() {
  //   // code
  //   let props = {
    //     data: {},
    //     handlers: { onChange: A2 }
    //   };
    //   B1( props )
    // }
    
    // // this function change state for A1
    // function A2(params) {
      //   // setState( params )
      // }
      
      // // this function is child component
      // function B1(props) {
        //   // code props
        //   let value = 'test'
        //   props.handlers.onChange( value )
        // }
  //------------------------------------------------------------- TODO end
        
// async function sDelete( id ) {
//   console.log( 'server deleted item with id ' + id );
  
//   updateData();
// }

// function updateData() {

// }

export default App;
