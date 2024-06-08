import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getKeys, getFromIndex } from '../../../utils/misc';
import conditions from '../../../utils/conditions';
import { thunkLoadUserShops } from '../../../redux/shops';
import { thunkEditProduct, thunkLoadCurrentProduct } from '../../../redux/products';
import './EditProductForm.css';


function EditProductForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { productId } = useParams();

    const user = useSelector(state => state.session.user);
    const product = useSelector(state => state.products.currentProduct);

    const [name, setName] = useState(product?.name);
    const [brand, setBrand] = useState(product?.brand);
    const [category, setCategory] = useState(product?.category);
    const [condition, setCondition] = useState(product?.condition);
    const [description, setDescription] = useState(product?.description);
    const [productPrice, setProductPrice] = useState(product?.productPrice);
    const [shippingPrice, setShippingPrice] = useState(product?.shippingPrice);
    const [quantity, setQuantity] = useState(product?.quantity);
    // Check if images exist, and if so, set each initial state to their urls
    const [image1, setImage1] = useState(
        // getFromIndex(product.images, 0)?.image
        null
    );
    const [image2, setImage2] = useState(
        // getFromIndex(product.images, 1)?.image
        null
    );
    const [image3, setImage3] = useState(
        // getFromIndex(product.images, 2)?.image
        null
    );
    const [image4, setImage4] = useState(
        // getFromIndex(product.images, 3)?.image
        null
    );
    const [image5, setImage5] = useState(
        // getFromIndex(product.images, 4)?.image
        null
    );
    const [imageLoading, setImageLoading] = useState(false);

    // Utility state for submitting only the fields that have changed
    const [editedFields, setEditedFields] = useState({});
    const [validations, setValidations] = useState({});
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(false);
    const [submitClass, setSubmitClass] = useState('submit');

    const [dataLoaded, setDataLoaded] = useState(false);

    // Load initial field states and initialFields object
    const preloadStates = () => {

    };

    useEffect(() => {
        if (!user) return navigate('/');
        const fetchProduct = async () => {
            await dispatch(thunkLoadCurrentProduct(productId));
            setDataLoaded(true);
        }
        fetchProduct();
        preloadStates();
    }, [user, productId, dispatch, navigate, preloadStates]);

    const setSubmitDisabledStatus = (disabled) => {
      (disabled)
        ? setSubmitClass('submit disabled')
        : setSubmitClass('submit');
      setSubmitDisabled(disabled);
    };

    // TODO: Add image validations (edit in NewProductForm and copy to here)
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

        if (!image1) {
            newValidations.image = 'At least one image is required.';
        }

        return newValidations;
    }, [
        name, brand, category, condition, description, productPrice,
        shippingPrice, quantity, image1, image2, image3, image4, image5,
    ]);

    const getEditedFields = useCallback(() => {
        const newEditedFields = {};

        if (product.name !== name) {
            newEditedFields.name = name;
        }
        if (product.brand !== brand) {
            newEditedFields.brand = brand;
        }
        if (product.category !== category) {
            newEditedFields.category = category;
        }
        if (product.condition !== condition) {
            newEditedFields.condition = condition;
        }
        if (product.description !== description) {
            newEditedFields.description = description;
        }
        if (product.productPrice !== productPrice) {
            newEditedFields.productPrice = description;
        }
        if (product.shippingPrice !== shippingPrice) {
            newEditedFields.productPrice = productPrice;
        }
        if (product.quantity !== quantity) {
            newEditedFields.quantity = quantity;
        }
        // if (getFromIndex(product.images, 0)?.image !== image1) {
        //     newEditedFields.image1 = image1;
        // }
        // if (getFromIndex(product.images, 1)?.image !== image2) {
        //     newEditedFields.image2 = image2;
        // }
        // if (getFromIndex(product.images, 2)?.image !== image3) {
        //     newEditedFields.image3 = image3;
        // }
        // if (getFromIndex(product.images, 3)?.image !== image4) {
        //     newEditedFields.image4 = image4;
        // }
        // if (getFromIndex(product.images, 4)?.image !== image5) {
        //     newEditedFields.image5 = image5;
        // }

        return newEditedFields;
    }, [
        product, name, brand, category, condition, description, productPrice,
        shippingPrice, quantity, image1, image2, image3, image4, image5,
    ])

    useEffect(() => {
        const newEditedFields = getEditedFields();
        // Disable submit button if no fields have changed
        setSubmitDisabledStatus(getKeys(newEditedFields).length === 0);
        setEditedFields(newEditedFields);
    }, [getEditedFields]);

    useEffect(() => {
        // Prevent validations until initial submission
        if (!hasSubmitted) return;
        const newValidations = getValidations();
        setSubmitDisabledStatus(getKeys(newValidations).length > 0);
        setValidations(newValidations);
    }, [hasSubmitted, getValidations]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prevent submission if validation errors exist
        if (!hasSubmitted) {
            setHasSubmitted(true);
            const newValidations = getValidations();
            if (getKeys(newValidations).length) return;
        }

        const formData = new FormData();
        if ('name' in editedFields) {
            formData.append('name', name);
        }
        if ('brand' in editedFields) {
            formData.append('brand', brand);
        }
        if ('category' in editedFields) {
            formData.append('category', category);
        }
        if ('condition' in editedFields) {
            formData.append('condition', condition);
        }
        if ('description' in editedFields) {
            formData.append('description', description);
        }
        if ('productPrice' in editedFields) {
            formData.append('product_price', productPrice);
        }
        if ('shippingPrice' in editedFields) {
            formData.append('shipping_price', shippingPrice);
        }
        if ('quantity' in editedFields) {
            formData.append('quantity', quantity);
        }
        if ('image1' in editedFields) {
            formData.append('image_1', image1);
        }
        if ('image2' in editedFields) {
            formData.append('image_2', image2);
        }
        if ('image3' in editedFields) {
            formData.append('image_3', image3);
        }
        if ('image4' in editedFields) {
            formData.append('image_4', image4);
        }
        if ('image5' in editedFields) {
            formData.append('image_5', image5);
        }
        setImageLoading(true);

        const serverResponse = await dispatch(thunkEditProduct(formData));
        if (serverResponse.product) {
            navigate(`/products/${serverResponse.product.id}`);
        } else if (serverResponse) {
            setErrors(serverResponse);
        }
    };

    return dataLoaded ? (
        <main>
            <h1>Edit an existing Product</h1>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
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

export default EditProductForm;
