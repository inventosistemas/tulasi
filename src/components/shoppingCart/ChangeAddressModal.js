import React, { Component, PropTypes } from 'react'
import styled from 'styled-components';
import AddressAddForm from '../account/AddressAddFormComponent'

const AddressModalDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background: #fff;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  z-index: 9997;
  height: 80%;
  overflow: scroll;

  @media only screen and (max-width: 40em) {
    width: 85%;
    /*top: 10px;*/
  }

  @media only screen and (min-width: 64.063em) {
    width: 80%;
  }
`;

const DivTitleGreyLighterRow = styled.div`
  margin-left:1px;
  height: 50px;
  background-color: #f7f7f7;
  width: 100%;
`;

const DivCloseTitle = styled.div`
  position: absolute;
  top: -10px;
  right: 35px;
  cursor: pointer;
  font-size: 26px !important;
`

const ModalContentWrapper = styled.div`
  padding: 5px 0px !important;
`

export default class ChangeAddressModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    userAddresses: PropTypes.array,
    onClose: PropTypes.func,
    selectShoppingCartAddress: PropTypes.func
  }

  render() {
    if (this.props.isOpen === false) {
      return null
    }

    return (
      <div className="modalbg" style={ this.props.isOpen ? {display: 'block'} : {display: 'none'}}>
        <AddressModalDiv>
          <DivTitleGreyLighterRow className="row">
            <div className="col-sm-12">
              <h4 className="H1ModalTitle">Selecione ou Adicione um Endereço de entrega</h4>
              <DivCloseTitle onClick={e => this.close(e)}>x</DivCloseTitle>
            </div>
          </DivTitleGreyLighterRow>
          <ModalContentWrapper className="row">
            <div className="col-sm-12 nopadding">
              {/* selected address wrapper */}
              <div className={this.props.isFromShoppingCart ? "col-sm-12 col-md-6" : "col-sm-12"}>
                <p className="text-left text-uppercase left40">Selecione um endereço salvo:</p>
                <div className="address-box scroll col-sm-12 nopadding">
                  {/* address row loop*/}
                  {this.props.userAddresses ? this.props.userAddresses.map((userAddress, i) => {
                    return (
                      <div key={i}
                        className={`col-sm-12 columns endereco ${userAddress.Tipo === 0 ? "selected" : ""}`}
                        onClick={() => {
                          this.props.selectShoppingCartAddress(userAddress);
                          this.props.onClose();
                        }}>
                        <div className="row">
                          <div className="col-sm-12 columns">
                            <div className="title">
                              <div className="name">
                                {userAddress.Identificacao}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12 columns">
                            <div className="description">
                              {`${userAddress.Logradouro}, ${userAddress.Numero}, ${userAddress.Complemento}, ${userAddress.CEP}, ${userAddress.Bairro}`} <br />
                              {`${userAddress.Cidade.Nome}, ${userAddress.Cidade.Estado.Nome}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                  :
                    "Não há endereços"
                  }
                  {/* //end of repeat */}
                </div>
              </div>
              <div className={this.props.isFromShoppingCart ? "col-sm-12 col-md-6 columns add-new" : "col-sm-12 columns add-new"}>
                <p className="text-left text-uppercase">Ou adicione um novo Endereço de Entrega:</p>
                <AddressAddForm isFromShoppingCart={true} showCancelButton={false} className="col-sm-12 form form-horizontal" onClose={() => this.props.onClose()}/>
              </div>
            </div>
          </ModalContentWrapper>
        </AddressModalDiv>
    </div>
    );
  }

  close(e) {
    e.preventDefault()

    if (this.props.onClose) {
      this.props.onClose()
    }
  }
};
