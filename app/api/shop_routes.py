from flask import Blueprint, request
from flask_login import login_required

from ..models import db, Shop
from ..forms.shop_form import ShopForm


shop_routes = Blueprint('shops', __name__)


@shop_routes.route('/<shop_id>')
def shop_by_id(shop_id: int):
    """
    Query for a shop by id.
    """
    shop = Shop.get(shop_id)
    if not shop:
        return { 'errors': { 'message': 'Shop not found' } }, 404
    return { 'shop': shop }


@shop_routes.route('/new', methods=['POST'])
@login_required
def new_shop():
    """
    Create a new Shop instance and store it in the database.
    """
    form = ShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        shop = Shop(
            owner_id=form.data['owner_id'],
            name=form.data['name'],
            description=form.data['description'],
            image=form.data['image'],
        )

        db.session.add(shop)
        db.session.commit()
        return shop.to_dict(rels=False)
    else:
        return form.errors, 400
