#!/bin/bash
PORT=8000
URL=http://0.0.0.0:${PORT}
echo "${URL}" | xsel -b 
python3 -m http.server ${PORT}

