import { useState, useEffect } from "react";
import "./App.css";
import Form from "./components/Form";
import ProductList from "./components/ProductList";

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
}

function App() {
    const [products, setProducts] = useState<Product[]>([]);



    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        fetch("https://node-example-production.up.railway.app/product").then(
            (result) => {
                result.json().then((data: Product[]) => {
                    setProducts(data);
                });
            }
        );
    };

    const handleDelete = (id: number) => {
        console.log("borrar producto")
        fetch(`https://node-example-production.up.railway.app/product/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            result.json().then((data: Product[]) => {
                getData();
            });
        });
    };

    const handleEdit = (inputValues: Product) => {
        console.log(inputValues)
        fetch(`https://node-example-production.up.railway.app/product/${inputValues.id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: String(inputValues.name),
                brand: String(inputValues.brand),
                price: Number(inputValues.price),
            }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            result.json().then((data: Product[]) => {
                console.log(data);
                getData();
            });
        });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="container col-md-3 container-form">
                        <Form getData={getData}/>
                    </div>
                    <div className="container col-md-8 container-form">
                        {/* <Form setProducts={setProducts} getData={getData}/> */}
                       
                    </div>
                </div>
                <div className="container container-list">
                    <ProductList products={products} handleDelete={handleDelete} handleEdit={handleEdit}/>
                </div>
            </div>
        </>
    );
}

export default App;
