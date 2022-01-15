#!/bin/bash
set -e
rsync -e "ssh -o StrictHostKeyChecking=no" -r build/ tritonpedia@acsweb.ucsd.edu:~/public_move
ssh tritonpedia@acsweb.ucsd.edu "ls public_move && rm -rf public_old && mv public_html public_old && mv public_move public_html"