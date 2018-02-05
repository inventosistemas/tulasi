import React from 'react'

export const ShoppingCartSteps = (props) => {
  const { step } = props
  return (
    <div className="row steps">
       <div className="col-sm-12 columns">
         <div className={`col-sm-4 col-md-4 columns text-right step ${ step === 1 ? "active" : ""}`}>
           <span className="number">1</span>
           <span>Carrinho</span>
         </div>
         <div className={`col-sm-4 col-md-4 columns text-center step ${ step === 2 ? "active" : ""}`}>
           <span className="number">2</span>
           <span>Pagamento</span>
         </div>
         <div className={`col-sm-4 col-md-4 columns text-left step ${ step === 3 ? "active" : ""}`}>
           <span className="number">3</span>
           <span>Conclusão</span>
         </div>
       </div>
     </div>
  )
}
