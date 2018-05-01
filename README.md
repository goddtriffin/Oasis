# Oasis

Simple, realtime multiplayer landscape.

## Author

Todd Griffin

![cover photo](/public/res/cover-photo.png)

## Features

- realtime multiplayer
- random, realistic world map generation (Stone, Grass, Sand, Shore, Ocean, Trees, Leaves)
- finite tilemap w/ world wrap (seamlessly transition between tilemap borders)
- 8 direction movement/facing
- punching/killing/respawning
- leaderboard for kill counts
- terrain affects player max speed (Grass is fastest, Ocean is slowest)
- directional facing affects player max speed (side-stepping or backwards movement is slower than forwards movement)

## Requirements

Must have npm installed.

## Setup

On a fresh git clone run `npm run-script setup` to get up and running quickly!

## Try it out!

Run `npm start` and with your favourite browser<sub>*coughchromecough*</sub> visit `localhost:8633`!

## Background

This project was lab 6 for Purdue's CS252, Systems Programming.

## Stack

Web Framework: Node/Express

Realtime Data: Socket.io

Database: Sqlite3

## Developers

I tried my best heavily commenting the codebase, so good luck!

### Reset Database

Run `npm run-script reset-db` to delete the current database and auto-generate a fresh one.
