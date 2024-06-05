from flask import Blueprint, request
from ..models import User, db
from ..forms import LoginForm
from ..forms import SignUpForm
from flask_login import current_user, login_user, logout_user

from ..utils.aws import get_unique_filename, upload_file_to_s3


auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()

        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        profile_image = form.data['profile_image']
        profile_image.filename = get_unique_filename(profile_image.filename)
        upload = upload_file_to_s3(profile_image)

        if 'url' not in upload: # Check for errors while uploading
            return form.errors, 400

        user = User(
            email=form.data['email'],
            name=form.data['name'],
            password=form.data['password'],
            profile_image=upload['url'],
            description=form.data['description']
        )

        db.session.add(user)
        db.session.commit()

        login_user(user)
        return user.to_dict()
    return form.errors, 400


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
