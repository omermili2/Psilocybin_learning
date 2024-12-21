from flask import (Blueprint, redirect, render_template, request, session, url_for)

## Initialize blueprint.
bp = Blueprint('home', __name__)

@bp.route('/home')
def home():
    """Present home page to participant."""

    ## Redirect participant to error (unusual activity).
    return render_template('home.html')
