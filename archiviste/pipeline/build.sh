mkdir build .config docs data data/train data/livr data/src
touch docs.md

git clone https://github.com/universmc/src

cd build/
touch Makefile conception.js mission.js build.sh livrable.zip

cd ../.config/
touch Makefile configuration.js setup.js

cd ../data/
touch  Makefile contrib-groq.js affine-engine.js

cd ../models/
touch Makefile entrainement_ia.js pi.ia neofs.js
