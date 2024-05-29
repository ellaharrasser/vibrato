from sqlalchemy.sql import text

from ...models import db, environment, SCHEMA
from .product_reviews_seeds import product_reviews


def seed_product_reviews():
    db.session.add_all(product_reviews)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the product_reviews table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_product_reviews():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.product_reviews RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM product_reviews'))

    db.session.commit()
