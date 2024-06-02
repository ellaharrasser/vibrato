from flask_wtf import FlaskForm
from wtforms import IntegerField, TextAreaField
from wtforms.validators import DataRequired, Length, NumberRange


class ProductReviewForm(FlaskForm):
    review = TextAreaField(
        'Review',
        validators=[DataRequired(), Length(max=255)]
    )
    rating = IntegerField(
        'Rating',
        validators=[DataRequired(), NumberRange(min=1, max=5)]
    )
