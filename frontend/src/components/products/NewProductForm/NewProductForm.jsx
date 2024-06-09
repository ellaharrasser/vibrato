import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getKeys, getValues } from '../../../utils/misc';
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
    const [image2, setImage2] = useState(undefined);
    const [image3, setImage3] = useState(undefined);
    const [image4, setImage4] = useState(undefined);
    const [image5, setImage5] = useState(undefined);
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

        if (+quantity <= 0) {
            newValidations.quantity = 'A quantity must be 1 or more';
        }

        if (!image1) {
            newValidations.image = 'At least one image is required.';
        }

        // TODO: Add image validations

        return newValidations;
    }, [shopId, name, brand, category, condition, description, quantity, image1]);

    useEffect(() => {
        if (!hasSubmitted) return; // Prevent validations until initial submission
        const newValidations = getValidations();
        setSubmitDisabledStatus(getKeys(newValidations).length > 0);
        setValidations(newValidations);
    }, [hasSubmitted, getValidations]);

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
        formData.append('product_price', +productPrice);
        formData.append('shipping_price', +shippingPrice);
        formData.append('quantity', +quantity);
        formData.append('image_1', image1);
        image2 && formData.append('image_2', image2);
        image3 && formData.append('image_3', image3);
        image4 && formData.append('image_4', image4);
        image5 && formData.append('image_5', image5);
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
            {errors.server && <p className='server-error'>{errors.server}</p>}
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
                <div className='form-item-container form-image'>
                    <label htmlFor='image-1'>Image</label>
                    <p className='form-error'>
                        {validations.image1 && validations.image1
                        || errors.image1 && errors.image1}
                    </p>
                    <input
                        id='image-1'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage1(e.target.files[0])}
                    />
                </div>
                {image1 && <div className='form-item-container form-image'>
                    <label htmlFor='image-2'>Image</label>
                    <p className='form-error'>
                        {validations.image2 && validations.image2
                        || errors.image2 && errors.image2}
                    </p>
                    <input
                        id='image-2'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage2(e.target.files[0])}
                    />
                </div>}
                {image2 && <div className='form-item-container form-image'>
                    <label htmlFor='image-3'>Image</label>
                    <p className='form-error'>
                        {validations.image3 && validations.image3
                        || errors.image3 && errors.image3}
                    </p>
                    <input
                        id='image-3'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage3(e.target.files[0])}
                    />
                </div>}
                {image3 && <div className='form-item-container form-image'>
                    <label htmlFor='image-4'>Image</label>
                    <p className='form-error'>
                        {validations.image4 && validations.image4
                        || errors.image4 && errors.image4}
                    </p>
                    <input
                        id='image4'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage4(e.target.files[0])}
                    />
                </div>}
                {image4 && <div className='form-item-container form-image'>
                    <label htmlFor='image-5'>Image</label>
                    <p className='form-error'>
                        {validations.image5 && validations.image5
                        || errors.image5 && errors.image5}
                    </p>
                    <input
                        id='image-5'
                        type='file'
                        accept='image/*'
                        onChange={(e) => setImage5(e.target.files[0])}
                    />
                </div>}
                <button
                    type='submit'
                    className={submitClass}
                    disabled={submitDisabled}
                >
                    Create Shop
                </button>
                <p className='image-loading'>
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
