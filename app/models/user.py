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
    created_at = db.Column(db.DateTime, server_default=func.now())
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

    def to_dict(self) -> dict:
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'profileImage': self.profile_image,
            'description': self.description,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
