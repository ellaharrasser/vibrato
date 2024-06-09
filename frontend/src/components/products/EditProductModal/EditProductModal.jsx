import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useModal } from '../../../context/Modal';
import { getKeys } from '../../../utils/misc';
import conditions from '../../../utils/conditions';
import { thunkEditProduct } from '../../../redux/products';
import './EditProductModal.css';


function EditProductModal({ product }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal;

    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [shippingPrice, setShippingPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    const [validations, setValidations] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitClass, setSubmitClass] = useState('submit');

    const setSubmitDisabledStatus = (disabled) => {
        (disabled)
          ? setSubmitClass('submit disabled')
          : setSubmitClass('submit');
        setSubmitDisabled(disabled);
    };

    const getValidations = useCallback(() => {
        const newValidations = {};

        if (!name) {
            newValidations.name = 'A name is required.';
        } else if (name.length > 255) {
            newValidations.name = 'Names must be 255 or fewer characters.';
        }

        if (!brand) {
            newValidations.brand = 'A brand is required.';
        } else if (brand.length > 20) {
            newValidations.brand = 'Brands must be 20 or fewer characters.';
        }

        if (!category) {
            newValidations.category = 'A category is required.';
        } else if (category.length > 20) {
            newValidations.category = 'Categories must be 20 or fewer characters.';
        }

        if (!condition) {
            newValidations.condition = 'A condition is required.';
        }

        if (!description) {
            newValidations.description = 'A description is required.';
        } else if (description.length > 255) {
            newValidations.description = 'Descriptions must be 255 or fewer characters.';
        }

        if (!productPrice) {
            newValidations.productPrice = 'A product price is required.';
        }

        if (+quantity <= 0) {
            newValidations.quantity = 'A quantity must be 1 or more';
        }

        return newValidations;
    }, [name, brand, category, condition, description, productPrice, quantity]);

    useEffect(() => {
        // Prevent validations until initial submission
        if (!hasSubmitted) return;
        const newValidations = getValidations();
        setSubmitDisabledStatus(getKeys(newValidations).length > 0);
        setValidations(newValidations);
    }, [hasSubmitted, getValidations]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        /* Prevent submission if validation errors exist,
        or if no fields have changed */
        if (!hasSubmitted) {
            setHasSubmitted(true);
            const newValidations = getValidations();
            if (getKeys(newValidations).length) return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('condition', condition);
        formData.append('description', description);
        formData.append('product_price', +productPrice);
        formData.append('shipping_price', +shippingPrice);
        formData.append('quantity', +quantity);

        const serverResponse = await dispatch(
            thunkEditProduct(formData, product.id)
        );

        if (serverResponse) {
            setErrors(serverResponse);
        }
    };

    return <>
        <h1>Edit an existing Product</h1>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='form-item-container'>
                <label htmlFor='shop'>Shop</label>
                <p className='form-error'>
                    {validations.shop && validations.shop
                    || errors.shop && errors.shop}
                </p>
                <select
                    id='shop'
                    name='shop'
                    value={shopId}
                    onChange={(e) => setShopId(e.target.value)}
                >
                    <option value=''>Please select a shop...</option>
                    {getValues(shops).map(shop => (
                        <option value={shop.id} key={shop.id}>
                            {shop.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className='form-item-container'>
                <label htmlFor='name'>Name</label>
                <p className='form-error'>
                    {validations.name && validations.name
                    || errors.name && errors.name}
                </p>
                <input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-item-container'>
                <label htmlFor='brand'>Brand</label>
                <p className='form-error'>
                    {validations.brand && validations.brand
                    || errors.brand && errors.brand}
                </p>
                <input
                    id='brand'
                    type='text'
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
            </div>
            <div className='form-item-container'>
                <label htmlFor='category'>Category</label>
                <p className='form-error'>
                    {validations.category && validations.category
                    || errors.category && errors.category}
                </p>
                <input
                    id='category'
                    type='text'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
            </div>
            <div className='form-item-container'>
                <label htmlFor='condition'>Condition</label>
                <p className='form-error'>
                    {validations.condition && validations.condition
                    || errors.condition && errors.condition}
                </p>
                <select
                    id='condition'
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                >
                    <option value=''>Please select a condition...</option>
                    {conditions.map(condition => (
                        <option value={condition} key={condition}>
                            {condition}
                        </option>
                    ))}
                </select>
            </div>
            <div className='form-item-container'>
                <label htmlFor='description'>Description</label>
                <p className='form-error'>
                    {validations.description && validations.description
                    || errors.description && errors.description}
                </p>
                <input
                    id='description'
                    type='text'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            <div className='form-item-container'>
                <label htmlFor='productPrice'>Product Price</label>
                <p className='form-error'>
                    {validations.productPrice && validations.productPrice
                    || errors.productPrice && errors.productPrice}
                </p>
                <input
                    id='productPrice'
                    type='number'
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                />
            </div>
            <div className='form-item-container'>
                <label htmlFor='shippingPrice'>Shipping Price</label>
                <p className='form-error'>
                    {validations.shippingPrice && validations.shippingPrice
                    || errors.shippingPrice && errors.shippingPrice}
                </p>
                <input
                    id='shippingPrice'
                    type='number'
                    value={shippingPrice}
                    onChange={(e) => setShippingPrice(e.target.value)}
                />
            </div>
            <div className='form-item-container'>
                <label htmlFor='quantity'>Quantity</label>
                <p className='form-error'>
                    {validations.quantity && validations.quantity
                    || errors.quantity && errors.quantity}
                </p>
                <input
                    id='quantity'
                    type='number'
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>
            <button
                type='submit'
                className={submitClass}
                disabled={submitDisabled}
            >
                Create Shop
            </button>
        </form>
    </>
}

export default EditProductModal;
