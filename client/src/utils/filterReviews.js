// https://codereview.stackexchange.com/questions/70314/elegant-way-to-sort-on-multiple-properties-that-might-be-undefined
function compareProperty(a, b) {
  return a && b ? b - a : !b ? -1 : !a ? 1 : 0; // !a ? 1 : !b ? -1 : b - a   //!a ? 1 : !b ? -1 : b - a; // (a || b) ? (!a ? -1 : !b ? -1 : b - a) : 0;
}

export default (reviews, filter, key) => {
  if (filter === "sort") {
    return reviews.sort((a, b) => {
      if (key === "newest") {
        return compareProperty(new Date(a.orderDate), new Date(b.orderDate));
      } else if (key === "oldest") {
        return compareProperty(new Date(b.orderDate), new Date(a.orderDate));
      } else if (key === "refundLatest") {
        console.log(new Date(a.refundDate), new Date(b.refundDate));
        return compareProperty(new Date(a.refundDate), new Date(b.refundDate));
      } else if (key === "refundOldest") {
        return compareProperty(new Date(b.refundDate), new Date(a.refundDate));
      } else if (key === "refundStatus") {
        return compareProperty(a.refundAmount, b.refundAmount);
      } else if (key === "productName") {
        return b.productName.localeCompare(a.productName); // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
      } else {
        return reviews;
      }
    });
  } else {
    // console.log(reviews)
    if (key) {
     
      return reviews.filter(({ productName }) => {
        return productName.toLowerCase().includes(key.toLowerCase());
      });
    }
    //   console.log(reviews)
    return reviews;
  }
};

// export default (reviews, filter, key) => {
//   console.log(reviews);
//   console.log(filter);
//   console.log(key);
//   if (filter === "sort") {
//     return reviews.sort((a, b) => {
//       if (key === "newest") {
//         return new Date(b.orderDate) - new Date(a.orderDate);
//       } else if (key === "oldest") {
//         return new Date(a.orderDate) - new Date(b.orderDate);
//       } else if (key === "refundLatest") {
//         return new Date(a.refundDate) - new Date(b.refundDate);
//       } else if (key === "refundOldest") {
//         return new Date(b.refundDate) - new Date(a.refundDate);
//       } else if (key === "refundStatus") {
//         console.log(a.refundAmount);
//         console.log(b.refundAmount);
//         if (a.refundAmount === b.refundAmount) {
//           return 0;
//         } else if (a.refundAmount === null || a.refundAmount === undefined) {
//           return 1;
//         } else if (b.refundAmount === null || b.refundAmount === undefined) {
//           return -1;
//         } else {
//           return b.refundAmount - a.refundAmount;
//         }
//       } else if (key === "productName") {
//         return b.productName.localeCompare(a.productName); // https://stackoverflow.com/questions/6712034/sort-array-by-firstname-alphabetically-in-javascript
//       } else {
//         return reviews;
//       }
//     });
//   } else {
//     // console.log(reviews)
//     if (key) {
//       //   console.log(reviews)
//       //   return reviews
//       return reviews.filter(({ productName }) => {
//         return productName.toLowerCase().includes(key.toLowerCase());
//         //   console.log(productName)
//         //   return reviews
//       });
//     }
//     //   console.log(reviews)
//     return reviews;
//   }
// };

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
