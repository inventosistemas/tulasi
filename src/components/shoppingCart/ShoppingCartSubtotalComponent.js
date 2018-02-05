import React from 'react'
import "./css/carrinho.css"

import "./css/carrinho.css"


export const ShoppingCartSubtotal = (props) => {
    const { shoppingCartServer, selectedShippingOption } = props
    console.log("sc-subtotal", props);
    let total = selectedShippingOption ? shoppingCartServer.SubTotal + selectedShippingOption.ValorServicoEntrega : shoppingCartServer.SubTotal + 0;

    const applyDiscount = value => {
        if (shoppingCartServer.ValorDesconto) {
            return value - shoppingCartServer.ValorDesconto
        }
        return value
    }

    return (
        <div className="total">
            <p className="titulo futura-bold"> Total </p>
            {/* //subtotal */}
            <div className='flex-row'>
                <div className='flex-col-xs-6'>
                    <p>Subtotal</p>
                </div>
                <div className='flex-col-xs-6'>
                    <p className="valor-unico">R$&nbsp; {shoppingCartServer ? shoppingCartServer.SubTotal.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}</p>
                </div>
            </div>
            {/* //frete */}
            <div className='flex-row'>
                <div className='flex-col-xs-6'>
                    <p>Frete</p>
                </div>
                <div className='flex-col-xs-6'>
                    <p className="valor-unico">R$&nbsp; {selectedShippingOption ? selectedShippingOption.ValorServicoEntrega.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}</p>
                </div>
            </div>
            {/* //desconto */}
            <div className='flex-row'>
                <div className='flex-col-xs-6'>
                    <p>Desconto</p>
                </div>
                <div className='flex-col-xs-6'>
                    <p className="valor-unico">R$&nbsp; {shoppingCartServer ? shoppingCartServer.ValorDesconto.toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}</p>
                </div>
            </div>

            {/* //total */}
            <div className='flex-row'>
                <div className='flex-col-xs-6'>
                    <p>Total</p>
                </div>
                <div className='flex-col-xs-6'>
                    <p className="valor-unico">R$&nbsp; {shoppingCartServer ? applyDiscount(total).toLocaleString('pt-br', { minimumFractionDigits: 2 }) : 0}</p>
                </div>
            </div>
        </div>
    )
}
