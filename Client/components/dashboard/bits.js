if (ordersFetched) {
    console.log('IF ordersFetched: ', ordersFetched)
    rows = (ordersFetched.map((order, index) => {
    const { order_id, order_date, cost, order_status } = order;
    const items = order.json_items_ordered.items;
    return(
      <tr key={index} className='orderContainer'>
          <td>{order_id}</td>
          <td>{order_date}</td>
          <td className='orderItemsContainer'>
              {(items.map((item, index) => <OrderItem key={index} item={item} />))}
          </td>
          <td>{cost}</td>
          <td>{order_status}</td>
      </tr>
      )
  }))}

<table>
          <thead>
            <tr>
              <th>Order Number:</th>
              <th>Date:</th>
              <th>Items:</th>
              <th>Cost:</th>
              <th>Status:</th>
            </tr>
          </thead>
          <tbody>
          {ordersFetched ? rows : 'No orders fetched yet'}
          </tbody>
        </table>



///////

const transformSingleOrderData = order => {
    console.log('transform single order called');
      const {order_id, order_date, cost, order_status} = order
     const rawItems = order.json_items_ordered.items
     console.log('Raw Items: ', rawItems)
     let formatedItems = []
     rawItems.forEach(item => {
       formatedItems.push(`${item.product_name}: ${item.quantity}`)
     })
     console.log('formated items', formatedItems)
     const formatedOrder = {
       'order_id': order_id,
       'json_items_ordered': formatedItems,
       'order_date': order_date,
       'cost': cost,
       'order_status': order_status
     }

     return formatedOrder
  }

  const transformAllOrderData = ordersFetched => {
    console.log('Transform all orders called')
    let transformedOrders = [];
    ordersFetched.forEach(order => {
      transformedOrders.push(transformSingleOrderData(order))
    })
    console.log('Transformed Orders: ', transformedOrders)
    return transformedOrders;
  } 

  //

  {'items': [
    {'product_name': 'Beanz', 'quantity': 1},
    {'product_name': 'Ham', 'quantity': 2}
]},

{'items': [
    {'product_name': 'Beanz', 'quantity': 3},
    {'product_name': 'Ham', 'quantity': 4}
]},

const orders = await api.getOrderHistory()
                console.log('Orders in login component on login first time: ', orders)
                dispatch(uploadOrders(orders))


// ******************** React Table Code

import { useTable } from 'react-table'; , {useMemo} 

const data = useMemo(() => ordersFetched)

  const columns =  useMemo (() =>[
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
    ])
  

  const tableInstance = useTable({columns, data})

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

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