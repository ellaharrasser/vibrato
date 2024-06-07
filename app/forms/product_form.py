from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import IntegerField, StringField, FileField
from wtforms.validators import DataRequired, Length, NumberRange

from ..utils.aws import ALLOWED_EXTENSIONS
from ..utils.conditions import CONDITIONS


class ProductForm(FlaskForm):
    shop_id = IntegerField(
        'Shop ID',
        validators=[DataRequired()],
    )
    name = StringField(
        'Name',
        validators=[DataRequired(), Length(max=255)]
    )
    brand = StringField(
        'Brand',
        validators=[DataRequired(), Length(max=255)]
    )
    category = StringField(
        'Brand',
        validators=[DataRequired(), Length(max=255)]
    )
    condition = StringField(
        'Brand',
        validators=[DataRequired(), Length(max=255)] # Need condition validator
    )
    description = StringField(
        'Description',
        validators=[DataRequired(), Length(max=255)]
    )
    product_price = IntegerField(
        'Price',
        validators=[DataRequired(), NumberRange(min=100)]
    )
    shipping_price = IntegerField(
        'Shipping Price',
        validators=[DataRequired(), NumberRange(min=0)]
    )
    quantity = IntegerField(
        'Quantity',
        validators=[DataRequired(), NumberRange(min=0)]
    )
    # One image is required, 4 extras are optional
    image_1 = FileField(
        validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)]
    )
    image_2 = FileField(
        validators=[FileAllowed(ALLOWED_EXTENSIONS)]
    )
    image_3 = FileField(
        validators=[FileAllowed(ALLOWED_EXTENSIONS)]
    )
    image_4 = FileField(
        validators=[FileAllowed(ALLOWED_EXTENSIONS)]
    )
    image_5 = FileField(
        validators=[FileAllowed(ALLOWED_EXTENSIONS)]
    )
