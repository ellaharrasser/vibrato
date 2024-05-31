from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

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
    review = db.Column(db.String(255), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(
        db.DateTime,
        server_default=func.now()
    )
    updated_at = db.Column(
        db.DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    user = db.relationship('User', back_populates='reviews')
    product = db.relationship('Product', back_populates='reviews')

    def relationships_dict(self):
        return {
            'user': self.user.to_dict(rels=False),
            'product': self.product.to_dict(rels=False),
        }

    def to_dict(self, rels: bool = True) -> dict:
        result = {
            'id': self.id,
            'review': self.review,
            'rating': self.rating,
        }

        if rels:
            result |= self.relationships_dict()

        return result
