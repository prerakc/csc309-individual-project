# js-library-chaud496

Landing page: https://frozen-ravine-99489.herokuapp.com/

Documentation: https://frozen-ravine-99489.herokuapp.com/documentation.html

## Getting started
The packaged library can be downloaded from [here](https://frozen-ravine-99489.herokuapp.com/FlashcardLibrary.zip).

Unzip the file and move the contents of the `FlashcardLibrary` folder into your project directory.

To import the library, first add the following stylesheet:
```
<link rel="stylesheet" type="text/css" href="examples.css">
```

Then import the following scripts (note that this library depends on jQuery):
```
<script defer src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script defer type="text/javascript" src='js/flashcardlibrary.js'></script>
```

The FlashcardSet constructor function can be used to create a flashcard deck as follows:

`const flashcardSet = FlashcardSet("unique-div-id")`

View the [examples](https://frozen-ravine-99489.herokuapp.com/examples.html) page to see more complicated usages of the library.
