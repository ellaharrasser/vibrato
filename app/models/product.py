from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    shop_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('shops.id')),
        nullable=False
    )
    name = db.Column(db.String(255), nullable=False)
    brand = db.Column(db.String(255), nullable=False)
    # Category will be changed to a separate, self-referential tree-like DB table later
    category = db.Column(db.String(255), nullable=False)
    condition = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    product_price = db.Column(db.Integer, nullable=False)
    shipping_price = db.Column(db.Integer, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now()) # server_default makes the DB generate the timestamp
    updated_at = db.Column(db.DateTime, server_default=func.now(), onupdate=func.now())

    shop = db.relationship('Shop', back_populates='products')
    images = db.relationship(
        'ProductImage',
        back_populates='product',
        cascade='all, delete-orphan'
    )
    cart_products = db.relationship(
        'CartProduct',
        back_populates='product',
        cascade='all, delete-orphan'
    )
    reviews = db.relationship(
        'ProductReview',
        back_populates='product',
        cascade='all, delete-orphan'
    )

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'brand': self.brand,
            'category': self.category,
            'condition': self.condition,
            'description': self.description,
            'productPrice': self.product_price,
            'shippingPrice': self.shipping_price,
            'quantity': self.quantity,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
