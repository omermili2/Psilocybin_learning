_____________________
# Task battery - NORMATIVE (to set up according to)
_____________________


### General
- Battery_version = '0.4.1'
- Tasks: risk, PIT, two-step
- language: Hebrew / English
- (non python) version control: jspsych-6.1.0, jquery-3.3.1 (See requirements.txt for python)

### Tasks:

#### two-step task
*Task overview*: Designed to dissociate “model-free” and “model-based” learning (Daw et al., 2011). Kid-friendly version (Decker, 2016)

#### Risk task
*Task overview*: Designed to quantify risk sensitivity in decision-making (Niv et al., 2012)

#### PIT
*Task overview*: 

#### Scream Task
*Task overview*: 

### Technical 'support'


#### Generative task stats-
 1. Parameters are defined at <task>-params.js file at each Task
 2. hebrew/english changes given text file import at html file
  - improting -he.js version will deliver hebrew task / -en version will deliver english task


#### Quickstart

Running the app locally (swapp <x> with a number 0-9 of your choice):
.. code-block:: bash
    cd CRCNS-geha
    pip install -r requirements.txt
    gunicorn -b 0.0.0.0:900<X> -w 4 app:app


Manual serving (from browser):
 - after clicking the link
   - Researcher will click a task from the main page (/home)
   - researcher will enter participant ID and let participant run the task
   - every task ends at the complete page (/complete)
   - when a task is done, return to home page and start a new task

- error handling:
  - TBD

#### Nivturk

For details on how to serve the experiment, please see the `NivTurk documentation <https://nivlab.github.io/nivturk/>`_.

### References
#### Two step
- [Decker et al, 2016](https://journals.sagepub.com/doi/full/10.1177/0956797616639301?url_ver=Z39.88-2003&rfr_id=ori:rid:crossref.org&rfr_dat=cr_pub%20%200pubmed)
- [Nussenbaum et al, 2020)](https://online.ucpress.edu/collabra/article/6/1/17213/114338/Moving-Developmental-Research-Online-Comparing-In)
- [Daw et al, 2011](https://www.sciencedirect.com/science/article/pii/S0896627311001255?via%3Dihub)


#### Risk
- [Rosenbaum et al. 2022](https://www.hartleylab.org/uploads/5/3/1/0/53101939/rosenbaum2022.pdf)
- [Niv et al., 2012](https://www.jneurosci.org/content/32/2/551)

#### PIT
- [Weber et al., 2022](https://osf.io/t9r4w)
