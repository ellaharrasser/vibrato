from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import InputRequired, Email, ValidationError, Length

from ..models import User
from ..utils.aws import ALLOWED_EXTENSIONS


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


class SignUpForm(FlaskForm):
    name = StringField('name', validators=[InputRequired()])
    email = StringField(
        'email',
        validators=[InputRequired(), Email(), user_exists]
    )
    password = StringField('password', validators=[InputRequired()])
    profile_image = FileField(
        'profile image',
        validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    description = StringField('description', validators=[Length(max=1000)])
