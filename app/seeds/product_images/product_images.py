from sqlalchemy.sql import text

from ...models import db, environment, SCHEMA
from .product_images_seeds import product_images


def seed_product_images():
    db.session.add_all(product_images)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the product_images table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_images():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM product_images'))

    db.session.commit()
