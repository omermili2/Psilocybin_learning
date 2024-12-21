import os, sys, configparser, warnings
from flask import (Flask, redirect, render_template, request, session, url_for)
from app import home, experiment, complete
# from .io import write_data, write_metadata

__version__ = 'nivturk-geha'

## Define root directory.
ROOT_DIR = os.path.dirname(os.path.realpath(__file__))

## Load and parse configuration file.
cfg = configparser.ConfigParser()
cfg.read(os.path.join(ROOT_DIR, 'app.ini'))

## Ensure output directories exist.
data_dir = '../data'
os.makedirs(data_dir, exist_ok=True)
incomplete_dir = '../incomplete'
os.makedirs(incomplete_dir, exist_ok=True)

## Check Flask password.
secret_key = cfg['FLASK']['SECRET_KEY']
if secret_key == "PLEASE_CHANGE_THIS":
    warnings.warn("WARNING: Flask password is currently default. This should be changed prior to production.")

## Initialize Flask application.
app = Flask(__name__)
app.secret_key = secret_key

## Apply blueprints to the application.
app.register_blueprint(home.bp)
app.register_blueprint(experiment.bp)
app.register_blueprint(complete.bp)

## Define root node.
@app.route('/')
def index():

    ## Redirect participant to consent form.
    return redirect(url_for('home.home'))
