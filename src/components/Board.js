import React, { Component } from 'react'
import Row from './Row'
export default class Board extends Component {
  constructor(props){
    super(props);
    this.state={
      rows: this.createBoard(props)
    }
  }
  
  
  
  createBoard = props=>{
        let board = [];
        for(let i = 0; i<props.rows;i++){
          board.push([])
          for (let j = 0; j < props.columns; j++) {
            board[i].push({
              x: i,
              y: j,
              count: 0,
              isOpen: false,
              hasMine: false,
              hasFlag: false
            });
            
          }
        }
        for (let i = 0; i < props.mines; i++) {
          let randomRow = Math.floor(Math.random()* props.rows);
          let randomColumn = Math.floor(Math.random()* props.columns);
          let cell = board[randomRow][randomColumn];
          if(cell.hasMine){
            i--;
          }else{
            cell.hasMine = true;
          }
          
        }
        return board; 
    }
     
  open = cell => {
    if (this.props.status === "ended") {
      return;
    }
   
    let asyncCountMines = new Promise(resolve => {
      let mines = this.findMines(cell);
      resolve(mines);
    });

    asyncCountMines.then(numberOfMines => {
      let rows = this.state.rows;

      let current = rows[cell.y][cell.x];

      if (current.hasMine && this.props.openCells === 0) {
        console.log("mine was on first click");
        let newRows = this.createBoard(this.props);
        this.setState({ rows: newRows }, () => {
          this.open(cell);
        });
      } else {
        if (!cell.hasFlag && !current.isOpen) {
          this.props.onCellClick();

          current.isOpen = true;
          current.count = numberOfMines;

          this.setState({ rows });
          // now that we know its not a flag and its not a BOMB we should try to open cells around it!
          if (!current.hasMine && numberOfMines === 0) {
            this.openAroundCell(cell);
          }

          if (current.hasMine && this.props.openCells !== 0) {
            this.props.endGame();
          }
        }
      }
    });
  };



  render() {
    let rows = this.state.rows.map(( row,index) =>{
      return <Row cells = {row} key={index}/> 
  
    }) 
    return (
      <div className="board">
        {rows}
        
      </div>
    )
  }
}
