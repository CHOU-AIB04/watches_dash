import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import curren from "../../assets/curren1.png"
import { Data } from '../../context/watch';
import { format } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const Order = () => {
    let {setOrders,Orders} = useContext(Data)
   const handledelete = (id,qte,prod)=>{
    console.log(prod)
    confirmAlert({
        title: 'Confirm to delete',
        message: 'Are you sure you want to delete this order?',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
                axios.delete(`http://localhost/MY_PROJECTS/watches_project/Order.php?type=order_details&item=${id}&qte=${qte}&prod=${prod}`).then((res)=>{
                    toast.success("you order is sucessfuly deleted")
                 })
            }
          },
          {
            label: 'No',
            onClick: () => ""
          }
        ]
      });
   }
   const commande_date = new Date();
  const format_day = format(commande_date,"yyyy-MM-dd");
  return (
  <>
  {
    Orders.length !== 0 ?
    <section className='mt-20 w-[95%] relative left-1/2 -translate-x-1/2 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-2'>
        {
            Orders.map((order)=>{
                return(
                    <>
                        <nav className='w-full h-auto relative flex rounded-md sh pb-2' key={parseInt(order.order_id)}>
                            {
                                format_day === order.Date ? <p className='w-[40px] h-[40px] rounded-full bg-green-700 text-white absolute top-0 left-0 flex justify-center items-center text-sm font-bold'>New</p> :<></>
                            }
                            <div className='w-[150px] md:w-[200px] flex justify-center'>
                                <img src={`http://localhost/MY_PROJECTS/watches_project/assets/${order.Type}/${order.Pic}`} alt="watch" className='w-[50%] h-[200px] mix-blend-multiply transition-all duration-300 hover:scale-105 cursor-pointer'/>
                            </div>
                            <div className='space-y-3'>
                                <p className='font-bold'>Nom du Montre : <span className='text-amber-800'>{order.Nom}</span></p>
                                <div className='flex items-start md:items-center flex-col md:flex-row gap-2 xl:gap-5  text-sm xl:text-[16px]'>
                                    <p className='font-bold'>Nom de client : <span className='text-amber-800'>{order.Nom_client}</span></p>
                                    <p className='font-bold'>Tél : <span className='text-amber-800'>{order.Tel}</span></p>
                                </div>
                                <p className='font-bold'>Date Commande : <span className='text-amber-800'>{order.Date}</span></p>
                                <div className='flex items-start md:items-center flex-col md:flex-row gap-2 xl:gap-5 text-sm xl:text-[16px]'>
                                    <p className='font-bold'>prix : <span className='text-amber-800'>{order.Price}</span> Mad</p>
                                    <p className='font-bold'>Qte : <span className='text-amber-800'>{order.Qte}</span></p>
                                </div>
                                <p className='font-bold'>Total  : <span className='text-amber-800'>{parseInt(order.Price)*parseInt(order.Qte)}</span> Mad</p>
                                <div>
                                    <button className='w-[100px] h-10 text-sm rounded-md sh bg-white text-amber-900 duration-500 transition-all hover:text-white hover:bg-amber-900 flex items-center justify-center gap-3' onClick={()=>handledelete(parseInt(order.order_id),parseInt(order.Qte),parseInt(order.Id))}><MdDelete /> Supprimé</button>
                                </div>
                            </div>
                        </nav>
                    </>
                )
            })
        }
    </section> 
    : <><p className='text-amber-900 font-bold text-center text-[30px] mt-10'>No Order Yet !!</p></>
  }
  </>
  )
}

export default Order