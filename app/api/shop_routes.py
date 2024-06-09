from flask import Blueprint, request
from flask_login import current_user, login_required

from ..models import db, Shop
from ..forms.shop_form import ShopForm, EditShopForm
from ..utils.aws import get_unique_filename, upload_file_to_s3


shop_routes = Blueprint('shops', __name__)


@shop_routes.route('')
def shops():
    """
    Query for all shops with pagination.
    """
    shops_query = Shop.query

    owner_id = request.args.get('owner_id', type=int)
    if owner_id:
        shops_query = shops_query.filter_by(owner_id=owner_id)

    shops = [shop.to_dict() for shop in shops_query]

    return { 'shops': shops }


@shop_routes.route('/<shop_id>', methods=['GET'])
def get_shop_by_id(shop_id: int):
    """
    Query for a shop by id.
    """
    shop = Shop.query.get(shop_id)

    if not shop:
        return { 'errors': { 'message': 'Shop not found' } }, 404

    return { 'shop': shop.to_dict() }


@shop_routes.route('/<shop_id>', methods=['PUT', 'DELETE'])
@login_required
def shop_by_id(shop_id: int):
    """
    Edit or delete a shop by id.
    """
    shop = Shop.query.get(shop_id)

    if not shop:
        return { 'errors': { 'message': 'Shop not found' } }, 404

    elif shop.owner.id != current_user.id:
        return { 'errors': { 'message': 'Unauthorized' } }, 401

    elif request.method == 'PUT':
        form = EditShopForm()
        form['csrf_token'].data = request.cookies['csrf_token']

        if form.validate_on_submit():
            shop.name = form.data['name']
            shop.description = form.data['description']

            db.session.commit()
            return shop.to_dict()

        return form.errors, 400

    elif request.method == 'DELETE':
        db.session.delete(shop)
        db.session.commit()
        return { 'message': 'Successfully deleted' }, 204


@shop_routes.route('/new', methods=['POST'])
@login_required
def new_shop():
    """
    Create a new Shop instance and store it in the database.
    """
    form = ShopForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        image = form.data['image']
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)

        if 'url' not in upload: # Check for errors while uploading
            return form.errors, 400

        shop = Shop(
            owner_id=form.data['owner_id'],
            name=form.data['name'],
            description=form.data['description'],
            image=upload['url'],
        )

        db.session.add(shop)
        db.session.commit()
        return shop.to_dict()
    return form.errors, 400
