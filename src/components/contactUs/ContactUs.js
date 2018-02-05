import React, { Component } from 'react';
import Sidebar from '../reusable/Sidebar';

class ContactUs extends Component {

  render() {

    return (
      <div>
        <div className="breadcrumb_wrap">
          <div className="container">
            <ul className="breadcrumb">
              <li><a href="#" className="homepage-link" title="Back to the frontpage">Home</a></li>
              <li><span className="page-title">Contact us</span></li>
            </ul>
          </div>
        </div>
        {/* MAIN CONTENT */}
        <div id="main" role="main">
          <div className="container">
            <div className="row">
              <div className="main_content  col-sm-9 col-sm-push-3">
                <div id="contact_page">
                  <h1 className="page_heading">Contact us</h1>
                  <div className="rte">
                    You can contact us any way that is convenient for you. We are
                    available 24/7 via fax, email or telephone. You can also use a quick
                    contact form below or visit our office personally. Email us with any
                    questions or inquiries. We would be happy to answer you.
                  </div>
                  <form method="post" id="contact_form" className="contact-form" acceptCharset="UTF-8"><input defaultValue="contact" name="form_type" type="hidden" /><p className="alert-form-info" /><input name="utf8" defaultValue="✓" type="hidden" /><p className="alert-form-info" />
                    <div id="contactFormWrapper">
                      <div className="row">
                        <div className="col-sm-4 form-group">
                          <label htmlFor="contactFormName">Your Name:</label>
                          <input className="form-control hint" id="contactFormName" name="contact[name]" placeholder type="text" /><p className="alert-form-info" />
                        </div>
                        <div className="col-sm-4 form-group">
                          <label htmlFor="contactFormEmail">Email:</label>
                          <input className="form-control hint" id="contactFormEmail" name="contact[email]" placeholder type="email" /><p className="alert-form-info" />
                        </div>
                        <div className="col-sm-4 form-group">
                          <label htmlFor="contactFormTelephone">Phone Number:</label>
                          <input className="form-control hint" id="contactFormTelephone" name="contact[phone]" placeholder type="tel" /><p className="alert-form-info" />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 form-group">
                          <label htmlFor="contactFormMessage">Message:</label>
                          <textarea className="form-control hint" rows={5} cols={75} id="contactFormMessage" name="contact[body]" placeholder defaultValue={""} /><p className="alert-form-info" />
                        </div>
                      </div>
                      <div className="btn-toolbar form-group">
                        <input id="contactFormSubmit" defaultValue="Send" className="btn btn-alt" type="submit" /><p className="alert-form-info" />
                        <input defaultValue="Clear" className="btn btn-info" type="reset" /><p className="alert-form-info" />
                      </div>
                    </div>{/* contactFormWrapper */}
                  </form>
                </div>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default ContactUs;
