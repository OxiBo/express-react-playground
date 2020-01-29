import React  from "react";

const Landing = () => {
  return (
    <main className="ui main container segment">
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
              We change a recipe for your liking making it even better for you.
            </p>
          </div>
        </div>
        <div className="features">
          <i className="fas fa-truck"></i>
          <div className="ftr">
            <h3>Fast delivery</h3>
            <p>
              We make sure we deliver your food fresh from the oven just like
              you would have it if you just made it yourself. We change a recipe
              for you liking making it even better for you.
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
    </main>
  );
};


export default Landing;