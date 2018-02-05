import React from 'react'
import Breadcrumb from '../reusable/breadcrumbComponent'
import { Link } from 'react-router'

export const ShoppingCartEmpty = (props) => {
  const pageTitle = "Minha cesta de compras"
  return(
    <div>
      <Breadcrumb pageTitle={pageTitle} />

      <div id="main" role="main">
        <div className="container">
          <div className="row">
             <div className="main_content  col-sm-12">
               <div className="cart_page">
                 <div id="cart_loader" className="loader_off">
                   <div className="global_loader"></div>
                 </div>

                 <h1 className="page_heading">{pageTitle}</h1>

                 <div id="cart_content">
                   <div className="cart_empty">
                     <p className="alert alert-warning">Você ainda não adicionou itens a sua cesta :(</p>
                     <h4><Link to="/produtos">Continue comprando e adicione os produtos que você gosta</Link></h4>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
  )
}
