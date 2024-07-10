from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import InputRequired, Length, NumberRange


class ProductReviewForm(FlaskForm):
    review = TextAreaField(
        'Review',
        validators=[InputRequired(), Length(max=255)]
    )
    rating = IntegerField(
        'Rating',
        validators=[InputRequired(), NumberRange(min=1, max=5)]
    )
