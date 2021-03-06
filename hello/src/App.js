import React from "react";
import "./App.css";
import Cart from "./Cart";
import Navbar from "./Navbar";
// import db from "./firebase";
// import { collection, addDoc } from "firebase/firestore";

import firebase from "./firebase";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: [],
      loading: true,
    };

    this.db = firebase.firestore();
  }

  handleIncreaseQty = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // products[idx].qty += 1;

    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty + 1,
      })
      .then(() => {
        console.log("updated sucessfully");
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  handleDecreaseQty = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    if (products[index].qty === 1) return;

    // products[idx].qty -= 1;

    // this.setState({
    //   products,
    // });

    const docRef = this.db.collection("products").doc(products[index].id);

    docRef
      .update({
        qty: products[index].qty - 1,
      })
      .then(() => {
        console.log("updated sucessfully");
      })
      .catch((error) => {
        console.log("error :", error);
      });
  };

  handleDeleteProduct = (id) => {
    const { products } = this.state;
    // const items = products.filter((item) => item.id !== id);

    const docRef = this.db.collection("products").doc(id);

    docRef
      .delete()
      .then(() => {
        console.log("deleted sucessfully");
      })
      .catch((error) => {
        console.log("error :", error);
      });

    // this.setState({
    //   products: items,
    // });
  };

  getCartCount = () => {
    const { products } = this.state;
    let count = 0;
    products.forEach((product) => {
      count += product.qty;
    });
    return count;
  };

  getTotalPrice = () => {
    const { products } = this.state;
    let total = 0;

    products.forEach((product) => {
      total += product.price * product.qty;
    });

    return total;
  };

  componentDidMount() {
    // firebase
    //   .firestore()
    //   .collection("products")
    //   .get()
    //   .then((snapshot) => {
    //     console.log(snapshot);

    //     snapshot.docs.map((doc) => {
    //       console.log(doc.data());
    //     });
    //     const products = snapshot.docs.map((doc) => {
    //       const data = doc.data();
    //       data["id"] = doc.id;
    //       return data;
    //     });

    //     this.setState({
    //       products,
    //       loading: false,
    //     });
    //   });

    this.db
      .collection("products")
      // .where("price", "==", 999)
      // .where("title", "==", 'Watch')
      // .orderBy('price','asc')
      .onSnapshot((snapshot) => {
        // console.log(snapshot);

        // snapshot.docs.map((doc) => {
        //   console.log(doc.data());
        // });
        const products = snapshot.docs.map((doc) => {
          const data = doc.data();
          data["id"] = doc.id;
          return data;
        });

        this.setState({
          products,
          loading: false,
        });
      });
  }

  addProduct = () => {
    this.db
      .collection("products")
      .add({
        img: "",
        price: 900,
        qty: 3,
        title: "washing machine",
      })
      .then((docRef) => {
        console.log("Product has been added", docRef);
      })
      .catch((error) => {
        console.log("Error : ", error);
      });
  };

  render() {
    const { products, loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a Product</button> */}
        <Cart
          products={products}
          onIncreaseQty={this.handleIncreaseQty}
          onDecreaseQty={this.handleDecreaseQty}
          onDeleteProduct={this.handleDeleteProduct}
          // total={this.getTotalPrice()}
        />
        {loading && <h1>Loading Products ... </h1>}
        <div style={{ fontSize: "20px", padding: "10px" }}>
          TOTAL : {this.getTotalPrice()}
        </div>
      </div>
    );
  }
}

export default App;
