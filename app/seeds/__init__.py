from flask.cli import AppGroup
from .users.users import seed_users, undo_users
from .shops.shops import seed_shops, undo_shops
from .products.products import seed_products, undo_products
from .product_reviews.product_reviews import seed_product_reviews, undo_product_reviews
# from .product_images.product_images import seed_product_images, undo_product_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Run seed undo and truncate tables before seeding in production
        undo_product_reviews()
        # undo_product_images()
        undo_products()
        undo_shops()
        undo_users()

    seed_users()
    seed_shops()
    seed_products()
    # seed_product_images()
    seed_product_reviews()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_product_reviews()
    # undo_product_images()
    undo_products()
    undo_shops()
    undo_users()
