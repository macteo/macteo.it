#!/bin/bash

post=$1
prefix="https://macteo.it/"
local=${post#$prefix}

cd ~/Dropbox/macteo.it
atom .
open "http://localhost:4000/$local"
bundle exec guard