from flask import Blueprint, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from flask_sqlalchemy.pagination import Pagination

from ..models import Product


product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def products(page: int = 1, per_page: int = 20):
    """
    Query for all products with pagination.

    If logged in, excludes returned products belonging to the current user.
    """
    if current_user:
        base_query = Product.query.filter(
            Product.shop.owner_id != current_user.id
        )
    else:
        base_query = Product.query

    # Add query filters here

    products_query = base_query.paginate(page, per_page, error_out=False)
    products_count = products_query.count()
    products = [product.to_dict() for product in products_query.all()]


    return {
        'products': products,
        'count': products_count,
    }
