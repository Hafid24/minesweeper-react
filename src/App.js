import React, { Component } from 'react'
import Board from './components/Board'



class App extends Component {
 state = {
  rows: 10,
  columns: 10,
   flags: 10,
   mines: 10
 }
 
 
  render() {
    
    return (
      <div>
        <Board rows = {this.state.rows} columns = {this.state.columns}/>
      </div>
    )
    
  }
}

export default App;
