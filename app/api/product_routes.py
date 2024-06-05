from flask import Blueprint, request
from flask_login import login_required

from ..models import db, Product, ProductImage
from ..forms.product_form import ProductForm


product_routes = Blueprint('products', __name__)


@product_routes.route('')
def products(page: int = 1, per_page: int = 20):
    """
    Query for all products with pagination.

    If logged in, excludes returned products belonging to the current user.
    """
    base_query = Product.query

    # Add query filters here

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


@product_routes.route('/<product_id>')
def product_by_id(product_id: int):
    """
    Query for a product by id.
    """
    product = Product.query.get(product_id)
    if not product:
        return { 'errors': { 'message': 'Product not found' } }, 404
    return { 'product': product.to_dict() }


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
                images.append(ProductImage(
                    product_id=product.id,
                    image=form.data[f'image_{num}']
                ))

        db.session.add_all(images)
        db.session.commit()
        return product.to_dict(rels=False)
    else:
        return form.errors, 400
