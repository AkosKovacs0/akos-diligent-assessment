#!/usr/bin/env bash

echo "Installing dependencies..."
npm install

echo "Seeding database..."
npm run db:seed

echo "Starting server..."
npm run dev
