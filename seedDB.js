const mongoose = require("mongoose");
const Product = require("./models/Product");

const seeds = [
  {
    name: "Classic Cheesecake",
    category: 'dessert',
    description: "cake",
    price: 1990,
    ingredients: ['Crackers', 'butter', 'cream cheese', 'eggs', 'sugar', 'vanilla', 'lemon juice'],
    imageURL: "assets/product-images/classicCheesecake.jpeg",
    count: 100,
    description:
      ""
  },
  {
    name: "Chocolate Cheesecake",
    category: 'dessert',
    description: "cake",
    price: 2500,
    ingredients: ['Crackers', 'butter', 'cream cheese', 'eggs', 'chocolate', 'cocoa powder', 'sugar'],
    imageURL: "assets/product-images/chocolate-cheesecake1.jpeg",
    count: 100,
    description:
      ""
  },
  {
    name: "Honey cake",
    category: 'dessert',
    description: "cake",
    price: 4900,
    ingredients: ['Flour', 'honey', 'eggs', 'sugar', 'butter', 'sour cream', 'lemon juice', 'vanilla'],
    imageURL: "assets/product-images/medovic.jpg",
    count: 100,
    description:
      ""
  },
  {
    name: "Sour cream cake",
    category: 'dessert',
    description: "cake",
    price: 4590,
    ingredients: ['Flour', 'sugar', 'eggs', 'sour cream', 'cocoa powder', 'baking soda', 'vinegar'],
    imageURL: "assets/product-images/smetannyk.jpeg",
    count: 100,
    description:
      ""
  },
  {
    name: "Lava Cakes For Two",
    category: 'dessert',
    description: "cake",
    price: 1590,
    ingredients: ['Flour', 'butter', 'chocolate', 'sugar', 'eggs'],
    imageURL: "assets/product-images/lavaCake.jpg",
    count: 100,
    description:
      ""
  },
  {
    name: "Napoleon cake",
    category: 'dessert',
    description: "cake",
    price: 4590,
    ingredients: ['Flour', 'margarine', 'water', 'milk', 'butter', 'eggs', 'sugar'],
    imageURL: "assets/product-images/napoleon.jpg",
    count: 100,
    description:
      ""
  },
];

const seedDB = async () => {
  //Remove all campgrounds
    await Product.deleteMany({});
  //   await Product.deleteMany({});
  for (const seed of seeds) {
    let product = await Product.create(seed);
    product.save();
  }
};

module.exports = seedDB;
