from ..models import Shop

shops = [
    Shop(
        owner_id=0,
        name='Demo User\'s Shop',
        description='We sell music equipment here at this demo shop.',
        image='s3://vibrato-images/default_shop_image.jpg',
    ),
    Shop(
        owner_id=1,
        name='Marnie Mee\'s Music Market',
        description='Only the finest music equipment here at Marnie Mee\'s!',
        image='s3://vibrato-images/default_shop_image.jpg',
    ),
    Shop(
        owner_id=2,
        name='Slayer Audio Equipment',
        description='The best music store in all of Kansas.',
        image='s3://vibrato-images/default_shop_image.jpg',
    ),
    Shop(
        owner_id=5,
        name='Hat Trick Harmonicas',
        description='We only sell harmonicas. Vocoders count as well, I guess.',
        image='s3://vibrato-images/default_shop_image.jpg',
    ),
    Shop(
        owner_id=9,
        name='The SoundLab',
        description='All our products are guaranteed to be heavily irradiated.',
        image='s3://vibrato-images/default_shop_image.jpg',
    ),
]
