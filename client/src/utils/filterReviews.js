export default (reviews, filter, key) => {
    console.log(reviews)
    console.log(filter)
    console.log(key)
    if (filter === "sort") {
      return reviews.sort((a, b) => {
        if (key === "newest") {
        return new Date(b.orderDate) - new Date(a.orderDate);
        } else if (key === "oldest") {
          return new Date(a.orderDate) - new Date(b.orderDate);
        } else if (key === "refundLatest") {
          return new Date(a.refundDate) - new Date(b.refundDate);
        } else if (key === "refundOldest") {
          return new Date(b.refundDate) - new Date(a.refundDate);
        } else if (key === "refundStatus") {
          return +a.refundAmount - +b.refundAmount;
        } else if (key === "productName") {
          return b.productName.localeCompare(a.productName); // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
        } else {
          return reviews;
        }
      });
    } else {
        // console.log(reviews)
      if (key) {
        //   console.log(reviews)
        //   return reviews
        return reviews.filter(({ productName }) => {
          return productName.toLowerCase().includes(key.toLowerCase());
        //   console.log(productName)
        //   return reviews
        });
      }
    //   console.log(reviews)
      return reviews;
    }
  };
  
  // export default (surveys, findByTitle) => {
  // //   console.log(surveys)
  // //   console.log(findByTitle)
  //   if (findByTitle) {
  //     return surveys.filter(({ title }) => {
  //       return title.toLowerCase().includes(findByTitle);
  //     });
  //   }
  // };
  
  // export default (surveys, sortBy) => {
  //     // console.log(surveys)
  //     //if (sortBy) {
  //       return surveys.sort((a, b) => {
  //         if (sortBy === "dateSent") {
  //           // console.log(sortBy)
  //           return b.dateSent - a.dateSent;
  //         } else if (sortBy === "lastResponded") {
  //           return b.lastResponded - a.lastResponded;
  //         } else if (sortBy === "yesDesc") {
  //           //   console.log(a.yes)
  //           return b.yes - a.yes;
  //         } else if (sortBy === "yesAsc") {
  //           //   console.log(a.yes)
  //           return a.yes - b.yes;
  //         } else if (sortBy === "noDesc") {
  //           // console.log(a.no)
  //           return b.no - a.no;
  //         } else if (sortBy === "noAsc") {
  //           // console.log(a.no)
  //           return a.no - b.no;
  //         } else  if(sortBy === "title"){
  //           // console.log(b.title.toLowerCase())
  //           return b.title.localeCompare(a.title); // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
  //         } else {
  //             return surveys
  //         }
  //       });
  
  //     //}
  //     //return surveys;
  //   };
  