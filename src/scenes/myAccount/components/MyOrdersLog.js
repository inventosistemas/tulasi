import React from 'react'

const renderOrders = ordersData => {
  const id = ordersData.ID;
  const dataVenda = ordersData.DataVenda;
  const valorTotal = ordersData.ValorTotal;

  //Formata a data para modelo Brasileiro
  const formatDate = (dataVenda) =>{
    let ano = dataVenda.slice(0,4);
    let mes = dataVenda.slice(5,7);
    let dia = dataVenda.slice(8,10);

    return dia+"/"+mes+"/"+ano;
  }

    return (
      <tr key={id}>
        <td>{id}</td>
        <td>{formatDate(dataVenda)}</td>
        <td><span className="money" data-currency-usd="$0.00">R$ {valorTotal.toLocaleString('pt-br', { minimumFractionDigits: 2})}</span></td>
      </tr>
    );
}

const MyOrdersLog = ({orders, onViewDetails}) => {

  return (
    <div className="account_section account_orders">
      <h4>Histórico de compras</h4>
      <table className="account_table table_info">
        <tbody>
          <tr>
            <td><b>NÚMERO DO PEDIDO</b></td>
            <td><b>DATA</b></td>
            <td><b>VALOR</b></td>
          </tr>
          {(orders.length > 0) ?
            orders.map(order => renderOrders(order)) : null }
        </tbody>
      </table>
      {orders === null || orders.length === 0 ? <p className="note">Você não fez compras ainda</p> : null}
    </div>
  )
}

export default MyOrdersLog
