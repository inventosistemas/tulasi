import React, { Component } from 'react'
import { connect } from 'react-redux'
import MaskedInput from 'react-text-mask'
import { getShippingOptionsRequest, selectShippingOption} from '../../actions/deliveryActions';


class CalculateFreightForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cep: null,
      error: null
    }
  }

  componentWillMount() {
    //console.log("calculateFreightForm will mount")
  }

  componentWillReceiveProps(nextProps){
    //console.log("WillReceive, Freight")
    if (nextProps.shippingOptions !== null && this.props.shippingOptions === null) {
      //sets the first shipping option as default
      this.props.selectShippingOption(nextProps.shippingOptions[0])
    }
  }

  handleChange = (e) => {
    let error = null;

    //console.log(e.target.value.charAt(8))
    if (e.target.value.charAt(8) === "_") {
      error = true
    } else {
      error = false
    }
    this.setState({
      cep: e.target.value.replace(/\D/g,''),
      error
    })
  }

  renderFreightResponse = () => {
    if (this.props.selectedShippingOption !== null) {
      let { selectedShippingOption } = this.props
      if (selectedShippingOption.ValorServicoEntrega === 0) {
        return <p>{`Sem frete para ${this.props.selectedShippingOption.ProgramacaoEntregaDescricao}`}</p>
      } else {
        return <p>{`Frete de R$ ${selectedShippingOption.ValorServicoEntrega} para ${selectedShippingOption.ProgramacaoEntregaDescricao}`}</p>
      }
    } else {
      return null
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <label>Calcular frete</label>
        <div className="holder">
          <MaskedInput mask={[/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/]} id="cepcarrinho" className="fd-input cep" placeholder="CEP" onChange={(e) => this.handleChange(e)}/>
          <button onClick={() => this.props.getShippingOptionsRequest(this.props.shoppingCartId, this.state.cep)} type="button" className={`btn fd-button fd-primary float-left btncep ${this.state.error !== false ? "disabled" : ""}`} >Ok</button>
        </div>
        {this.props.freightError !== null ? <p className="ceperror">{this.props.freightError}</p> : null}
        {this.renderFreightResponse()}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
    return {
      shoppingCartId: state.shoppingCart.shoppingCartId,
      freightError: state.delivery.errorFetchingShippingMethods,
      shippingOptions: state.delivery.shippingOptions,
      selectedShippingOption: state.delivery.selectedShippingOption
    };
};

export default connect(mapStateToProps, { getShippingOptionsRequest, selectShippingOption } )(CalculateFreightForm)
