import React from "react"
import styled from 'styled-components'

export const ModalComponent = props => {
  console.log("ModalComponent")
  console.log(props)

  if (props.modalType === "MODAL_LOADING") {
    //defines the wrapper
    const DivModalWrapper = styled.div`
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      top: 50%;
      left: 50%;
      position: fixed;
      transform: translate(-50%, -50%);
      align-items: center;
      -webkit-align-items: center,
      padding: 15px;
      background: #fff;
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 20px;
      color: #532d54;
    `;

    return (
      <div className="modalbg" style={ {display: 'block', zIndex : 10000}}>
        <DivModalWrapper>
          <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i></div>
          <div style={{fontFamily : "garden_grownregular"}}>
            <p style={{"margin" : "10px 0px 0px 0px"}}>Carregando...</p>
          </div>
        </DivModalWrapper>
      </div>
    )
  }

  return(
    <div className="modalbg" style={ {display: 'block', zIndex : 10000}}>
      {props.children}
    </div>
  )
}

export default ModalComponent
