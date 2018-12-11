FROM node:10-jessie

RUN apt-get update
RUN apt-get -y install g++ make git sudo

COPY ./ /saito

WORKDIR /saito/extras/sparsehash/sparsehash


RUN ./configure && make && make install

WORKDIR /saito
RUN npm install
RUN npm uninstall sqlite3
RUN npm install --save sqlite3


RUN cd ./lib && ./compile nuke

CMD node ./lib/start.js
