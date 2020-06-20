#!/bin/sh

# Container creation
docker-compose up -V  --build --force-recreate --remove-orphans --always-recreate-deps 
