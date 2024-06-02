from flask import Blueprint, jsonify
from flask_login import current_user, login_user, logout_user, login_required

from ..models import Shop
