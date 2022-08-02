"use strict";

(function(global, document, $) {

    function FlashcardSet(divID) {

        const _self = {}

        _self.flashcards = []
        _self.divID = divID
        _self.element = document.createElement('div')
        _self.element.id = divID
        _self.element.innerHTML = `
        <div class="flashcardContainer">
            <div>
                <button type="button" class="flashcardTopButton toggleAddButton">Add</button>
                <select class="dropdownMenu"></select>
                <button type="button" class="flashcardTopButton deleteFlashcard">Delete</button>
            </div>
            <div class="answerContainer">
                <h3 class="answer">Add a Flashcard</h3>
            </div>
            <div class="flashcardBottomButtonContainer">
                <button type="button" class="correct">Correct</button>
                <button type="button" class="incorrect">Incorrect</button>
            </div>
        </div>
        <div class="addFlashcardContainer">
            <form class="addFlashcardForm">
                <input class="newQuestion" type="text" placeholder="New Flashcard Question">
                <br>
                <textarea class="newAnswer" placeholder="New Flashcard Answer"></textarea>
                <br>
                <input class="addFlashcard" type="submit" value="Add Flashcard">
            </form>
        </div>
    `

        const toggleAddButton = _self.element.querySelector(".toggleAddButton")
        const dropdownMenu = _self.element.querySelector(".dropdownMenu")
        const deleteFlashcard = _self.element.querySelector(".deleteFlashcard")
        const answerContainer = _self.element.querySelector(".answerContainer")
        const correctButton = _self.element.querySelector(".correct")
        const incorrectButton = _self.element.querySelector(".incorrect")
        const addFlashcardForm = _self.element.querySelector(".addFlashcardForm")

        toggleAddButton.addEventListener("click", handleToggleAddButton)
        dropdownMenu.addEventListener("change", handleDropdownMenu)
        deleteFlashcard.addEventListener("click", handleDeleteFlashcard)
        answerContainer.addEventListener("click", handleAnswerContainer)
        correctButton.addEventListener("click", handleCorrectButton)
        incorrectButton.addEventListener("click", handleIncorrectButton)
        addFlashcardForm.addEventListener("submit", handleAddFlashcardForm)

        // button press toggles visibility of 'addFlashcardContainer' div
        function handleToggleAddButton(event) {
            event.preventDefault();

            const addFlashcardContainer = _self.element.querySelector(".addFlashcardContainer")

            if (addFlashcardContainer.style.display === "inline-block") {
                addFlashcardContainer.style.display = "none"
            } else {
                addFlashcardContainer.style.display = "inline-block"
            }
        }

        // selecting a new question from the dropdown menu updates the displayed answer
        function handleDropdownMenu(event) {
            event.preventDefault();

            const selectedID = parseInt(event.target.value)

            updateSelectedFlashcard(selectedID)
        }

        /* find the flashcard with the provided id and update the inner text of the 'answer' element
         *
         * this function assumes that the provided id is valid as it is used
         * internally by other functions that perform id validation
         */
        function updateSelectedFlashcard(id) {
            const answer = _self.element.querySelector(".answer")

            answer.innerText = _self.flashcards.filter(flashcard => flashcard.id === id)[0].answer
        }

        // delete the currently selected flashcard if the deck is non-empty
        function handleDeleteFlashcard(event) {
            event.preventDefault();

            const currentlySelectedFlashcard = dropdownMenu.value

            if (currentlySelectedFlashcard.length) {
                if (global.confirm("Delete Flashcard?")) {
                    flashcardDeletion(parseInt(currentlySelectedFlashcard), true)
                }
            } else {
                global.alert("Flashcard set is empty")
            }
        }

        /*
         * helper function for removing flashcards.
         * remove the specified flashcard from the array and dropdown menu.
         * switch to the first flashcard in the deck if the currently selected one is deleted.
         */
        function flashcardDeletion(id, switchFlashcard) {
            _self.flashcards = _self.flashcards.filter(flashcard => flashcard.id !== id)

            $(`#${_self.divID} option[value='${id}']`).remove()

            if (switchFlashcard) {
                if (dropdownMenu.children.length === 0) {
                    _self.element.querySelector(".answer").innerText = "Add a Flashcard"
                } else {
                    const newFlashcardID = parseInt(dropdownMenu.firstElementChild.value)

                    updateSelectedFlashcard(newFlashcardID)
                }
            }
        }

        // clicking on 'answerContainer' div toggles visibility of 'answer' element
        function handleAnswerContainer(event) {
            event.preventDefault();

            const answer = _self.element.querySelector(".answer")

            if (answer.style.display === "block") {
                answer.style.display = "none"
            } else {
                answer.style.display = "block"
            }
        }

        // handle the user correctly guesses the currently selected flashcard
        function handleCorrectButton(event) {
            event.preventDefault();

            shuffleDeck(true)
        }

        // handle the user incorrectly guesses the currently selected flashcard
        function handleIncorrectButton(event) {
            event.preventDefault();

            shuffleDeck(false)
        }

        // intelligently shuffle the deck so that the first element in the array is the next flashcard to be shown
        function shuffleDeck(correctGuess) {
            if (dropdownMenu.value.length) {
                // one turn has passed for all flashcards
                _self.flashcards = _self.flashcards.map(flashcard => {
                    const newFlashcard = JSON.parse(JSON.stringify(flashcard))
                    newFlashcard.turnsPassed = newFlashcard.turnsPassed + 1
                    return newFlashcard
                })

                const currentlySelectedFlashcard = _self.flashcards.filter(fc => fc.id === parseInt(dropdownMenu.value))[0]

                // move the currently selected flashcard one bucket up or to the first bucket
                currentlySelectedFlashcard.bucket = correctGuess ? currentlySelectedFlashcard.bucket + 1 : 0
                // this flashcard was just guessed so no turns will have passed for it when the next flashcard is shown
                currentlySelectedFlashcard.turnsPassed = 0

                _self.flashcards.sort((a, b) => {
                    /* note to self:
                     * return 1    =>   b before a
                     * return -1   =>   a before b
                     */

                    // primary sorting key: lower buckets before higher buckets
                    if (a.bucket < b.bucket) return -1
                    if (a.bucket > b.bucket) return 1

                    // secondary sorting key: higher turns passed before lower turns passed
                    if (a.turnsPassed < b.turnsPassed) return 1
                    if (a.turnsPassed > b.turnsPassed) return -1

                    // tertiary sorting key: lower ids before higher ids
                    if (a.id < b.id) return -1
                    if (a.id > b.id) return 1
                })

                dropdownMenu.selectedIndex =
                    Array.from(dropdownMenu.children).findIndex(e => parseInt(e.value) === _self.flashcards[0].id)

                updateSelectedFlashcard(_self.flashcards[0].id)
            } else {
                global.alert("Flashcard set is empty")
            }
        }

        // get the question and answer strings from the form and add a new flashcard
        function handleAddFlashcardForm(event) {
            event.preventDefault();

            const newQuestion = _self.element.querySelector(".newQuestion").value

            const newAnswer = _self.element.querySelector(".newAnswer").value

            if (newQuestion.length !== 0 && newAnswer.length !== 0) {
                if (flashcardAddition(newQuestion, newAnswer) === -1) {
                    global.alert("Flashcard already exists in set")
                }
            } else {
                global.alert("Question and Answer fields cannot be empty")
            }
        }

        // helper function for adding a flashcard to the array of objects and to the dropdown menu
        function flashcardAddition(question, answer) {
            const anyDuplicates = _self.flashcards.filter(fc => fc.question === question && fc.answer === answer)

            if (anyDuplicates.length) {
                return -1
            } else {
                const newFlashcard = {
                    question: question,
                    answer: answer,
                    id: _self.flashcards.length !== 0
                        ? _self.flashcards.reduce((highestID, flashcard) => Math.max(flashcard.id, highestID), 0) + 1
                        : 1,
                    bucket: 0,
                    turnsPassed: 0
                }

                _self.flashcards.push(newFlashcard)

                const noFlashcards = dropdownMenu.children.length === 0

                const newDropdownMenuOption = document.createElement("option")
                newDropdownMenuOption.value = newFlashcard.id
                newDropdownMenuOption.text = question
                dropdownMenu.add(newDropdownMenuOption)

                // if this is the first flashcard in the deck, update the answer area
                if (noFlashcards) {
                    updateSelectedFlashcard(newFlashcard.id)
                }

                return newFlashcard.id
            }
        }

        /*
         * API function for adding a flashcard.
         * Takes a non-empty question and answer string.
         */
        _self.addFlashcard = function (question, answer) {
            if (question.length !== 0 && answer.length !== 0) {
                return flashcardAddition(question, answer)
            } else {
                return -1
            }
        }

        /*
         * API function for removing a flashcard.
         * Takes an integer flashcard id.
         */
        _self.removeFlashcard = function (id) {
            const currentlySelectedFlashcard = dropdownMenu.value

            if (currentlySelectedFlashcard.length) {
                const flashcardToRemove = _self.flashcards.filter(flashcard => flashcard.id === id)

                if (flashcardToRemove.length === 0) {
                    return {}
                } else {
                    flashcardDeletion(id, parseInt(currentlySelectedFlashcard) === id)

                    return flashcardToRemove[0]
                }
            } else {
                return {}
            }
        }

        /*
         * API function for getting a flashcard.
         * Takes an integer flashcard id.
         */
        _self.getFlashcard = function (id) {
            const flashcardToGet = _self.flashcards.filter(flashcard => flashcard.id === id)

            if (flashcardToGet.length === 0) {
                return {}
            } else {
                return flashcardToGet[0]
            }
        }

        /*
         * API function for loading a flashcard deck from JSON.
         * Takes a stringified JSON array of flashcard objects.
         */
        _self.loadFromJSON = function (jsonArr) {
            let jsonArrParsed;

            // make sure string is a stringified JSON array
            try {
                jsonArrParsed = JSON.parse(jsonArr)
            } catch {
                return -1
            }

            if (Array.isArray(jsonArrParsed)) {
                const checkedFlashcards = []

                // validate parsed JSON array
                const valid = jsonArrParsed.reduce((thusValid, flashcard) => {
                    const currentValid =
                        flashcard.constructor === Object &&
                        'question' in flashcard &&
                        'answer' in flashcard &&
                        'id' in flashcard &&
                        'bucket' in flashcard &&
                        'turnsPassed' in flashcard &&
                        flashcard.question !== "" &&
                        flashcard.answer !== "" &&
                        checkedFlashcards.filter(e =>
                            e.question === flashcard.question && e.answer === flashcard.answer).length === 0 &&
                        flashcard.id >= 1 &&
                        checkedFlashcards.filter(element => element.id === flashcard.id).length === 0 &&
                        flashcard.bucket >= 0 &&
                        flashcard.turnsPassed >= 0

                    checkedFlashcards.push(flashcard)

                    return thusValid && currentValid
                }, true)

                // load the flashcard deck if the parsed JSON array is valid
                if (valid) {
                    $(`#${_self.divID} select.dropdownMenu`).empty()

                    jsonArrParsed.forEach(flashcard => {
                        const newDropdownMenuOption = document.createElement("option")
                        newDropdownMenuOption.value = flashcard.id
                        newDropdownMenuOption.text = flashcard.question
                        dropdownMenu.add(newDropdownMenuOption)
                    })

                    _self.flashcards = jsonArrParsed

                    if (_self.flashcards.length !== 0) {
                        updateSelectedFlashcard(_self.flashcards[0].id)
                    }

                    return 0
                } else {
                    return -1
                }


            } else {
                return -1
            }
        }

        // write current flashcard deck out as stringified JSON array
        _self.writeToJSON = function () {
            return JSON.stringify(_self.flashcards)
        }

        // helper function to change the background colour of an element
        function changeElementBackgroundColour(className, c) {
            const valid = CSS.supports("background-color", c)

            if (valid) {
                _self.element.querySelector(`.${className}`).style.backgroundColor = c
                return 0
            } else {
                return -1
            }
        }

        // helper function to change the text colour of an element
        function changeElementTextColour(className, c) {
            const valid = CSS.supports("color", c)

            if (valid) {
                _self.element.querySelector(`.${className}`).style.color = c
                return 0
            } else {
                return -1
            }
        }

        // API function to change the background colour of the toggle add button
        _self.changeToggleAddButtonBackgroundColour = function (c) {
            return changeElementBackgroundColour("toggleAddButton", c)
        }

        // API function to change the text colour of the toggle add button
        _self.changeToggleAddButtonTextColour = function (c) {
            return changeElementTextColour("toggleAddButton", c)
        }

        // API function to change the background colour of the delete flashcard button
        _self.changeDeleteFlashcardButtonBackgroundColour = function (c) {
            return changeElementBackgroundColour("deleteFlashcard", c)
        }

        // API function to change the text colour of the delete flashcard button
        _self.changeDeleteFlashcardButtonTextColour = function (c) {
            return changeElementTextColour("deleteFlashcard", c)
        }

        // API function to change the background colour of the correct guess button
        _self.changeCorrectButtonBackgroundColour = function (c) {
            return changeElementBackgroundColour("correct", c)
        }

        // API function to change the text colour of the correct guess button
        _self.changeCorrectButtonTextColour = function (c) {
            return changeElementTextColour("correct", c)
        }

        // API function to change the background colour of the incorrect guess button
        _self.changeIncorrectButtonBackgroundColour = function (c) {
            return changeElementBackgroundColour("incorrect", c)
        }

        // API function to change the text colour of the incorrect guess button
        _self.changeIncorrectButtonTextColour = function (c) {
            return changeElementTextColour("incorrect", c)
        }

        // API function to change the background colour of the add flashcard button
        _self.changeAddFlashcardButtonBackgroundColour = function (c) {
            return changeElementBackgroundColour("addFlashcard", c)
        }

        // API function to change the text colour of the add flashcard button
        _self.changeAddFlashcardButtonTextColour = function (c) {
            return changeElementTextColour("addFlashcard", c)
        }

        // API function to change the background colour of the answer container div
        _self.changeAnswerContainerBackgroundColour = function (c) {
            return changeElementBackgroundColour("answerContainer", c)
        }

        // API function to change the text colour of the answer container div
        _self.changeAnswerContainerTextColour = function (c) {
            return changeElementTextColour("answerContainer", c)
        }

        // add DOM element to end of body
        document.querySelector('body').append(_self.element)

        return _self
    }

    global.FlashcardSet = global.FlashcardSet || FlashcardSet

})(window, window.document, $);
