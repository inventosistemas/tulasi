import React, { Component, PropTypes } from 'react'
import styled from 'styled-components';
import AddressAddForm from '../account/AddressAddFormComponent'

const AddressModalDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 85%;
  background: #fff;
  text-align: center;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);
  z-index: 9997;
  /*height: 70%;*/
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

const ModalContentWrapper = styled.div`
  padding: 5px 0px !important;
`

export default class ChangeAddressModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
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
              <h4 className="H1ModalTitle">Adicione um Endereço de entrega</h4>
            </div>
          </DivTitleGreyLighterRow>
          <ModalContentWrapper className="row">
            <div className="col-sm-9 nopadding">

              <div className="col-sm-12 columns add-new">
                <p className="text-left text-uppercase"></p>
                <AddressAddForm isFromAccount={true} showCancelButton={false} className="col-sm-12 form form-horizontal" onClose={() => this.props.onClose()}/>

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
