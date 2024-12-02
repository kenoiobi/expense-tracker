import './style.css'
import { useState } from "react";

function Balance(props){

  var value = 0;
  props.trans.map(
    t => {
      value += Number(t.amount);
    }
  )

  return(
    <div>
      <p className="header">YOUR BALANCE:</p>
      <p className="balance">${value}</p>
    </div>
  )
}

function IncomeExpense(props){

  var income = 0;
  var expense = 0;

  var values = [];

  props.trans.map(t => {
    values.push(t.amount)
  })

  var positives = values.filter((value) => {if(value >0) return value})

  var negatives = values.filter((value) => {if(value < 0) return value})

  for(var i = 0; i < positives.length; i++){
    income += Number(positives[i]);
  }

  for(var i = 0; i < negatives.length; i++){
    expense += Number(negatives[i]);
  }


  return(
    <div className="incomeexpense">
      <div className="leftbox">
        <p>INCOME</p>
        <p className="greentext">${income}</p>
      </div>
      <div className="vline"/>
      <div className="rightbox">
        <p>EXPENSE</p>
        <p className="redtext">${Math.abs(expense)}</p>
      </div>
    </div>
  )
}

function Transactions(props){
  var trans = props.trans;
  return(
    <div>
      {trans.map(t => {
        var color = "redbox"
        if(t.amount > 0){
          color = "greenbox";
        }

        function amount(){
          if(t.amount > 0){
            return "+" + t.amount;
          }
          return t.amount;
        }

        return(
          <div className="transaction">
            <div className="transinside">
              <p>{t.name}</p>
              <p>{amount()}</p>
            </div>
            <div className={color}/>
          </div>
        )
      
      })}
    </div>
  )
}

function AddTrans(props){

  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");

  function handleAddTrans(){
    var trans = {name: text, amount: amount};
    props.setTrans(t => [...t, trans])
  }

  return(
    <div>
      <p className="header bottomtitle">Add New Transaction</p>
      <p className="text">Text</p>
      <div className="input">
        <input onChange={e => {setText(e.target.value)}} placeholder="Enter text..."/>
      </div>
      <p className="text">Amount</p>
      <p className="text negative">(negative - expense, positive - income)</p>
      <div className="input">
        <input onChange={e => {setAmount(e.target.value)}} placeholder="Enter amount..." type="number"/>
      </div>
      <div className="button">
        <button onClick={handleAddTrans}>Add Transaction</button>
      </div>
    </div>
  )
}

function App() {

  const [trans, setTrans] = useState([
    {name: "Ipad", amount: -100},
    {name: "Salary", amount: 300}
  ])


  return (
    <div className="App">
      <p className="title">Expense Tracker</p>
      <Balance trans={trans}/>
      <IncomeExpense trans={trans}/>
      <p className="header bottomtitle">History</p>
      <Transactions trans={trans} setTrans={setTrans}/>
      <AddTrans trans={trans} setTrans={setTrans}/>
    </div>
  );
}

export default App;
