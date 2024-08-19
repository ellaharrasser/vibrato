from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, FileField
from wtforms.validators import InputRequired, Length, NumberRange, AnyOf

from ..utils.aws import ALLOWED_EXTENSIONS
from ..utils.conditions import CONDITIONS


class ProductForm(FlaskForm):
    user_id = IntegerField('User ID', validators=[InputRequired()])
    shop_id = IntegerField('Shop ID', validators=[InputRequired()])
    name = StringField(
        'Name',
        validators=[InputRequired(), Length(max=255)]
    )
    brand = StringField(
        'Brand',
        validators=[InputRequired(), Length(max=255)]
    )
    category = StringField(
        'Brand',
        validators=[InputRequired(), Length(max=255)]
    )
    condition = StringField(
        'Brand',
        validators=[InputRequired(), AnyOf(CONDITIONS)]
    )
    description = StringField(
        'Description',
        validators=[InputRequired(), Length(max=1000)]
    )
    product_price = IntegerField(
        'Price',
        validators=[InputRequired(), NumberRange(min=100)]
    )
    shipping_price = IntegerField(
        'Shipping Price',
        validators=[InputRequired(), NumberRange(min=0)]
    )
    quantity = IntegerField(
        'Quantity',
        validators=[InputRequired(), NumberRange(min=0)]
    )
    # One image is required, 4 extras are optional
    image_1 = FileField(
        validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)]
    )
    image_2 = FileField(
        validators=[FileAllowed(ALLOWED_EXTENSIONS)]
    )
    image_3 = FileField(validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    image_4 = FileField(validators=[FileAllowed(ALLOWED_EXTENSIONS)])
    image_5 = FileField(validators=[FileAllowed(ALLOWED_EXTENSIONS)])

# Product form without images (temporary), user_id, or shop_id
class EditProductForm(FlaskForm):
    name = StringField(
        'Name',
        validators=[InputRequired(), Length(max=255)]
    )
    brand = StringField(
        'Brand',
        validators=[InputRequired(), Length(max=255)]
    )
    category = StringField(
        'Brand',
        validators=[InputRequired(), Length(max=255)]
    )
    condition = StringField(
        'Brand',
        validators=[InputRequired(), AnyOf(CONDITIONS)]
    )
    description = StringField(
        'Description',
        validators=[InputRequired(), Length(max=1000)]
    )
    product_price = IntegerField(
        'Price',
        validators=[InputRequired(), NumberRange(min=100)]
    )
    shipping_price = IntegerField(
        'Shipping Price',
        validators=[InputRequired(), NumberRange(min=0)]
    )
    quantity = IntegerField(
        'Quantity',
        validators=[InputRequired(), NumberRange(min=1)]
    )
    image_1 = FileField(
        validators=[FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
