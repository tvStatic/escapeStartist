# Escape Startist

Escape Startist is your DIY home escape room. Escape Startist runs completely within your browser, using only data stored in your web browser.

An Escape Startist game consists of multiple stages, each with its own exit code, some screen text, and optionally some clues that can be printed out and placed around your home (or whereever you choose to play your escape room experience). 

Games can be created and edited using the game editor interface. Games can be exported and saved to json files, and likewise can be imported from those files.

Clues can be printed from the Clue Sheet page. Each clue includes the location where it is to be hidden.

This project was created with Angular.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. 

## Building for GitHub pages

Run `ng build --prod --output-path dist --base-href /escapeStartist/`.

Checkout the `gh-pages` branch into another directory. Copy the files generated in the `dist` directory to this directory. 

Copy `index.html` to `404.html`.

Commit and push the changes to the `gh-pages` branch.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

