from flask import (Blueprint, redirect, render_template, request, session, url_for)
from datetime import datetime
# from .io import write_data, write_metadata

## Initialize blueprint.
bp = Blueprint('experiment', __name__)

@bp.route('/pgng1')
def pit1():
    """Present PIT experiment to participant."""

    ## Present experiment.
    return render_template('pgng1.html')

@bp.route('/pgng2')
def pit2():
    """Present PIT experiment to participant."""

    ## Present experiment.
    return render_template('pgng2.html')


@bp.route('/mrst1')
def risk1():
    """Present risk sensitivity experiment to participant."""

    ## Present experiment.
    return render_template('mrst1.html')

@bp.route('/mrst2')
def risk2():
    """Present risk sensitivity experiment to participant."""

    ## Present experiment.
    return render_template('mrst2.html')

@bp.route('/twostep1')
def twostep1():
    """Present two-step experiment to participant."""

    ## Present experiment.
    return render_template('twostep1.html')

@bp.route('/twostep2')
def twostep2():
    """Present two-step experiment to participant."""

    ## Present experiment.
    return render_template('twostep2.html')


@bp.route('/acqext')
def acqext():
    """Present scream task first part to participant."""

    ## Present experiment.
    return render_template('acqext.html')

@bp.route('/recovery')
def recovery():
    """Present scream task second part to participant."""

    ## Present experiment.
    return render_template('recovery.html')



@bp.route('/break')
def go_break():
    """Present break."""

    ## Present experiment.
    return render_template('break.html')



@bp.route('/redirect_success', methods = ['POST'])
def redirect_success():
    """Save complete jsPsych dataset to disk."""

    if request.is_json:

        ## Retrieve jsPsych data.
        JSON = request.get_json()

        ## Retrieve filename.
        fout = request.args.get('fout')

        ## Save jsPsch data to disk.
        with open('data/' + fout, 'w') as f: f.write(JSON)

    ## DEV NOTE:
    ## This function returns the HTTP response status code: 200
    ## Code 200 signifies the POST request has succeeded.
    ## The corresponding jsPsych function handles the redirect.
    ## For a full list of status codes, see:
    ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    return ('', 200)


@bp.route('/incomplete_save', methods=['POST'])
def incomplete_save():
    """Save incomplete jsPsych dataset to disk."""

    if request.is_json:

        ## Retrieve jsPsych data.
        JSON = request.get_json()

        ## Retrieve filename.
        fout = request.args.get('fout')

        # timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        
        ## Save jsPsch data to disk.
        with open('incomplete/' + fout, 'w') as f: f.write(JSON)



    ## DEV NOTE:
    ## This function returns the HTTP response status code: 200
    ## Code 200 signifies the POST request has succeeded.
    ## For a full list of status codes, see:
    ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    return ('', 200)


# @bp.route('/experiment', methods=['POST'])
# def pass_message():
#     """Write jsPsych message to metadata."""

#     if request.is_json:

#         ## Retrieve jsPsych data.
#         msg = request.get_json()#['msg']
#         mode = 'w' #request.get_json()['mode']

#         ## Update participant metadata.
#         session['MESSAGE'] = msg
#         write_metadata(session, ['MESSAGE'], mode)

#     ## DEV NOTE:
#     ## This function returns the HTTP response status code: 200
#     ## Code 200 signifies the POST request has succeeded.
#     ## For a full list of status codes, see:
#     ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
#     return ('', 200)

@bp.route('/experiment', methods=['POST'])
def pass_message():
    """Write jsPsych message to metadata."""

    if request.is_json:

        ## Retrieve jsPsych data.
        JSON = request.get_json()

        ## Retrieve filename & mode.
        fout = request.args.get('fout')
        mode = request.args.get('mode')
        # timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        
        ## Save jsPsch data to disk.
        with open('metadata/' + fout +'.json', mode) as f: f.write(JSON+'\n')



    ## DEV NOTE:
    ## This function returns the HTTP response status code: 200
    ## Code 200 signifies the POST request has succeeded.
    ## For a full list of status codes, see:
    ## https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    return ('', 200)