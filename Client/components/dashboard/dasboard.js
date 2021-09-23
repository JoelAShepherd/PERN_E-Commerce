import React, {useMemo} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserName } from '../login/loginSlice';
import { api } from '../../api/api';
import { uploadOrders, selectOrders } from './dashboardSlice';
import { useTable } from 'react-table';

import './dashboard.css'


export default function Dashboard() {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)
  const ordersFetched = useSelector(selectOrders)

  const OHbuttonClick = async () => {
    const orders = await api.getOrderHistory()
    console.log('Orders in dashboard: ', orders)
    dispatch(uploadOrders(orders))
  }

  const columns =  [
      {
        Header: 'Order Number',
        accessor: 'order_id'
      },
      {
        Header: 'Date',
        accessor: 'order_date'
      },
      {
        Header: 'Items',
        accessor: 'json_items_ordered'
      },
      {
        Header: 'Cost',
        accessor: 'cost'
      },
      {
        Header: 'Status',
        accessor: 'order_status'
      }
    ]
  
    console.log('ti check')
    console.log('Columns: ', columns)
    console.log('ordersFetched', ordersFetched)

  const tableInstance = useTable({columns, data: ordersFetched})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance
  

  return(
    <div>
      <h2>Dashboard</h2>
      <p>Hello {userName}</p>
      <h3>Order History</h3>
      <button onClick={OHbuttonClick}>OH</button>
      <div className='orderHistoryContainer'>
      <table {...getTableProps()}>
     <thead>
       {// Loop over the header rows
       headerGroups.map(headerGroup => (
         // Apply the header row props
         <tr {...headerGroup.getHeaderGroupProps()}>
           {// Loop over the headers in each row
           headerGroup.headers.map(column => (
             // Apply the header cell props
             <th {...column.getHeaderProps()}>
               {// Render the header
               column.render('Header')}
             </th>
           ))}
         </tr>
       ))}
     </thead>
     {/* Apply the table body props */}
     <tbody {...getTableBodyProps()}>
       {// Loop over the table rows
       rows.map(row => {
         // Prepare the row for display
         prepareRow(row)
         return (
           // Apply the row props
           <tr {...row.getRowProps()}>
             {// Loop over the rows cells
             row.cells.map(cell => {
               // Apply the cell props
               return (
                 <td {...cell.getCellProps()}>
                   {// Render the cell contents
                   cell.render('Cell')}
                 </td>
               )
             })}
           </tr>
         )
       })}
     </tbody>
   </table>

      </div>
    </div>
  );
}

/* 



*/