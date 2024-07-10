from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import InputRequired, NumberRange


class CartProductForm(FlaskForm):
    quantity = IntegerField(
        'Quantity',
        validators=[InputRequired(), NumberRange(min=1)]
    )
