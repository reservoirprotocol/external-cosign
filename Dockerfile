FROM node:18.14.2-slim

ARG PORT=80

EXPOSE ${PORT}

WORKDIR /external-cosign
ADD . /external-cosign
RUN yarn install
RUN yarn build
CMD yarn start
