# Oasis

Simple, realtime multiplayer IO game.

## Live Demo

https://oasis.toddgriffin.me/

![cover photo](/public/res/cover-photo.webp)

## Features

- realtime multiplayer
- random, realistic world map generation (Stone, Grass, Sand, Shore, Ocean,
  Trees, Leaves)
- finite tilemap w/ world wrap (seamlessly transition between tilemap borders)
- 8 direction movement/facing
- punching/killing/respawning
- leaderboard for kill counts
- terrain affects player max speed (Grass is fastest, Ocean is slowest)
- directional facing affects player max speed (side-stepping or backwards
  movement is slower than forwards movement)

## Requirements

- Make
- NodeJS/NPM
- Docker

## Setup

On a fresh git clone run `make install` to get up and running quickly!

## Try it out!

Run `make dev` and with your favourite browser<sub> _coughchromecough_</sub>
visit `localhost:8080`!

## Background

This project was lab 6 for Purdue's CS252, Systems Programming.

## Stack

Web Framework: Node/Express

Realtime Data: Socket.io

Database: Sqlite3

## Developers

I tried my best heavily commenting the codebase, so good luck!

### Reset Database

Run `make init_db` to delete the current database and auto-generate a fresh one.
