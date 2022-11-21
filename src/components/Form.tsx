import React, { useState } from "react";
import {Product} from "../App";

interface FormState {
    id: number,
    name : string,
    brand: string,
    price: number
}

interface FormProps {
    // setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    getData: () => void;
}
const Form = ({getData}: FormProps) => {
    // const Form = ({setProducts}: FormProps) => {
    const [ inputValues, setInputValues] = useState<FormState> ({id: 0, name: "", brand: "", price: 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({...inputValues, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // setProducts(products => ([...products, inputValues]))
        fetch("https://node-example-production.up.railway.app/product", {
            method: "POST",
            body: JSON.stringify({ ...inputValues, price: Number(inputValues.price) }),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((result) => {
            getData();
        });
        setInputValues( {id: 0, name: "", brand: "", price: 0 })
      
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create Product</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="name"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="Name"
                    value={inputValues.name}
                />
            </div>
            <div className="input-group mb-3">
                <input
                    type="text"
                    name="brand"
                    className="form-control"
                    placeholder="Brand"
                    onChange={handleChange}
                    value={inputValues.brand}
                />
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input
                    type="number"
                    className="form-control currency"
                    name="price"
                    placeholder="Price"
                    min="0"
                    step="0.01"
                    onChange={handleChange}
                    value={inputValues.price}
                />
            </div>
            <button type="submit" className="btn btn-light mb-3">Create</button>
        </form>
    );
};

export default Form;