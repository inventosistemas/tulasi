import React from 'react'

export const ShoppingCartSummaryModal = (props) => {
  //console.log("ShoppingCartSummaryModal")
  //console.log(props)

  const { shoppingCartSelectedAddress, shoppingCartServer, onContinue, onClose, selectedShippingOption } = props

  const total = selectedShippingOption !== null ? shoppingCartServer.SubTotal + selectedShippingOption.ValorServicoEntrega : shoppingCartServer.SubTotal + 0;

  return (

    <div className="fd-modal modal-resumo">
      <div className="title grey lighter row fixmargin">
        <div className="col-sm-12">
          <h4 className="H1ModalTitle">Resumo</h4>
          <div className="close" onClick={() => {console.log("fechou modal"); onClose()}}>x</div>
        </div>
      </div>
      <div className="content">
        <table className="col-sm-12 fd-table">
          <tbody><tr>
              <td className="paddingless-on-mobile">
                <div className="col-sm-12 col-md-12 columns paddingless sumario">
                  {/* @*sumário*@ */}
                  <div className="col-sm-12 col-md-7 left paddingless-on-mobile produtos-scroll-holder">
                    {/* @*produtos*@ */}
                    <table className="col-sm-12 fd-table product-table">
                      <thead>
                        <tr className="col-sm-12 paddingless">
                          <th className="col-sm-8 columns">produto</th>
                          <th className="col-sm-4 columns">Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        { shoppingCartServer ? shoppingCartServer.Itens.map(item => {
                          return (
                            <tr key={item.Id} className="col-sm-12 paddingless list">
                              <td className="col-sm-8"><span className="quantidade">{`${item.Quantidade}x`}</span> {item.ProdutoDescricao} {item.Tipo} {item.Marca}</td>
                              <td className="col-sm-4 money borderless">R$ {item.ValorUnit.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                            </tr>
                          )
                        }) : ""}
                      </tbody>
                    </table>
                  </div>
                  {/* @*forma de pagamento*@ */}
                  <div className="col-sm-12 col-md-5 columns paddingless right">
                    <div className="col-sm-12 columns grey box-content-sumario">
                      <h3>Forma de pagamento</h3>
                      <p>Cartão de crédito</p>
                      {/* <p>pedidodata.DadosCartao.Numero</p> */}
                    </div>
                    <div className="col-sm-12 col-md-12 columns box-content-sumario">
                      <h3>{ selectedShippingOption !== null ? selectedShippingOption.ProgramacaoEntregaDescricao : "RETIRADA NA LOJA*" }</h3>
                      { selectedShippingOption !== null && selectedShippingOption.ProgramacaoEntregaID === 3 ?
                        <div>
                          Rua das Graças, 178 – Recife/PE
                           <b style={{color: 'red', fontSize: '10px', display: 'block'}} >* Hortifruti apenas às quartas-feiras </b>
                        </div>
                        :
                        <p>
                          {`${shoppingCartSelectedAddress.Logradouro}, ${shoppingCartSelectedAddress.Numero}, ${shoppingCartSelectedAddress.Complemento} - ${shoppingCartSelectedAddress.CEP}, ${shoppingCartSelectedAddress.Bairro}`} <br />
                          {`${shoppingCartSelectedAddress.Cidade.Nome} - ${shoppingCartSelectedAddress.Cidade.Estado.Nome}`}
                        </p>
                      }
                    </div>
                    <div className="col-sm-12">
                      {/* @*produtos*@ */}
                      <table className="col-sm-12 fd-table product-table">
                        <tbody><tr className="col-sm-12 columns paddingless list total">
                            <td className="col-sm-12 columns paddingless-on-mobile">
                              <table className="col-sm-12 table-sumario">
                                <tbody className="borderless">
                                  <tr>
                                    <td className="text-right col-md-8 col-sm-6">Subtotal</td>
                                    <td className="text-left col-md-4 col-sm-6"> R$ {shoppingCartServer.SubTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                  </tr>
                                    {
                                      selectedShippingOption === null ? 
                                        <tr>
                                          <td className="text-right col-md-8 col-sm-6 columns">Frete</td>
                                          <td className="text-left col-md-4 col-sm-6 columns">R$0,00"</td>
                                        </tr>
                                        :
                                        <tr>
                                          <td className="text-right col-md-8 col-sm-6 columns">Frete</td>
                                          <td className="text-left col-md-4 col-sm-6 columns">R$ { selectedShippingOption.ValorServicoEntrega.toLocaleString('pt-BR', {minimumFractionDigits: 2}) }</td>
                                        </tr>                                        
                                    }
                                  <tr>
                                    <td className="text-right col-md-8 col-sm-6 columns">Desconto</td>
                                    <td className="text-left col-md-4 col-sm-6 columns">R$ {shoppingCartServer.ValorDesconto.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                  </tr>
                                  <tr>
                                    <td className="text-right col-md-8 col-sm-6 columns total">Total</td>
                                    <td className="text-left col-md-4 col-sm-6 columns money valor">R$ {total.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody></table>
        <div className="col-sm-12 paddingless">
          <button
            type="button"
            className="btn fd-button fd-secondary fd-large fd-full-width float-right bt-confirmar"
            onClick={() => onContinue()}>{(props.isPostingSaveOrder===true) ? "Gravando pedido..." : "continuar"}</button>
        </div>
      </div>
    </div>
  );
};
