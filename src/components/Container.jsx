import { useEffect, useState } from "react";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import { toast } from "react-toastify";
import BalanceContainer from "./Balancecontainer";
const Container = () => {
    const [transactions, setTransactions] = useState([])
    const [editItem, setEditItem]= useState(null)

    const addExpense = async (title,amount) => {
        await fetch("https://expense-backend-n20u.onrender.com/addExpense",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({title,amount})
        })
        toast.success("Transaction added successfully!")
        getAllExpense()
    };

    useEffect(()=>{
        getAllExpense();
    },[])

    const getAllExpense = async()=>{
        const response = await fetch("https://expense-backend-n20u.onrender.com/getAlldata");
        const data= await response.json();
        setTransactions(data);
    }

    const deleteExpense= async (id)=>{
        await fetch("https://expense-backend-n20u.onrender.com/deleteExpense",{
            method:"DELETE",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id})
        });
        getAllExpense();
        toast.error("History Deleted!!")

    }

    const updateExpense=async(id,title,amount)=>{
        await fetch("https://expense-backend-n20u.onrender.com/editExpense",{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id,title,amount})
        })
        getAllExpense();
    }
    const editExpense=(item)=>{
        setEditItem(item)
    }
    return (
        <div className="container">
            <h2>Expense Tracker</h2>
            <BalanceContainer transactions={transactions} />
            <History transactions={transactions} deleteExpense={deleteExpense} editExpense={editExpense}/>
            <ExpenseForm addExpense={addExpense} editItem={editItem} setEditItem={setEditItem} updateExpense={updateExpense}/>
        </div>
    )
}
export default Container;
