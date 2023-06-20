"use strict";

let flashcards = []

function toggleAddFlashcardContainer(event) {
    event.preventDefault();
    
    const addFlashcardContainer = document.getElementById("addFlashcardContainer")

    if (addFlashcardContainer.style.display === "none") {
        addFlashcardContainer.style.display = "inline-block"
    } else {
        addFlashcardContainer.style.display = "none"
    }
}

function addFlashcard(event) {
    event.preventDefault();
    
    const newQuestion = document.getElementById("newQuestion").value

    const newAnswer = document.getElementById("newAnswer").value

    if (newQuestion.length !== 0 && newAnswer.length !== 0) {
        const anyDuplicates = flashcards.filter(flashcard =>
            flashcard.question === newQuestion && flashcard.answer === newAnswer
        )
                    
        if (anyDuplicates.length) {
            alert("Flashcard already exists in set")
        } else {
            const newFlashcard = {
                question: newQuestion,
                answer: newAnswer,
                id: flashcards.length === 0
                        ?
                            1
                        :
                            flashcards.reduce(
                                (highestID, flashcard) => Math.max(flashcard.id, highestID),
                                0
                            ) + 1
            }
            
            flashcards.push(newFlashcard)

            addDropdownMenuOption(newFlashcard)
        }
    } else {
        alert("Question and Answer fields cannot be empty")
    }
}

function addDropdownMenuOption(flashcard) {
    const dropdownMenu = document.getElementById("dropdownMenu")

    const noFlashcards = dropdownMenu.children.length === 0

    const newDropdownMenuOption = document.createElement("option")
    newDropdownMenuOption.value = flashcard.id
    //newDropdownMenuOption.appendChild(document.createTextNode(flashcard.question))
    //dropdownMenu.appendChild(newDropdownMenuOption)
    newDropdownMenuOption.text = flashcard.question
    dropdownMenu.add(newDropdownMenuOption)

    if (noFlashcards) {
        updateSelectedFlashcard({target: {value: flashcard.id}})
    }

    //console.log(dropdownMenu)
}

function deleteFlashcard(event) {
    event.preventDefault();

    const currentlySelectedFlashcard = document.getElementById("dropdownMenu").value

    if (currentlySelectedFlashcard.length) {
        flashcards = flashcards.filter(flashcard =>
            flashcard.id !== parseInt(currentlySelectedFlashcard)
        )

        $( `option[value='${currentlySelectedFlashcard}'` ).remove();

        if (document.getElementById("dropdownMenu").children.length === 0) {
            document.getElementById("answer").innerText = "Add a Flashcard"
        } else {
            updateSelectedFlashcard({target: {value: document.getElementById("dropdownMenu").firstElementChild.value}})
        }
    } else {
        alert("Flashcard set is empty")
    }
}

function toggleAnswerVisibility(event) {
    const answer = document.getElementById("answer")

    if (answer.style.display === "none") {
        answer.style.display = "block"
    } else {
        answer.style.display = "none"
    }
}

function updateSelectedFlashcard(event) {
    console.log(event.target.value)

    const selectedID = event.target.value

    const answer = document.getElementById("answer")

    answer.innerText = flashcards.filter(flashcard => flashcard.id === parseInt(selectedID))[0].answer
}

function selectNewFlashcard(event) {
    if (document.getElementById("dropdownMenu").value.length) {
        const newFlashcard = Math.floor(Math.random() * (document.getElementById("dropdownMenu").children.length))
        document.getElementById("dropdownMenu").selectedIndex = newFlashcard
        console.log(document.getElementById("dropdownMenu").value)
        updateSelectedFlashcard({target: {value: document.getElementById("dropdownMenu").children[newFlashcard].value}})
    } else {
        alert("Flashcard set is empty")
    }
}

















// function addCard(event) {
//     // console.log("test")
//     // const ret = prompt("What's your sign?");
//     // console.log(ret)
//     const add = document.getElementById("add")//.getElementById("add")

//     console.log(add.style.display)

//     if (add.style.display === "none") {
//         add.style.display = "inline-block"
//     } else {
//         add.style.display = "none"
//     }
// }

// function deleteCard(event) {
//     if (confirm("Delete flashcard?!")) {
//         console.log("Delete card")
//     } else {
//         console.log("Dont Delete card")
//     }
// }

// function promptFnc(event) {
//     event.preventDefault();
//     prompt("Test")
// }

// function testFunction(event) {
//     const answer = document.getElementById("answer")

//     console.log(answer.style.display)

//     if (answer.style.display === "none") {
//         answer.style.display = "block"
//     } else {
//         answer.style.display = "none"
//     }
// }

// function FlashcardSet(divID) {
//     this.printTest()
//     this.flashcards = []
//     this.divID = divID
//     this.element = document.createElement('div')
//     this.element.id = this.divID
//     this.element.innerHTML = `
//         <div style="display: inline-block">
//             <div>
//                 <button type="button" onclick="addCard(event)">Add</button>
//                 <select>
//                     <option value="first">This is the first flashcard question</option>
//                     <option value="second">This is the second flashcard question</option>
//                     <option value="third">This is the third flashcard question</option>
//                 </select>
//                 <button type="button" onclick="deleteCard(event)">Delete</button>
//             </div>
//             <div
//                 style="height: 300px; width: 600px; display: block; border: 1px solid black;"
//                 onclick="testFunction(event)"
//             >
//                 <h3 style="display: block" id="answer">Flashcard Answer</h3>
//             </div>
//             <div>
//                 <button type="button">Correct</button>
//                 <button type="button">Incorrect</button>
//             </div>
//         </div>
//         <div id="add" style="display: inline-block">
//             <form>
//                 <input type="text" style="width: 450px;" placeholder="New Flashcard Question">
//                 <br>
//                 <textarea placeholder="New Flashcard Answer" style="resize: none; height: 250px; width: 450px"></textarea>
//                 <br>
//                 <input type="submit" value="Add Flashcard" onclick="promptFnc(event)">
//             </form>
//         </div>
//     `
//     document.querySelector('body').append(this.element)
// }

// FlashcardSet.prototype = {
//     forceUpdate: function() {
//         $(`#${this.divID}`).remove()
//         this.element = document.createElement('div')
//         this.element.id = this.divID
//         this.element.innerHTML = `<h2>Test</h2>`
//         document.querySelector('body').append(this.element)
//     },
//     addFlashcard: function(question, answer) {
//         const anyDuplicates = this.flashcards.filter(flashcard =>
//             flashcard.question === question && flashcard.answer === answer
//         )
        
//         if (anyDuplicates.length) {
//             alert("Flashcard already exists in set")
            
//             return 0
//         } else {
//             const newFlashcard = {
//                 question,
//                 answer,
//                 id: this.flashcards.length === 0
//                         ?
//                             1
//                         :
//                             this.flashcards.reduce(
//                                 (highestID, flashcard) => Math.max(flashcard.id, highestID),
//                                 0
//                             ) + 1
//             }

//             this.flashcards.push(newFlashcard)

//             return newFlashcard.id
//         }
//     },
//     addCard: function(event) {
//     },
//     printTest: function() {console.log("testing 123")}
// }