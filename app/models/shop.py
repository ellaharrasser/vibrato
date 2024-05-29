from sqlalchemy.sql import func

from .db import db, environment, SCHEMA, add_prefix_for_prod


class Shop(db.Model):
    __tablename__ = 'shops'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod('users.id')),
        nullable=False
    )
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=func.now())
    updated_at = db.Column(
        db.DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    owner = db.relationship('User', back_populates='shops')
    products = db.relationship(
        'Product',
        back_populates='shop',
        cascade='all, delete-orphan'
    )

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'image': self.image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
