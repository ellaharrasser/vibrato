import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
    getKeys, getValues, endsWithOne, imageSuffixes
} from '../../../utils/misc';
// import { validateUSD } from '../../../utils/validate';
import conditions from '../../../utils/conditions';
import { thunkLoadUserShops } from '../../../redux/shops';
import { thunkNewProduct } from '../../../redux/products';
import './NewProductForm.css';


function NewProductForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.session.user);

    const [shopId, setShopId] = useState('');
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [condition, setCondition] = useState('');
    const [description, setDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [shippingPrice, setShippingPrice] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [image1, setImage1] = useState(undefined);
    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const [validations, setValidations] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitClass, setSubmitClass] = useState('submit');

    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!user) return navigate('/');
        const fetchUserShops = async () => {
            await dispatch(thunkLoadUserShops(user));
            setDataLoaded(true);
        }
        fetchUserShops();
    }, [user, dispatch, navigate]);

    const shops = useSelector(state => state.shops.shops);

    const setSubmitDisabledStatus = (disabled) => {
      (disabled)
        ? setSubmitClass('submit disabled')
        : setSubmitClass('submit');
      setSubmitDisabled(disabled);
    };

    const getValidations = useCallback(() => {
        const newValidations = {};

        if (!shopId) {
            newValidations.shop = 'A shop is required.';
        }

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
        } else if (Number.isNaN(productPrice)) {
            newValidations.productPrice = 'The product price format is invalid.';
        } else if (productPrice < 1) {
            newValidations.productPrice = 'Product prices must be $1.00 or greater.';
        }

        if (!shippingPrice) {
            newValidations.shippingPrice = 'A shipping price is required.';
        } else if (Number.isNaN(productPrice)) {
            newValidations.shippingPrice = 'The shipping price format is invalid.';
        } else if (shippingPrice < 0) {
            newValidations.shippingPrice = 'Shipping prices must be $0.00 or greater.';
        }

        if (quantity <= 0) {
            newValidations.quantity = 'A quantity must be 1 or more';
        }

        if (!file) {
            newValidations.image1 = 'An image is required.';
        } else if (!endsWithOne(filename, imageSuffixes)) {
            newValidations.image1 = 'An image must be a pdf, png, jpg, jpeg, or gif.'
        }

        return newValidations;
    }, [
        shopId, name, brand, category, condition, description, productPrice,
        shippingPrice, quantity, file, filename
    ]);

    useEffect(() => {
        if (!hasSubmitted) return; // Prevent validations until initial submission
        const newValidations = getValidations();
        setSubmitDisabledStatus(getKeys(newValidations).length > 0);
        setValidations(newValidations);
    }, [hasSubmitted, getValidations]);

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

    // Navigate to shop creation form if no shops exist
    if (dataLoaded && !getKeys(shops).length) return navigate('shops/new');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hasSubmitted) { // Prevent submission if validation errors exist
            setHasSubmitted(true);
            const newValidations = getValidations();
            if (getKeys(newValidations).length) return;
        }

        const formData = new FormData();
        formData.append('user_id', user.id);
        formData.append('shop_id', shopId);
        formData.append('name', name);
        formData.append('brand', brand);
        formData.append('category', category);
        formData.append('condition', condition);
        formData.append('description', description);
        formData.append('product_price', Math.round(productPrice * 100));
        formData.append('shipping_price', Math.round(shippingPrice * 100));
        formData.append('quantity', +quantity);
        formData.append('image_1', file);
        setImageLoading(true);

        const serverResponse = await dispatch(thunkNewProduct(formData));
        if (serverResponse.product) {
            navigate(`/products/${serverResponse.product.id}`);
        } else if (serverResponse) {
            setErrors(serverResponse);
        }
    };

    return dataLoaded ? (
        <main id='new-product-page'>
            <h1>List a new Product</h1>
            <form
                id='new-product-form'
                onSubmit={handleSubmit}
                encType='multipart/form-data'
            >
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='shop'>Shop</label>
                        <p className='form-error'>
                            {validations.shop && validations.shop
                            || errors.shop && errors.shop}
                        </p>
                    </div>
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
                    <div className='form-item-text'>
                        <label htmlFor='name'>Name</label>
                        <p className='form-error'>
                            {validations.name && validations.name
                            || errors.name && errors.name}
                        </p>
                    </div>
                    <input
                        id='name'
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='brand'>Brand</label>
                        <p className='form-error'>
                            {validations.brand && validations.brand
                            || errors.brand && errors.brand}
                        </p>
                    </div>
                    <input
                        id='brand'
                        type='text'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='category'>Category</label>
                        <p className='form-error'>
                            {validations.category && validations.category
                            || errors.category && errors.category}
                        </p>
                    </div>
                    <input
                        id='category'
                        type='text'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='condition'>Condition</label>
                        <p className='form-error'>
                            {validations.condition && validations.condition
                            || errors.condition && errors.condition}
                        </p>
                    </div>
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
                    <div className='form-item-text'>
                        <label htmlFor='description'>Description</label>
                        <p className='form-error'>
                            {validations.description && validations.description
                            || errors.description && errors.description}
                        </p>
                    </div>
                    <input
                        id='description'
                        type='text'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='productPrice'>Product Price</label>
                        <p className='form-error'>
                            {validations.productPrice && validations.productPrice
                            || errors.product_price && errors.product_price}
                        </p>
                    </div>
                    <input
                        id='productPrice'
                        type='number'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='shippingPrice'>Shipping Price</label>
                        <p className='form-error'>
                            {validations.shippingPrice && validations.shippingPrice
                            || errors.shipping_price && errors.shipping_price}
                        </p>
                    </div>
                    <input
                        id='shippingPrice'
                        type='number'
                        value={shippingPrice}
                        onChange={(e) => setShippingPrice(e.target.value)}
                    />
                </div>
                <div className='form-item-container'>
                    <div className='form-item-text'>
                        <label htmlFor='quantity'>Quantity</label>
                        <p className='form-error'>
                            {validations.quantity && validations.quantity
                            || errors.quantity && errors.quantity}
                        </p>
                    </div>
                    <input
                        id='quantity'
                        type='number'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div className='form-item-container' id='image-upload-container'>
                    <div className='form-item-text'>
                        <label>Image</label>
                        <p className='form-error'>
                            {validations.image1 && validations.image1
                            || errors.image1 && errors.image1}
                        </p>
                    </div>
                    <label className='image-upload' htmlFor='image-1'>
                        Upload Image
                    </label>
                    <input
                        id='image-1'
                        type='file'
                        accept='image/*'
                        onChange={fileWrap}
                    />
                    <img
                        className='image-upload-thumbnail'
                        src={image1}
                    />
                    <span className='filename'>{filename || 'No file selected.'}</span>
                </div>
                <p className='server-error'>{errors.server && errors.server}</p>
                <div className='buttons-container'>
                    <button
                        type='submit'
                        className={submitClass}
                        disabled={submitDisabled}
                    >
                        Create Product
                    </button>
                </div>
                <p className='loading'>
                    {imageLoading && 'Loading...'}
                </p>
            </form>
        </main>
    ) : (
        <main>
            <p className='loading'>Loading...</p>
        </main>
    );
}

export default NewProductForm;
