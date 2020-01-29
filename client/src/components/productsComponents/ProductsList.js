import React, { Component } from "react";
import Product from "./Product";
import { connect } from "react-redux";
import { fetchProducts } from "../../actions";

class ProductsList extends Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {
    return (
      <main className="ui main container segment">
        <h3 id="pricesSection" className="gradientLine">
          Our products
        </h3>
        <section id="prices" className="ui main container">
          {this.props.productsList.length ? (
            this.props.productsList.map(
              ({ name, ingredients, price, imageURL, _id }) => {
                return (
                  <Product
                    key={name}
                    name={name}
                    price={price}
                    ingredients={ingredients}
                    imageURL={imageURL}
                    id={_id}
                  />
                );
              }
            )
          ) : (
            <div>Server Error</div>
          )}
        </section>
      </main>
    );
  }
}

const mapStateToProps = ({ products }) => {
  return {
    productsList: products.products
  };
};

export default connect(mapStateToProps, { fetchProducts })(ProductsList);
