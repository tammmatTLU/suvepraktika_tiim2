FROM node:24.0-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm ci

COPY . .
