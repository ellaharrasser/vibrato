from flask import Blueprint, request
from flask_login import current_user, login_required

from ..utils.aws import get_unique_filename, upload_file_to_s3
from ..models import db, Product, ProductImage, User, Shop
from ..forms.product_form import ProductForm, EditProductForm


product_routes = Blueprint('products', __name__)


@product_routes.route('')
def products(page: int = 1, per_page: int = 20):
    """
    Query for all products with pagination.

    If logged in, excludes returned products belonging to the current user.
    """
    base_query = Product.query

    user_id = request.args.get('user_id', type=int)
    if user_id:
        base_query = base_query.join(User).filter(User.id == user_id)

    exclude_user_id = request.args.get('exclude_user_id', type=int)
    if exclude_user_id:
        base_query = base_query.join(User).filter(User.id != exclude_user_id)

    # category = request.args.get('category', type=str)
    # if category:
    #     base_query = base_query.filter_by(category=category)

    products_count = base_query.count()
    products_query = base_query.paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )
    products = [product.to_dict() for product in products_query]

    return {
        'products': products,
        'count': products_count,
    }


@product_routes.route('/<product_id>', methods=['GET'])
def get_product_by_id(product_id: int):
    """
    Query for a product by id.
    """
    product = Product.query.get(product_id)

    if not product:
        return { 'errors': { 'message': 'Product not found' } }, 404

    return { 'product': product.to_dict() }


@product_routes.route('/<product_id>', methods=['PUT', 'DELETE'])
@login_required
def product_by_id(product_id: int):
    """
    Edit or delete a product by id.
    """
    product = Product.query.get(product_id)

    if not product:
        return { 'errors': { 'message': 'Product not found' } }, 404

    elif product.user.id != current_user.id:
        return { 'errors': { 'message': 'Unauthorized' } }, 401

    elif request.method == 'PUT':
        form = EditProductForm() # TODO: Add image editing
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            product.name = form.data['name']
            product.brand = form.data['brand']
            product.category = form.data['category']
            product.condition = form.data['condition']
            product.description = form.data['description']
            product.product_price = form.data['product_price']
            product.shipping_price = form.data['shipping_price']
            product.quantity = form.data['quantity']

            db.session.commit()
            return product.to_dict()

        return form.errors, 400

    elif request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        return 204


@product_routes.route('/new', methods=['POST'])
@login_required
def new_product():
    """
    Create a new Product instance and store it in the database.
    """
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product = Product(
            shop_id=form.data['shop_id'],
            name=form.data['name'],
            brand=form.data['brand'],
            category=form.data['category'],
            condition=form.data['condition'],
            description=form.data['description'],
            product_price=form.data['product_price'],
            shipping_price=form.data['shipping_price'],
            quantity=form.data['quantity'],
        )

        db.session.add(product)
        db.session.flush() # Flush session to populate id field on product

        images = []
        for num in range(1, 6): # "Iterate" through form image fields
            if form.data[f'image_{num}']:
                image = form.data[f'image_{num}']
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_s3(image)

                if 'url' not in upload: # Check for errors while uploading
                    return form.errors, 400

                images.append(ProductImage(
                    product_id=product.id,
                    image=upload['url']
                ))

        db.session.add_all(images)
        db.session.commit()
        return product.to_dict(rels=False)
    else:
        return form.errors, 400
