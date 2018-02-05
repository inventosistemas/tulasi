import React from 'react';
import styled from 'styled-components';

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

const ModalContentWrapper = styled.div`
  padding: 5px 0px !important;
`

const QuantityError = (props) => {
  return(
    <AddressModalDiv>
      <ModalContentWrapper className="row">
        <div className="modalbg-error" >
          <b className="modal-error-text">{props.message}</b>
        </div>
      </ModalContentWrapper>
    </AddressModalDiv>
  );
}

export default QuantityError;
