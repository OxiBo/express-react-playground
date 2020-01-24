import React, { Component } from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { fetchProduct, handleStripeToken } from "../../actions";

class OrderProduct extends Component {
  componentDidMount() {
    this.props.fetchProduct(this.props.match.params.productId);
    // console.log(this.props.match.params.productId)
    // console.log(this.props.match.params)
  }


  calcPaymentAmount = (amount, tax = 8) => {
    const taxes = amount * (tax / 100);
    return {
      taxes,
      total: taxes + amount
    };
  };

  renderContent() {
    const { name, _id, imageURL, ingredients, price } = this.props.product;
    return (
      <div className="ui items">
        <div className="item">
          <div className="ui medium rounded image">
            <img src={`/${imageURL}`} alt=""/>
          </div>
          <div className="content">
            <h1 className="huge header">{name}</h1>
            <div className="content">
              <span className="">Ingredients: </span>
              <span>{ingredients.join(", ")}</span>
            </div>
            <div className="extra">
              <table className="ui unstackable table">
                <thead>
                  <tr>
                    <th></th>

                    <th className="right aligned">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Price</td>

                    <td className="right aligned">
                      ${(price / 100).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>Estimated tax</td>

                    <td className="right aligned">
                      ${(this.calcPaymentAmount(price).taxes / 100).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Order Total</strong>
                    </td>

                    <td className="right aligned">
                      <strong>
                        $
                        {(this.calcPaymentAmount(price).total / 100).toFixed(2)}
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="buttons">
          <a href="/products" className="ui button big right orange">
            Cancel
          </a>
          <StripeCheckout
            name="Pay for your order:"
            description={name}
            amount={this.calcPaymentAmount(price).total}
            token={token => this.props.handleStripeToken(token, name, _id, this.calcPaymentAmount(price).total, this.props.history)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
          >
            <button className="ui button big primary left">Buy</button>
          </StripeCheckout>
        </div>
      </div>
    );
  }
  render() {
      // console.log(this.props)
    return (
      <div className="ui main text container segment">
        {this.props.product ? (
          this.renderContent()
        ) : (
          <div className="ui items">
            <p>
              Oops! Error occured on our server end! Try to refresh the page!
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    product: products.product,
    error: products.error
  };
};

export default connect(mapStateToProps, { fetchProduct, handleStripeToken })(
  OrderProduct
);
