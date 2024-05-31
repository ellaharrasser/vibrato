from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('products.id')),
        nullable=False
    )
    image = db.Column(db.String(255), nullable=False)

    product = db.relationship('Product', back_populates='images')

    def to_dict(self) -> dict:
        # No relationships option included, deemed unnecessary
        return {
            'id': self.id,
            'image': self.image,
        }
