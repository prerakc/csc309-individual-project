"use strict";


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

    toggleAddButton.addEventListener("click", toggleAddFlashcardContainer)
    dropdownMenu.addEventListener("change", updateSelectedFlashcard)
    deleteFlashcard.addEventListener("click", handleDeleteFlashcard)
    answerContainer.addEventListener("click", toggleAnswerVisibility)
    correctButton.addEventListener("click", correctGuess)
    incorrectButton.addEventListener("click", incorrectGuess)
    addFlashcardForm.addEventListener("submit", addFlashcard)

    function toggleAddFlashcardContainer(event) {
        event.preventDefault();
        
        const addFlashcardContainer = _self.element.querySelector(".addFlashcardContainer")
    
        if (addFlashcardContainer.style.display === "none") {
            addFlashcardContainer.style.display = "inline-block"
        } else {
            addFlashcardContainer.style.display = "none"
        }
    }

    function updateSelectedFlashcard(event) {
        if ('preventDefault' in event) {
            event.preventDefault();
        }

        console.log(event.target.value)

        const selectedID = event.target.value

        const answer = _self.element.querySelector(".answer")

        answer.innerText = _self.flashcards.filter(flashcard => flashcard.id === parseInt(selectedID))[0].answer
    }

    function handleDeleteFlashcard(event) {
        event.preventDefault();

        const currentlySelectedFlashcard = dropdownMenu.value

        if (currentlySelectedFlashcard.length) {
            if (confirm("Delete Flashcard?")) {
                _self.flashcards = _self.flashcards.filter(flashcard =>
                    flashcard.id !== parseInt(currentlySelectedFlashcard)
                )

                $( `option[value='${currentlySelectedFlashcard}'` ).remove();

                if (dropdownMenu.children.length === 0) {
                    _self.element.querySelector(".answer").innerText = "Add a Flashcard"
                } else {
                    const mockEvent = {
                        target: {
                            value: dropdownMenu.firstElementChild.value
                        }
                    }
                    updateSelectedFlashcard(mockEvent)
                }
            }
        } else {
            alert("Flashcard set is empty")
        }
    }

    function toggleAnswerVisibility(event) {
        event.preventDefault();

        const answer = _self.element.querySelector(".answer")

        if (answer.style.display === "none") {
            answer.style.display = "block"
        } else {
            answer.style.display = "none"
        }
    }

    function correctGuess(event) {
        event.preventDefault();
        
        if (dropdownMenu.value.length) {
            const newFlashcard = Math.floor(Math.random() * (dropdownMenu.children.length))
            dropdownMenu.selectedIndex = newFlashcard
            console.log(dropdownMenu.value)
            const mockEvent = {
                target: {
                    value: dropdownMenu.children[newFlashcard].value
                }
            }
            updateSelectedFlashcard(mockEvent)
        } else {
            alert("Flashcard set is empty")
        }
    }

    function incorrectGuess(event) {
        event.preventDefault();
        
        if (dropdownMenu.value.length) {
            const newFlashcard = Math.floor(Math.random() * (dropdownMenu.children.length))
            dropdownMenu.selectedIndex = newFlashcard
            console.log(dropdownMenu.value)
            const mockEvent = {
                target: {
                    value: dropdownMenu.children[newFlashcard].value
                }
            }
            updateSelectedFlashcard(mockEvent)
        } else {
            alert("Flashcard set is empty")
        }
    }

    function addFlashcard(event) {
        event.preventDefault();
        
        const newQuestion = _self.element.querySelector(".newQuestion").value
    
        const newAnswer = _self.element.querySelector(".newAnswer").value
    
        if (newQuestion.length !== 0 && newAnswer.length !== 0) {
            const anyDuplicates = _self.flashcards.filter(flashcard =>
                flashcard.question === newQuestion && flashcard.answer === newAnswer
            )
                        
            if (anyDuplicates.length) {
                alert("Flashcard already exists in set")
            } else {
                const newFlashcard = {
                    question: newQuestion,
                    answer: newAnswer,
                    id: _self.flashcards.length === 0
                            ?
                                1
                            :
                                _self.flashcards.reduce(
                                    (highestID, flashcard) => Math.max(flashcard.id, highestID),
                                    0
                                ) + 1
                }
                
                _self.flashcards.push(newFlashcard)
    
                addDropdownMenuOption(newFlashcard)
            }
        } else {
            alert("Question and Answer fields cannot be empty")
        }
    }

    function addDropdownMenuOption(flashcard) {
        const noFlashcards = dropdownMenu.children.length === 0

        const newDropdownMenuOption = document.createElement("option")
        newDropdownMenuOption.value = flashcard.id
        //newDropdownMenuOption.appendChild(document.createTextNode(flashcard.question))
        //dropdownMenu.appendChild(newDropdownMenuOption)
        newDropdownMenuOption.text = flashcard.question
        dropdownMenu.add(newDropdownMenuOption)

        if (noFlashcards) {
            const mockEvent = {
                target: {
                    value: flashcard.id
                }
            }
            updateSelectedFlashcard(mockEvent)
        }

        //console.log(dropdownMenu)
    }

    _self.addFlashcard = function(question, answer) {
        if (question.length !== 0 && answer.length !== 0) {
            const anyDuplicates = _self.flashcards.filter(flashcard =>
                flashcard.question === question && flashcard.answer === answer
            )
                        
            if (anyDuplicates.length) {
                return -1
            } else {
                const newFlashcard = {
                    question: question,
                    answer: answer,
                    id: _self.flashcards.length === 0
                            ?
                                1
                            :
                                _self.flashcards.reduce(
                                    (highestID, flashcard) => Math.max(flashcard.id, highestID),
                                    0
                                ) + 1
                }
                
                _self.flashcards.push(newFlashcard)
    
                addDropdownMenuOption(newFlashcard)

                return newFlashcard.id
            }
        } else {
            return -1
        }
    }

    _self.removeFlashcard = function(id) {
        const currentlySelectedFlashcard = dropdownMenu.value

        if (currentlySelectedFlashcard.length) {
            const flashcardToRemove = _self.flashcards.filter(flashcard => 
                flashcard.id === id
            )
            
            if (flashcardToRemove.length === 0) {
                return {}
            } else {
                _self.flashcards = _self.flashcards.filter(flashcard =>
                    flashcard.id !== id
                )

                $( `option[value='${id}'` ).remove();

                if (parseInt(currentlySelectedFlashcard) === id) {
                    if (dropdownMenu.children.length === 0) {
                        _self.element.querySelector(".answer").innerText = "Add a Flashcard"
                    } else {
                        const mockEvent = {
                            target: {
                                value: dropdownMenu.firstElementChild.value
                            }
                        }
                        updateSelectedFlashcard(mockEvent)
                    }
                }

                return flashcardToRemove[0]
            }
        } else {
            return {}
        }
    }

    _self.getFlashcard = function(id) {
        const flashcardToGet = _self.flashcards.filter(flashcard => 
            flashcard.id === id
        )

        if (flashcardToGet.length === 0) {
            return {}
        } else {
            return flashcardToGet[0]
        }
    }

    document.querySelector('body').append(_self.element)

    return _self
}