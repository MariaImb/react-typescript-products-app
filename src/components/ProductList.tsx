import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export interface Product {
    id: number;
    name: string;
    brand: string;
    price: number;
}

interface Props {
    products: Array<Product>;
    handleDelete: (id: number) => void;
    handleEdit: (inputValues: Product) => void;
}

const ProductList = ({
    products,
    handleDelete,
    handleEdit,
}: Props): JSX.Element => {
    const [show, setShow] = useState(false);
    // const [product, setProduct] = useState<Product>();
    const [inputValues, setInputValues] = useState<Product>({
        id: 0,
        name: "",
        brand: "",
        price: 0,
    });

    const handleClose = () => setShow(false);
    // const handleShow = (e: React.MouseEventHandler<HTMLButtonElement>) => setShow(true);
    const handleShow = (producto: Product) => {
        setShow(true);
        // setProduct(producto);
        setInputValues({id: producto.id, name: producto.name, price: producto.price, brand: producto.brand})
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h2 className="title">Listado de productos</h2>
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th scope="col" className="table-title">
                            #
                        </th>
                        <th scope="col" className="table-title">
                            PRODUCT NAME
                        </th>
                        <th scope="col" className="table-title">
                            BRAND
                        </th>
                        <th scope="col" className="table-title">
                            PRICE
                        </th>
                        <th scope="col" className="table-title">
                            ACTIONS
                        </th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {products?.map((producto, index) => {
                        return (
                            <tr key={producto.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{producto.name}</td>
                                <td>{producto.brand}</td>
                                <td>${producto.price}</td>

                                <td>
                                    <button
                                        className="btn btn-outline-primary btn-spacing buttons"
                                        onClick={() =>
                                            handleDelete(producto.id)
                                        }
                                    >
                                        Remove
                                    </button>
                                    <Button
                                        className="btn  btn-spacing buttons"
                                        // onClick={handleShow}
                                        onClick={() => handleShow(producto)}
                                    >
                                        Edit
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="string"
                                value={inputValues.name}
                                name="name"
                                autoFocus
                                onChange={handleChange}
                            />
                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="string"
                                value={inputValues.brand}
                                name="brand"
                                autoFocus
                                onChange={handleChange}
                            />
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                value={inputValues.price}
                                name="price"
                                autoFocus
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleEdit(inputValues)}
                    >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProductList;
