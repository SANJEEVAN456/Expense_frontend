import { useEffect, useState } from "react";

const BalanceContainer = (props) => {
    const {transactions}= props
    const [income, setIncome]= useState(0)
    const [expense, setExpense]= useState(0)
    const [balance, setBalance]= useState(0)

    useEffect(()=>{
        let inc=0
        let exp=0
        let bal=0
        transactions.forEach((tan)=>{
            if(tan.amount < 0){
                exp+=Number(tan.amount)
            } else{
                inc+=Number(tan.amount)
            }
            bal=inc+exp;
        })
        setIncome(inc)
        setExpense(exp)
        setBalance(bal)
    },[transactions])

    return (
        <div className="balance-container">
            <div className="currency-item">
                <div className="title">Income</div>
                <div className="amount green">${income}</div>
            </div>
            <div className="currency-item">
                <div className="title">Expense</div>
                <div className="amount red">${expense}</div>
            </div>
            <div className="currency-item">
                <div className="title">Balance</div>
                <div className="amount">${balance}</div>
            </div>
        </div>
    )
}
export default BalanceContainer;

