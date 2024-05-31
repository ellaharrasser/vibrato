from flask import Blueprint, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from flask_sqlalchemy.pagination import Pagination

from ..models import Product


product_routes = Blueprint('products', __name__)


@product_routes.route('/')
def products(page=1, size=40) -> dict:
    """
    Query for all products. If logged in, does not include current user's products.
    """
    if current_user:
        products_query = Product.query.filter_by(Product.shop.owner_id != current_user.id)
    else:
        products_query = Product.query
