from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import IntegerField, StringField, FileField
from wtforms.validators import DataRequired, Length

from ..utils.aws import ALLOWED_EXTENSIONS


class ShopForm(FlaskForm):
    owner_id = IntegerField('Owner ID', validators=[DataRequired()])
    name = StringField('Name', validators=[DataRequired(), Length(max=255)])
    description = StringField(
        'Description',
        validators=[DataRequired(), Length(max=255)]
    )
    image = FileField(
        'Image',
        validators=[FileAllowed(list(ALLOWED_EXTENSIONS))]
    )

class EditShopForm(FlaskForm):
    name = StringField('Name', validators=[Length(max=255)])
    description = StringField('Description', validators=[Length(max=255)])
    image = FileField(
        'Image',
        validators=[FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
