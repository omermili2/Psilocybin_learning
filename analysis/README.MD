# Data dictionaries

## Pavlovian go/no-go data

- subject:    anonymized participant ID
- session:    session number (i.e., 1, 2, 3)
- block:      block number (i.e., 1, 2)
- runsheet:   trial structure (i.e., 1a, 1b, 2a, 2b, 3a, 3b)
- trial:      trial number
- exposure:   number of presentations (so far) of a given stimulus
- valence:    valence of trial (i.e., win, lose)
- action:     correct action for trial (i.e., go, no-go)
- robot:      trial type (i.e., go to win [gw], no-go to win [ngw], go to avoid losing [gal], no-go to avoid losing [ngal])
- stimulus:   bandit ID (i.e., 1-24)
- rune:       rune character
- rune_set:   character set (bacs1, bacs2, elianto)
- correct:    correct action (go = 1, no-go = 0)
- choice:     participants choice (go = 1, no-go = 0)
- rt:         response time (s)
- accuracy:   scored choice (correct = 1, incorrect = 0)
- sham:       feedback type (correct = 0, incorrect = 1)
- outcome:    observed outcome
- total_keys: number of total button presses on that trial



## Risk task

- subject:         anonymized participant ID
- block:           block number (i.e., 1, 2)
- trial:           trial number
- exposure:        number of presentations (so far) of a given card 
- bandit:          (1-15)
- probability:     card winning probability (p 0.2, 0.5, 0.8)
- stimulus:        card animal (text)
- accuracy:        trial accuracy (correct = 1, inccorect = 0)
- card_color:      card color (hex)
- card_points:     card presented points (int)
- key_press:       key used (right=0  left=1)
- choice:          card chosen (face up = 1 , face down = 0)
- rt:              response time (s)
- outcome:         observed outcome


- #fullscreen
- minimum_resolution
- browser_interactions



## Two step task

- subject:         anonymized participant ID
- trial:           trial number
- drift_ix:        id for the drift used (i.e p of bandits in s2)
- state_1_key:     key pressed at state 1 (left = 1,  right = 0)
- state_1_choice:  rocket chosen at state 1 (0 - commonly to s2, 1- commonly to s3)
- state_1_rt:      response time (s) for state 1
- transition:      state 1 to state 2 p (common = 1 rare = 0) v
- state:           state 2 (s2 = 2, or s3 = 3)

- state_2_key:     key pressed at state 2 (left = 0,  right = 1)
- state_2_choice:  alien chosen at state 2 (0-3)
- state_2_rt:      response time (s) for state 2
- outcome:         observed outcome (rewarded = 1, unrewarded = 0)


- #fullscreen
- minimum_resolution
- browser_interactions


## scream task
- stimulus_image: file path for image stimulus 
- stimulus_audio: file path for audio stimulus 
- endTime:
- fc_rt: reaction time in fc trials (s)
- fc_key: key pressed (1: space bar pressed)
- timeout: time out status (0,1,2) ???
- fc_phase: 'practice', 'acquisitionBlockOne', 'acquisitionBlockTwo' 'extinctionBlockOne', 'extinctionBlockThree', 'extinctionBlockTwo'
- fc_trial: trial index for fc trials 
- trial_type: one of two trial types ('expectancy-rating', 'fctask-trial', 'affective-rating')
- trial_index: jspsych trial index
- time_elapsed: from the start (s) ???
- internal_node_id: jspsych metadata
- task: jspsych metadata
- task_version: jspsych metadata
- subject: subject id
- timestamp: jspsych metadata (file timestamp)
- fout: jspsych metadata (file name)
- sequence: expectancy-rating CS sequence - when both presented, the order (cs+ , cs-)
- csRating: practice trials ? CS- rating when presenrted alone(1-100 scale)
- totalTime: expectancy-rating rt (s)
- csResponses: practice trials ? values of rating scales (can be many)
- csRTs: practice trials ? cs reaction time (s)
- csPlusRating: positive stim rating when both presnted 
- csMinusRating: negative stim rating when both presnted 
- csPlusResponses: values of positive stim rating scales (can be many)
- csPlusRTs: positive stim expectancy-rating rt (s)
- csMinusResponses: values of negative stim rating scales (can be many)
- csMinusRTs: negative stim xpectancy-rating rt (s)

- er_trial: expectancy-rating trial count (est) 