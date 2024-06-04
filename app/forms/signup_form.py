from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length

from ..models import User
from ..utils.aws import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    email = StringField(
        'email',
        validators=[DataRequired(), Email(), user_exists]
    )
    password = StringField('password', validators=[DataRequired()])
    profile_image = FileField(
        'profile image',
        validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    description = StringField('description', validators=[Length(0, 255)])
