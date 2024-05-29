from ...models import ProductReview

product_reviews = [
    ProductReview(
        user_id=1,
        product_id=3,
        review='Beautiful, beautiful guitar. Warm sound, super comfortable.',
        rating=5,
    ),
    ProductReview(
        user_id=2,
        product_id=5,
        review='Great MIDI keyboard for my software synths. A little flimsy.',
        rating=4,
    ),
    ProductReview(
        user_id=3,
        product_id=8,
        review='The harmonica is such a terrible instrument. Why did I buy this?',
        rating=2,
    ),
    ProductReview(
        user_id=3,
        product_id=11,
        review='Wonderful reverse feature, and the delay presets all sound very good!',
        rating=5,
    ),
]
