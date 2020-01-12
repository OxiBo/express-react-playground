import React, { Component } from "react";

export default class ProductsList extends Component {
  render() {
    return (
      <main className="ui main text container segment">
        <h3 id="aboutSection" className="gradientLine">
          About our product
        </h3>
        <section id="about">
          <div className="features">
            <i className="fas fa-leaf"></i>
            <div className="ftr">
              <h3>Healthy</h3>
              <p>
                They say “you are what you eat” and needless to say, it is
                absolutely true. Our food is healthy and made with fresh
                ingredients with a care about your health.
              </p>
            </div>
          </div>
          <div className="features">
            <i className="fab fa-delicious"></i>
            <div className="ftr">
              <h3>Delicious</h3>
              <p>
                Tasty, mouth-watering, fit for a king, delightful. You will be
                hooked from the very first bite.
              </p>
            </div>
          </div>
          <div className="features">
            <i className="fas fa-pen-fancy"></i>
            <div className="ftr">
              <h3>Custom-made</h3>
              <p>
                We change a recipe for your liking making it even better for
                you.
              </p>
            </div>
          </div>
          <div className="features">
            <i className="fas fa-truck"></i>
            <div className="ftr">
              <h3>Fast delivery</h3>
              <p>
                We make sure we deliver your food fresh from the oven just like
                you would have it if you just made it yourself. We change a
                recipe for you liking making it even better for you.
              </p>
            </div>
          </div>
          <div className="features">
            <i className="far fa-money-bill-alt"></i>
            <div className="ftr">
              <h3>Great prices</h3>
              <p>
                Our food is extremely affordable! It is just like you would make
                it yourself but even better.
              </p>
            </div>
          </div>
        </section>

        <h3 id="pricesSection" className="gradientLine">Our products</h3>
        <section id="prices">
        <div className="product">
                <div className="prodName">
                    <h3>Classic Cheesecake</h3>
                </div>
                <div className="image">
                    <img src="css/images/classicCheesecake.jpeg" alt="cheesecake"/>
                </div>
                <div>
                    <p>Ingredients:</p>
                    <p className="ingridients">Crackers, butter, cream cheese, eggs, sugar, vanilla, lemon juice.</p>
                </div>
                <div>
                    <p>Price:</p>
                    <h4>$19.90</h4>
                </div>
                <div>
                    <button className="order">Order now→</button>
                </div>
            </div>
            

            <div className="ui card center aligned product">
                <div className="center aligned prod-name">
                    <h3 className="ui huge header">Classic Cheesecake</h3>
                </div>
                <div className="image">
                    <img src="css/images/classicCheesecake.jpeg" alt="cheesecake"/>
                </div>
                <div className="content center aligned">
                    <p className="header">Ingredients:</p>
                    <p className="description">Crackers, butter, cream cheese, eggs, sugar, vanilla, lemon juice.</p>
                </div>
                <div className="center aligned ">
                    <p>Price:</p>
                    <h4>$19.90</h4>
                </div>
                <div className="extra content center aligned ">
                    <button className="ui button brown">Order now →</button>
                </div>
            </div>
            


        </section>
      </main>
    );
  }
}
