import React, { Component } from 'react';
import { connect } from 'react-redux';
import Breadcrumb from "./reusable/breadcrumbComponent";
import { loginFromCheckout } from '../actions/loginActions'


class Checkout extends Component {

  componentWillMount() {
    this.props.loginFromCheckout(false);
  }

  render() {

    return (
      <div>
        <Breadcrumb pageTitle={'Checkout'} />
        {/* Main stuff */}
        <div id="main" role="main">
        <div className="container">
          <div className="row">
            <div className="main_content col-sm-12">
              <div className="content" data-content>
                <div className="wrap">
                  <div className="sidebar" role="complementary">
                    <div className="sidebar__header">
                      <a href="https://theme267-fruits.myshopify.com" className="logo logo--left">
                        <h1 className="logo__text">Fruit Gifts</h1>
                      </a>
                    </div>
                    <div className="sidebar__content">
                      <div className="order-summary order-summary--is-collapsed" data-order-summary>
                        <h2 className="visually-hidden">Order summary</h2>
                        <div className="order-summary__sections">
                          <div className="order-summary__section order-summary__section--product-list">
                            <div className="order-summary__section__content">
                              <table className="product-table">
                                <caption className="visually-hidden">Shopping cart</caption>
                                <thead>
                                  <tr>
                                    <th scope="col"><span className="visually-hidden">Product image</span></th>
                                    <th scope="col"><span className="visually-hidden">Description</span></th>
                                    <th scope="col"><span className="visually-hidden">Quantity</span></th>
                                    <th scope="col"><span className="visually-hidden">Price</span></th>
                                  </tr>
                                </thead>
                                <tbody data-order-summary-section="line-items">
                                  <tr className="product" data-product-id={8636288391} data-variant-id={28022342279} data-product-type="Pears">
                                    <td className="product__image">
                                      <div className="product-thumbnail">
                                        <div className="product-thumbnail__wrapper">
                                          <img alt="Broadway Basketeers Fruit and Nut Crate Gift Tray" className="product-thumbnail__image" src="//cdn.shopify.com/s/files/1/1436/8816/products/broadway_basketeers_fruit_and_nut_crate_gift_tray_1_small.png?7255124124639782910" />
                                        </div>
                                        <span className="product-thumbnail__quantity" aria-hidden="true">1</span>
                                      </div>
                                    </td>
                                    <td className="product__description">
                                      <span className="product__description__name order-summary__emphasis">Broadway Basketeers Fruit and Nut Crate Gift Tray</span>
                                      <span className="product__description__variant order-summary__small-text" />
                                    </td>
                                    <td className="product__quantity visually-hidden">
                                      1
                                    </td>
                                    <td className="product__price">
                                      <span className="order-summary__emphasis">$30.00</span>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="order-summary__scroll-indicator">
                                Scroll for more items
                                <svg xmlns="http://www.w3.org/2000/svg" width={10} height={12} viewBox="0 0 10 12"><path d="M9.817 7.624l-4.375 4.2c-.245.235-.64.235-.884 0l-4.375-4.2c-.244-.234-.244-.614 0-.848.245-.235.64-.235.884 0L4.375 9.95V.6c0-.332.28-.6.625-.6s.625.268.625.6v9.35l3.308-3.174c.122-.117.282-.176.442-.176.16 0 .32.06.442.176.244.234.244.614 0 .848" /></svg>
                              </div>
                            </div>
                          </div>
                          <div className="order-summary__section order-summary__section--total-lines" data-order-summary-section="payment-lines">
                            <table className="total-line-table">
                              <caption className="visually-hidden">Cost summary</caption>
                              <thead>
                                <tr>
                                  <th scope="col"><span className="visually-hidden">Description</span></th>
                                  <th scope="col"><span className="visually-hidden">Price</span></th>
                                </tr>
                              </thead>
                              <tbody className="total-line-table__tbody">
                                <tr className="total-line total-line--subtotal">
                                  <td className="total-line__name">Subtotal</td>
                                  <td className="total-line__price">
                                    <span className="order-summary__emphasis" data-checkout-subtotal-price-target={3000}>
                                      $30.00
                                    </span>
                                  </td>
                                </tr>
                                <tr className="total-line total-line--shipping">
                                  <td className="total-line__name">Shipping</td>
                                  <td className="total-line__price">
                                    <span className="order-summary__emphasis" data-checkout-total-shipping-target={0}>
                                      —
                                    </span>
                                  </td>
                                </tr>
                                <tr className="total-line total-line--taxes hidden" data-checkout-taxes>
                                  <td className="total-line__name">Taxes</td>
                                  <td className="total-line__price">
                                    <span className="order-summary__emphasis" data-checkout-total-taxes-target={0}>$0.00</span>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot className="total-line-table__footer">
                                <tr className="total-line">
                                  <td className="total-line__name payment-due-label">
                                    <span className="payment-due-label__total">Total</span>
                                  </td>
                                  <td className="total-line__price payment-due">
                                    <span className="payment-due__currency">USD</span>
                                    <span className="payment-due__price" data-checkout-payment-due-target={3000}>
                                      $30.00
                                    </span>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="main" role="main">
                    <div className="main__header">
                      <a href="https://theme267-fruits.myshopify.com" className="logo logo--left">
                        <h1 className="logo__text">Fruit Gifts</h1>
                      </a>
                      <ul className="breadcrumb ">
                        <li className="breadcrumb__item breadcrumb__item--completed">
                          <a className="breadcrumb__link" href="https://theme267-fruits.myshopify.com/cart">Cart</a>
                        </li>
                        <li className="breadcrumb__item breadcrumb__item--current">
                          Customer information
                        </li>
                        <li className="breadcrumb__item breadcrumb__item--blank">
                          Shipping method
                        </li>
                        <li className="breadcrumb__item breadcrumb__item--blank">
                          Payment method
                        </li>
                      </ul>
                    </div>
                    <div className="main__content">
                      <div className="step" data-step="contact_information">
                        <form noValidate="novalidate" className="edit_checkout animate-floating-labels" data-customer-information-form="true" action="https://checkout.shopify.com/14368816/checkouts/dc14fc16b9e1ae210393d3dba228076b" acceptCharset="UTF-8" method="post"><input name="utf8" type="hidden" defaultValue="✓" /><input type="hidden" name="_method" defaultValue="patch" /><input type="hidden" name="authenticity_token" defaultValue="ACkAeHNPyOLM1x9kgaklPrm7rnLqitv+yJ88QXXZ2kURQdo9axmeeKChiQP90quhqUKTlYUuV6sxMY6WMRxfeQ==" />
                          <input type="hidden" name="previous_step" id="previous_step" defaultValue="contact_information" />
                          <input type="hidden" name="step" defaultValue="shipping_method" />
                          <div className="step__sections">
                            <div className="section section--contact-information">
                              <div className="section__header">
                                <h2 className="section__title">Informações do consumidor</h2>
                              </div>
                              <div className="section__content">
                                <div className="fieldset">
                                  <div className="field field--required">
                                    <div className="field__input-wrapper field__input-wrapper--with-loader"><label className="field__label" htmlFor="checkout_email">Email</label>
                                      <input placeholder="Email" autoCapitalize="off" spellCheck="false" autoComplete="shipping email" data-autofocus="true" data-email-input="true" data-backup="customer_email" className="field__input" size={30} type="email" name="checkout[email]" id="checkout_email" />
                                    </div>
                                  </div>
                                </div>
                                <p className="section__content__text">
                                  <span aria-hidden="true">Already have an account with us?</span>
                                  <a href="https://theme267-fruits.myshopify.com/account/login?checkout_url=https%3A%2F%2Fcheckout.shopify.com%2F14368816%2Fcheckouts%2Fdc14fc16b9e1ae210393d3dba228076b%3Fstep%3Dcontact_information">
                                    <span className="visually-hidden">Already have an account with us?</span>
                                    Log in
                                  </a>      </p>
                              </div>
                            </div>
                            <div className="section section--shipping-address" data-shipping-address data-update-order-summary>
                              <div className="section__header">
                                <h2 className="section__title">
                                  Endereço de entrega
                                </h2>
                              </div>
                              <div className="section__content">
                                <div className="fieldset" data-address-fields>
                                  <input className="visually-hidden" autoComplete="shipping given-name" tabIndex={-1} data-autocomplete-field="first_name" size={30} type="text" name="checkout[shipping_address][first_name]" />
                                  <input className="visually-hidden" autoComplete="shipping family-name" tabIndex={-1} data-autocomplete-field="last_name" size={30} type="text" name="checkout[shipping_address][last_name]" />
                                  <input className="visually-hidden" autoComplete="shipping address-line1" tabIndex={-1} data-autocomplete-field="address1" size={30} type="text" name="checkout[shipping_address][address1]" />
                                  <input className="visually-hidden" autoComplete="shipping address-line2" tabIndex={-1} data-autocomplete-field="address2" size={30} type="text" name="checkout[shipping_address][address2]" />
                                  <input className="visually-hidden" autoComplete="shipping address-level2" tabIndex={-1} data-autocomplete-field="city" size={30} type="text" name="checkout[shipping_address][city]" />
                                  <input className="visually-hidden" autoComplete="shipping country" tabIndex={-1} data-autocomplete-field="country" size={30} type="text" name="checkout[shipping_address][country]" />
                                  <input className="visually-hidden" autoComplete="shipping address-level1" tabIndex={-1} data-autocomplete-field="province" size={30} type="text" name="checkout[shipping_address][province]" />
                                  <input className="visually-hidden" autoComplete="shipping postal-code" tabIndex={-1} data-autocomplete-field="zip" size={30} type="text" name="checkout[shipping_address][zip]" />
                                  <div className="field field--optional field--half" data-address-field="first_name">
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_first_name">Nome (como no cartão)</label>
                                      <input placeholder="Nome completo" autoComplete="shipping given-name" data-backup="first_name" className="field__input" size={30} type="text" name="checkout[shipping_address][first_name]" id="checkout_shipping_address_first_name" />
                                    </div>
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_first_name">Número do cartão</label>
                                      <input placeholder="Número do cartão" autoComplete="shipping given-name" data-backup="first_name" className="field__input" size={30} type="text" name="checkout[shipping_address][first_name]" id="checkout_shipping_address_first_name" />
                                    </div>
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_first_name">Mês val.</label>
                                      <input placeholder="MM" autoComplete="shipping given-name" data-backup="first_name" className="field__input" size={30} type="text" name="checkout[shipping_address][first_name]" id="checkout_shipping_address_first_name" />
                                    </div>
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_first_name">Ano Val.</label>
                                      <input placeholder="AAAA" autoComplete="shipping given-name" data-backup="first_name" className="field__input" size={30} type="text" name="checkout[shipping_address][first_name]" id="checkout_shipping_address_first_name" />
                                    </div>
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_first_name">Código de segurança</label>
                                      <input placeholder="CVV" autoComplete="shipping given-name" data-backup="first_name" className="field__input" size={30} type="text" name="checkout[shipping_address][first_name]" id="checkout_shipping_address_first_name" />
                                    </div>
                                  </div>
                                  <div className="field field--required field--two-thirds" data-address-field="address1">
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_address1">Address</label>
                                      <input placeholder="Address" autoComplete="shipping address-line1" data-backup="address1" className="field__input" size={30} type="text" name="checkout[shipping_address][address1]" id="checkout_shipping_address_address1" />
                                    </div>
                                  </div>
                                  <div className="field field--optional field--third" data-address-field="address2">
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_address2">Apt, suite, etc. (optional)</label>
                                      <input placeholder="Apt, suite, etc. (optional)" autoComplete="shipping address-line2" data-backup="address2" className="field__input" size={30} type="text" name="checkout[shipping_address][address2]" id="checkout_shipping_address_address2" />
                                    </div>
                                  </div>
                                  <div data-address-field="city" className="field field--required">
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_city">City</label>
                                      <input placeholder="City" autoComplete="shipping address-level2" data-backup="city" className="field__input" size={30} type="text" name="checkout[shipping_address][city]" id="checkout_shipping_address_city" />
                                    </div>
                                  </div>
                                  <div data-address-field="country" className="field field--required field--show-floating-label field--three-eights">
                                    <div className="field__input-wrapper field__input-wrapper--select"><label className="field__label" htmlFor="checkout_shipping_address_country">Country</label>
                                      <select size={1} autoComplete="shipping country" data-backup="country" className="field__input field__input--select" name="checkout[shipping_address][country]" id="checkout_shipping_address_country"><option data-code="IN" value="India">India</option>
                                        <option data-code="BR" selected="selected" value="Brazil">Brazil</option>
                                        <option disabled="disabled" value="---">---</option>

                                        <option data-code="BA" value="Bosnia And Herzegovina">Bosnia &amp; Herzegovina</option>
                                        <option data-code="BW" value="Botswana">Botswana</option>
                                        <option data-code="BV" value="Bouvet Island">Bouvet Island</option>
                                        <option data-code="BR" value="Brazil">Brazil</option>
                                        <option data-code="ZA" value="South Africa">South Africa</option>
                                        <option data-code="ZW" value="Zimbabwe">Zimbabwe</option></select>
                                    </div>
                                  </div>
                                  <div data-address-field="province" className="field field--required field--three-eights field--show-floating-label">
                                    <div className="field__input-wrapper field__input-wrapper--select"><label className="field__label" htmlFor="checkout_shipping_address_province">State</label>
                                      <select placeholder="State" autoComplete="shipping address-level1" data-backup="province" className="field__input field__input--select" name="checkout[shipping_address][province]" id="checkout_shipping_address_province"><option value disabled>State</option><option data-code="AC" value="Acre">Acre</option><option data-code="AL" value="Alagoas">Alagoas</option><option data-code="AP" value="Amapá">Amapá</option><option data-code="AM" value="Amazonas">Amazonas</option><option data-code="BA" value="Bahia">Bahia</option><option data-code="CE" value="Ceará">Ceará</option><option data-code="DF" value="Distrito Federal">Distrito Federal</option><option data-code="ES" value="Espírito Santo">Espírito Santo</option><option data-code="GO" value="Goiás">Goiás</option><option data-code="MA" value="Maranhão">Maranhão</option><option data-code="MT" value="Mato Grosso">Mato Grosso</option><option data-code="MS" value="Mato Grosso do Sul">Mato Grosso do Sul</option><option data-code="MG" value="Minas Gerais">Minas Gerais</option><option data-code="PA" value="Pará">Pará</option><option data-code="PB" value="Paraíba">Paraíba</option><option data-code="PR" value="Paraná">Paraná</option><option data-code="PE" value="Pernambuco">Pernambuco</option><option data-code="PI" value="Piauí">Piauí</option><option data-code="RN" value="Rio Grande do Norte">Rio Grande do Norte</option><option data-code="RS" value="Rio Grande do Sul">Rio Grande do Sul</option><option data-code="RJ" value="Rio de Janeiro">Rio de Janeiro</option><option data-code="RO" value="Rondônia">Rondônia</option><option data-code="RR" value="Roraima">Roraima</option><option data-code="SC" value="Santa Catarina">Santa Catarina</option><option data-code="SP" value="São Paulo">São Paulo</option><option data-code="SE" value="Sergipe">Sergipe</option><option data-code="TO" value="Tocantins">Tocantins</option></select>
                                    </div>
                                  </div>
                                  <div data-address-field="zip" className="field field--required field--quarter">
                                    <div className="field__input-wrapper"><label className="field__label" htmlFor="checkout_shipping_address_zip">Postal code</label>
                                      <input placeholder="Postal code" autoComplete="shipping postal-code" data-backup="zip" className="field__input field__input--zip" size={30} type="text" name="checkout[shipping_address][zip]" id="checkout_shipping_address_zip" />
                                    </div>
                                  </div></div>
                              </div>
                            </div>
                            <div className="section section--half-spacing-top section--optional">
                              <div className="section__content">
                                <div className="checkbox-wrapper">
                                  <div className="checkbox__input">
                                    <input size={30} type="hidden" name="checkout[remember_me]" />
                                    <input name="checkout[remember_me]" type="hidden" defaultValue={0} /><input className="input-checkbox" data-backup="remember_me" type="checkbox" defaultValue={1} name="checkout[remember_me]" id="checkout_remember_me" />
                                  </div>
                                  <label className="checkbox__label" htmlFor="checkout_remember_me">
                                    Save this information for next time
                                  </label>        </div>
                              </div>
                            </div>
                          </div>
                          <div className="step__footer">
                            <button name="button" type="submit" className="step__footer__continue-btn btn ">
                              <span className="btn__content">Continue to shipping method</span>
                              <i className="btn__spinner icon icon--button-spinner" />
                            </button>
                            <a className="step__footer__previous-link" href="https://theme267-fruits.myshopify.com/cart">
                              <svg className="previous-link__icon icon--chevron icon" xmlns="http://www.w3.org/2000/svg" width="6.7" height="11.3" viewBox="0 0 6.7 11.3">
                                <path d="M6.7 1.1l-1-1.1-4.6 4.6-1.1 1.1 1.1 1 4.6 4.6 1-1-4.6-4.6z" />
                              </svg>
                              Return to cart</a>
                          </div>
                          <input type="hidden" name="checkout[client_details][browser_width]" defaultValue={1091} /><input type="hidden" name="checkout[client_details][browser_height]" defaultValue={915} /><input type="hidden" name="checkout[client_details][javascript_enabled]" defaultValue={1} /></form>
                      </div>
                    </div>
                    <div className="main__footer">
                      <div className="modals">
                      </div>
                      <div role="contentinfo" aria-label="Footer">
                        <p className="copyright-text">
                          All rights reserved Fruit Gifts
                        </p>
                      </div>
                      <div id="dialog-close-title" className="hidden">Close</div>
                    </div>
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
}


const mapStateToProps = (state, ownProps) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      loginFromCheckout: isFromCheckout => dispatch(loginFromCheckout(isFromCheckout))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
