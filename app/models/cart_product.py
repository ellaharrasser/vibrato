from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod


class CartProduct(db.Model):
    """Functions as an association table between a User and the Products in their cart."""
    __tablename__ = 'cart_products'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        nullable=False
    )
    product_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('products.id')),
        nullable=False
    )
    quantity = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    user = db.relationship('User', back_populates='cart_products')
    product = db.relationship('Product', back_populates='cart_products')

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'quantity': self.quantity,
        }
