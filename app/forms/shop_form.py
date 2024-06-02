from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, TextAreaField, FileField
from wtforms.validators import DataRequired, Length

from ..utils.aws import ALLOWED_EXTENSIONS


class ShopForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    description = TextAreaField('Description', validators=[DataRequired(), Length(max=255)])
    image = FileField('Image', validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
