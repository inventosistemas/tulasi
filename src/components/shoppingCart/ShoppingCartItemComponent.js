import React from 'react'
import { Link } from 'react-router'

export const ShoppingCartItem = (props) => {
  const { item, onQuantityChange, onExcludeItem } = props
  return (
    <tr className="cart_item">
      <td className="cell_1">
        <div className="cart_item__img">
          <Link to={`/produtos/${item.ProdutoID}`}>
            <img src={item.ProdutoImagem} alt={item.ProdutoDescricao} />
          </Link>
        </div>
        <div className="cart_item__info">
          <h3 className="cart_item__name product_name">
            <Link to={`/produtos/${item.ProdutoID}`}>{item.ProdutoDescricao}</Link>
          </h3>
          <div className="cart_item__details">
            {/* <p className="item_type"><span>Tipo do produto: </span>{item.ProdutoTipo ? item.ProdutoTipo : "Tipo não disponível"}</p> */}
            <p className="item_vendor"><span>Vendedor:</span> {item.Marca ? item.Marca : "Marca não disponível" }</p>
            <p className="item_weight"><span>Peso:</span> {item.Peso ? (item.Peso.toLocaleString('pt-BR', { minimumFractionDigits: 3 }) + 'kg') : "" }</p>
          </div>
        </div>
      </td>
      <td className="cell_2 cart_price">
        <span className="money">{`R$${item.ValorUnit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
      </td>
      <td className="cell_3">
        <div className="quantity_box">
          <input value={item.Quantidade ? item.Quantidade : 0} readOnly={true} className="quantity_input" type="text" />
          <span onClick={() => {
            if (item.Quantidade === 1) {
              return
            } else {
              onQuantityChange(item.Id, item.Quantidade - 1)
            }
          }} className="quantity_modifier quantity_down"><i className="fa fa-minus" /></span>
          <span onClick={() => onQuantityChange(item.Id, item.Quantidade + 1)} className="quantity_modifier quantity_up"><i className="fa fa-plus" /></span>
        </div>
      </td>
      <td className="cell_4 cart_price">
        <span className="money">{`R$${(item.ValorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}</span>
      </td>
      <td className="cell_5">
        <a onClick={() => onExcludeItem(item.Id)} className="cart_item__remove syligo-topbar-cursor"><i className="fa fa-trash" /></a>
      </td>
    </tr>
  )
}
