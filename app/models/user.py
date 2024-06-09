from sqlalchemy.sql import func
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from .db import db, environment, SCHEMA, add_prefix_for_prod


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == 'production':
        __table_args__ = { 'schema': SCHEMA }

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(
        db.DateTime,
        server_default=func.now()
    )
    updated_at = db.Column(
        db.DateTime,
        server_default=func.now(),
        onupdate=func.now()
    )

    shops = db.relationship(
        'Shop',
        back_populates='owner',
        cascade='all, delete-orphan'
    )
    products = db.relationship(
        'Product',
        back_populates='user',
        cascade='all, delete-orphan'
    )
    cart_products = db.relationship(
        'CartProduct',
        back_populates='user',
        cascade='all, delete-orphan'
    )
    reviews = db.relationship(
        'ProductReview',
        back_populates='user',
        cascade='all, delete-orphan'
    )

    @property
    def password(self) -> str:
        return self.hashed_password

    @password.setter
    def password(self, password) -> None:
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password) -> bool:
        return check_password_hash(self.password, password)

    def relationships_dict(self):
        return {
            'shops': [
                shop.to_dict(rels=False)
                for shop in self.shops
            ],
            'products': [
                product.to_dict(rels=False)
                for product in self.products
            ],
            'cartProducts': [
                cart_product.to_dict(rels=False)
                for cart_product in self.cart_products
            ],
            'reviews': [
                review.to_dict(rels=False)
                for review in self.reviews
            ],
        }

    def to_dict(self, rels: bool = True):
        result = {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'profileImage': self.profile_image,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }

        if rels:
            result |= self.relationships_dict()

        return result
