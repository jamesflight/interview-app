#!/bin/bash

docker-compose up -d
cd server
serverless offline start