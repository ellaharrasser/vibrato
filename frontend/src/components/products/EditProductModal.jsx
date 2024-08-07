import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useModal } from '../../context/Modal';
import { getKeys, endsWithOne, imageSuffixes } from '../../utils/misc';
import conditions from '../../utils/conditions';
import { thunkEditProduct } from '../../redux/products';


function EditProductModal({ product }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [name, setName] = useState(product.name);
    const [brand, setBrand] = useState(product.brand);
    const [category, setCategory] = useState(product.category);
    const [condition, setCondition] = useState(product.condition);
    const [description, setDescription] = useState(product.description);
    const [productPrice, setProductPrice] = useState(product.productPrice / 100);
    const [shippingPrice, setShippingPrice] = useState(product.shippingPrice / 100);
    const [quantity, setQuantity] = useState(product.quantity);
    const [image1, setImage1] = useState(null);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const [validations, setValidations] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitClass, setSubmitClass] = useState('button-submit');

    const setSubmitDisabledStatus = (disabled) => {
        (disabled)
            ? setSubmitClass('button-submit-disabled')
            : setSubmitClass('button-submit');
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

        if (productPrice !== 0 && !productPrice) {
            newValidations.productPrice = 'A product price is required.';
        } else if (Number.isNaN(productPrice)) {
            newValidations.productPrice = 'The product price format is invalid.';
        } else if (productPrice < 1) {
            newValidations.productPrice = 'Product prices must be $1.00 or greater.';
        }

        if (shippingPrice !== 0 && !shippingPrice) {
            newValidations.shippingPrice = 'A shipping price is required.';
        } else if (Number.isNaN(productPrice)) {
            newValidations.shippingPrice = 'The shipping price format is invalid.';
        } else if (shippingPrice < 0) {
            newValidations.shippingPrice = 'Shipping prices must be $0.00 or greater.';
        }

        if (quantity <= 0) {
            newValidations.quantity = 'A quantity must be 1 or more';
        }

        if (file && !endsWithOne(filename, imageSuffixes)) {
            newValidations.image1 = 'An image must be a pdf, png, jpg, jpeg, or gif.'
        }

        return newValidations;
    }, [
        name, brand, category, condition, description, productPrice,
        shippingPrice, quantity, file, filename,
    ]);

    // Helper function for generating thumbnail URL and setting image states
    const fileWrap = (e) => {
        e.stopPropagation();

        const tempFile = e.target.files[0];

        // Limit image size to 5 Mb
        if (tempFile.size > 5000000) {
            setFilename('Image must be less than 5 Mb.');
            return;
        }

        // Generate local thumbnail URL
        const newImageURL = URL.createObjectURL(tempFile);
        setImage1(newImageURL);
        setFile(tempFile);
        setFilename(tempFile.name);
    }

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
        formData.append('product_price', Math.round(productPrice * 100));
        formData.append('shipping_price', Math.round(shippingPrice * 100));
        formData.append('quantity', +quantity);
        if (file) {
            formData.append('image_1', file);
            setImageLoading(true);
        }

        const serverResponse = await dispatch(
            thunkEditProduct(formData, product.id)
        );

        if (serverResponse.product) {
            closeModal();
        } else if (serverResponse) {
            setErrors(serverResponse);
            setImageLoading(false);
        }
    };

    return (
        <div className='container px-8 py-4 flex flex-col flex-nowrap items-center gap-2 bg-white border border-stone-200 rounded-xl overflow-hidden'>
            <h1 className='my-8 text-3xl font-bold'>
                Edit an existing Product
            </h1>
            <form
                id='edit-product-form'
                onSubmit={handleSubmit}
                encType='multipart/form-data'
                className='container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4'
            >
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='name' className='text-lg font-semibold'>
                            Name
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.name && validations.name
                            || errors.name && errors.name}
                        </p>
                    </div>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='brand' className='text-lg font-semibold'>
                            Brand
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.brand && validations.brand
                            || errors.brand && errors.brand}
                        </p>
                    </div>
                    <input
                        id='brand'
                        type='text'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='category' className='text-lg font-semibold'>
                            Category
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.category && validations.category
                            || errors.category && errors.category}
                        </p>
                    </div>
                    <input
                        id='category'
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='condition' className='text-lg font-semibold'>
                            Condition
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.condition && validations.condition
                            || errors.condition && errors.condition}
                        </p>
                    </div>
                    <select
                        id='condition'
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className='w-full px-2 py-1 rounded-full cursor-pointer bg-stone-200 border border-stone-400 transition-colors hover:bg-stone-100 focus:bg-stone-100'
                    >
                        <option value=''>Please select a condition...</option>
                        {conditions.map(condition => (
                            <option value={condition} key={condition}>
                                {condition}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='description' className='text-lg font-semibold'>
                            Description
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.description && validations.description
                            || errors.description && errors.description}
                        </p>
                    </div>
                    <input
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='productPrice' className='text-lg font-semibold'>
                            Product Price
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.productPrice && validations.productPrice
                            || errors.product_price && errors.product_price}
                        </p>
                    </div>
                    <input
                        id='productPrice'
                        type='number'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='shippingPrice' className='text-lg font-semibold'>
                            Shipping Price
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.shippingPrice && validations.shippingPrice
                            || errors.shipping_price && errors.shipping_price}
                        </p>
                    </div>
                    <input
                        id='shippingPrice'
                        type='number'
                        value={shippingPrice}
                        onChange={(e) => setShippingPrice(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label htmlFor='quantity' className='text-lg font-semibold'>
                            Quantity
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.quantity && validations.quantity
                            || errors.quantity && errors.quantity}
                        </p>
                    </div>
                    <input
                        id='quantity'
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className='w-full px-1 border border-stone-400 rounded-md'
                    />
                </div>
                <div className='min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
                    <div className='w-full min-w-[40ch] flex items-center gap-2'>
                        <label className='text-lg font-semibold'>
                            Image
                        </label>
                        <p className='font-base text-red-500'>
                            {validations.image1 && validations.image1
                            || errors.image1 && errors.image1}
                        </p>
                    </div>
                    <label htmlFor='image-1' className='underline cursor-pointer text-stone-800 transition-colors hover:text-teal-500'>
                        {filename || 'Upload an image (optional)'}
                    </label>
                    <input
                        id='image-1'
                        type='file'
                        accept='image/*'
                        onChange={fileWrap}
                        className='hidden'
                    />
                    <img
                        src={image1}
                        className='w-auto h-full max-w-16 max-h-16'
                    />
                </div>
                {errors.server && (
                    <p className='font-base text-red-600'>
                        {errors.server}
                    </p>
                )}
                <div className='w-full self-center flex flex-row flex-nowrap justify-center gap-4'>
                    <button
                        type='submit'
                        disabled={submitDisabled}
                        className={submitClass}
                    >
                        Edit Shop
                    </button>
                    <button
                        type='button'
                        onClick={closeModal}
                        className='button-cancel'
                    >
                        Cancel
                    </button>
                </div>
                <p className='font-base text-stone-800'>
                    {imageLoading && 'Loading...'}
                </p>
            </form>
        </div>
    )
}

export default EditProductModal;
