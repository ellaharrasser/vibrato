import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { thunkNewShop } from '../../redux/shops';

function NewShopForm() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = useSelector((state) => state.session.user);

	const [form, setForm] = useState({
		name: '',
		description: '',
		imageUrl: '',
		imageFile: null,
		imageFilename: '',
	});

	const [imageLoading, setImageLoading] = useState(false);
	const [validations, setValidations] = useState({});
	const [errors, setErrors] = useState({});
	const [submitInfo, setSubmitInfo] = useState({
		hasSubmitted: false,
		buttonDisabled: false,
		buttonClass: 'button-submit',
	});

	const handleFormUpdate = (e) => {
    setForm({
      ...form,
			[e.target.id]: e.target.value,
		});
	};

  // Helper function for generating thumbnail URL and updating image states
  const handleImageUpdate = (e) => {
    e.stopPropagation();

    const newImageFile = e.target.files[0];

    // Limit image size to 5 Mb
    if (newImageFile.size > 5000000) {
      setValidations({
        ...validations,
        image: 'Image must be less than 5 Mb.'
      });
      return;
    }

    // Generate local thumbnail URL
    const newImageURL = URL.createObjectURL(newImageFile);

    setForm({
      ...form,
      imageUrl: newImageURL,
      imageFile: newImageFile,
      imageFilename: newImageFile.name,
    });
  };

	// Form validation helper callback function
	const getValidations = useCallback(() => {
    const newValidations = {};

		if (!form.name) {
      newValidations.name = 'A name is required.';
		} else if (form.name.length > 255) {
      newValidations.name = 'Names must be 255 or fewer characters.';
		}

		if (!form.description) {
      newValidations.description = 'A description is required.';
		} else if (form.description.length > 255) {
      newValidations.description =
      'Descriptions must be 255 or fewer characters.';
		}

		if (!form.imageFile) {
      newValidations.image = 'An image is required.';
		} else if (form.imageFile.size > 5000000) {
      newValidations.image = 'Image must be less than 5 Mb.'
    }

		return newValidations;
	}, [form.name, form.description, form.imageFile]);

  // Form validations
	useEffect(() => {
    // Prevent validations from populating until initial submission
		if (submitInfo.hasSubmitted) {
      const newValidations = getValidations();
      const isValid = Object.keys(newValidations).length === 0;
      setSubmitInfo({
        ...submitInfo,
        buttonDisabled: !isValid,
        buttonClass: isValid
          ? 'button-submit'
          : 'button-submit-disabled',
      });
      setValidations(newValidations);
    }
	}, [submitInfo, submitInfo.hasSubmitted, getValidations]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!submitInfo.hasSubmitted) {
      setSubmitInfo({ ...submitInfo, hasSubmitted: true });

			// Prevent submission if validation errors exist
			const newValidations = getValidations();
			if (Object.keys(newValidations).length) return;
		}

		const formData = new FormData();
		formData.append('owner_id', user.id);
		formData.append('name', form.name);
		formData.append('description', form.description);
		formData.append('image', form.imageFile);
		setImageLoading(true);

		const serverResponse = await dispatch(thunkNewShop(formData));
		if (serverResponse.shop) {
			navigate(`/shops/${serverResponse.shop.id}`);
		} else if (serverResponse) {
			setErrors(serverResponse);
		}
	};

	return (
		<main className='container px-8 py-4 flex flex-col flex-nowrap items-center gap-2 bg-white overflow-hidden'>
			<h1 className='my-8 text-3xl font-bold'>Create a Shop</h1>
			<form
				onSubmit={handleSubmit}
				encType='multipart/form-data'
				className='container max-w-[60ch] flex flex-col flex-nowrap justify-center items-start gap-4'
			>
				<div className='container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
					<div className='flex items-center gap-2'>
						<label htmlFor='name' className='text-lg font-semibold'>
							Name
						</label>
						<p className='text-error'>
							{(validations.name && validations.name) ||
								(errors.name && errors.name)}
						</p>
					</div>
					<input
						id='name'
						type='text'
						required={true}
						minLength={1}
						maxLength={255}
						value={form.name}
						onChange={handleFormUpdate}
						className='w-full px-1 border border-stone-400 rounded-md'
					/>
				</div>
				<div className='container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
					<div className='flex items-center gap-2'>
						<label
							htmlFor='description'
							className='text-lg font-semibold'
						>
							Description
						</label>
						<p className='text-error'>
							{(validations.description &&
								validations.description) ||
								(errors.description && errors.description)}
						</p>
					</div>
					<input
						id='description'
						type='text'
						required={true}
						minLength={1}
						maxLength={255}
						value={form.description}
						onChange={handleFormUpdate}
						className='w-full px-1 border border-stone-400 rounded-md'
					/>
				</div>
				<div className='container min-w-[40ch] box-content px-2 pb-1 flex flex-col flex-nowrap justify-center gap-1 border-l-2 border-stone-400'>
					<div className='flex items-center gap-2'>
						<label className='text-lg font-semibold'>Image</label>
						<p className='text-error'>
							{(validations.image && validations.image) ||
								(errors.image && errors.image)}
						</p>
					</div>
					<label
						htmlFor='image'
						className='underline cursor-pointer text-stone-800 transition-colors hover:text-teal-500'
					>
						{form.imageFilename || 'Upload an image'}
					</label>
					<input
						id='image'
						type='file'
						required={true}
						accept='image/*'
						onChange={handleImageUpdate}
						className='hidden'
					/>
					<img
						src={form.imageFile}
						className='w-auto h-full max-w-16 max-h-16'
					/>
				</div>
				{errors.server && <p className='text-error'>{errors.server}</p>}
				<div className='w-full self-center flex flex-row flex-nowrap justify-center gap-4'>
					<button
						type='submit'
						className={submitInfo.buttonClass}
						disabled={submitInfo.disabled}
					>
						Create Shop
					</button>
				</div>
				<p className='text-base text-stone-800'>
					{imageLoading && 'Loading...'}
				</p>
			</form>
		</main>
	);
}

export default NewShopForm;
