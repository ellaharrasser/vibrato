from ...models import Shop

shops = [
    Shop(
        owner_id=1,
        name='Demo User\'s Shop',
        description='We sell music equipment here at this demo shop.',
        image='https://vibrato-images.s3.us-west-1.amazonaws.com/default_shop_image.jpg',
    ),
    Shop(
        owner_id=2,
        name='Marnie Mee\'s Music Market',
        description='Only the finest music equipment here at Marnie Mee\'s!',
        image='https://vibrato-images.s3.us-west-1.amazonaws.com/default_shop_image.jpg',
    ),
    Shop(
        owner_id=3,
        name='Slayer Audio Equipment',
        description='The best music store in all of Kansas.',
        image='https://vibrato-images.s3.us-west-1.amazonaws.com/default_shop_image.jpg',
    ),
    Shop(
        owner_id=6,
        name='Hat Trick Harmonicas',
        description='We only sell harmonicas. Vocoders count as well, I guess.',
        image='https://vibrato-images.s3.us-west-1.amazonaws.com/default_shop_image.jpg',
    ),
    Shop(
        owner_id=10,
        name='The SoundLab',
        description='All our products are guaranteed to be heavily irradiated.',
        image='https://vibrato-images.s3.us-west-1.amazonaws.com/default_shop_image.jpg',
    ),
]
