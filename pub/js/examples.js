"use strict";

const body = $("body")

// Example 1: Newly created flashcard deck
const emptyDeckDesc = document.createElement("div")
emptyDeckDesc.innerHTML = `
    <h3>1) Newly created flashcard deck</h3>
    <div style="border: 1px solid black; padding: 5px 20px 5px 20px; margin-bottom: 20px;">
        <p>const emptyDeck = FlashcardSet("emptyDeck")</p>
    </div>
`
emptyDeckDesc.style.marginTop = "50px"

body.append(emptyDeckDesc)

const emptyDeck = FlashcardSet("emptyDeck")

// Example 2: Loading flashcard deck from JSON
const loadedDeckDesc = document.createElement("div")
loadedDeckDesc.innerHTML = `
    <h3>2) Loading flashcard deck from JSON</h3>
    <div style="border: 1px solid black; padding: 5px 20px 5px 20px; margin-bottom: 20px;">
        <p>const loadedDeck = FlashcardSet("loadedDeck")</p>
        <p>loadedDeck.loadFromJSON(</p>
        <p style="padding-left: 20px;">JSON.stringify(</p>
        <p style="padding-left: 40px;">[</p>
        <p style="padding-left: 60px;">{question: "Q1", answer: "A1", id: 1, bucket: 0, turnsPassed: 0},</p>
        <p style="padding-left: 60px;">{question: "Q2", answer: "A2", id: 2, bucket: 0, turnsPassed: 0},</p>
        <p style="padding-left: 60px;">{question: "Q3", answer: "A3", id: 3, bucket: 0, turnsPassed: 0},</p>
        <p style="padding-left: 60px;">{question: "Q4", answer: "A4", id: 4, bucket: 0, turnsPassed: 0},</p>
        <p style="padding-left: 60px;">{question: "Q5", answer: "A5", id: 5, bucket: 0, turnsPassed: 0}</p>
        <p style="padding-left: 40px;">]</p>
        <p style="padding-left: 20px;">)</p>
        <p>)</p>
    </div>
`
loadedDeckDesc.style.marginTop = "50px"

body.append(loadedDeckDesc)

const loadedDeck = FlashcardSet("loadedDeck")

loadedDeck.loadFromJSON(
    JSON.stringify(
        [
            {question: "Q1", answer: "A1", id: 1, bucket: 0, turnsPassed: 0},
            {question: "Q2", answer: "A2", id: 2, bucket: 0, turnsPassed: 0},
            {question: "Q3", answer: "A3", id: 3, bucket: 0, turnsPassed: 0},
            {question: "Q4", answer: "A4", id: 4, bucket: 0, turnsPassed: 0},
            {question: "Q5", answer: "A5", id: 5, bucket: 0, turnsPassed: 0},
        ]
    )
)

// Example 3: Overriding default CSS styling
const colourfulDeckDesc = document.createElement("div")
colourfulDeckDesc.innerHTML = `
    <h3>3) Overriding default CSS styling</h3>
    <div style="border: 1px solid black; padding: 5px 20px 5px 20px; margin-bottom: 20px;">
        <p>const colourfulDeck = FlashcardSet("colourfulDeck")</p>
        <p>colourfulDeck.loadFromJSON(</p>
        <p style="padding-left: 20px;">JSON.stringify([{</p>
        <p style="padding-left: 40px;">question: "What is Lorem Ipsum?",</p>
        <p style="padding-left: 40px;">answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \\n \\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",</p>
        <p style="padding-left: 40px;">id: 1,</p>
        <p style="padding-left: 40px;">bucket: 0,</p>
        <p style="padding-left: 40px;">turnsPassed: 0</p>
        <p style="padding-left: 20px;">}])</p>
        <p>)</p>
        <p>colourfulDeck.changeToggleAddButtonBackgroundColour("wheat")</p>
        <p>colourfulDeck.changeToggleAddButtonTextColour("darkblue")</p>
        <p>colourfulDeck.changeDeleteFlashcardButtonBackgroundColour("chartreuse")</p>
        <p>colourfulDeck.changeDeleteFlashcardButtonTextColour("crimson")</p>
        <p>colourfulDeck.changeCorrectButtonBackgroundColour("tomato")</p>
        <p>colourfulDeck.changeCorrectButtonTextColour("yellow")</p>
        <p>colourfulDeck.changeIncorrectButtonBackgroundColour("turquoise")</p>
        <p>colourfulDeck.changeIncorrectButtonTextColour("chocolate")</p>
        <p>colourfulDeck.changeAddFlashcardButtonBackgroundColour("lightblue")</p>
        <p>colourfulDeck.changeAddFlashcardButtonTextColour("darkorange")</p>
        <p>colourfulDeck.changeAnswerContainerBackgroundColour("lightgoldenrodyellow")</p>
        <p>colourfulDeck.changeAnswerContainerTextColour("magenta")</p>
    </div>
`
colourfulDeckDesc.style.marginTop = "50px"

body.append(colourfulDeckDesc)

const colourfulDeck = FlashcardSet("colourfulDeck")

colourfulDeck.loadFromJSON(
    JSON.stringify([{
        question: "What is Lorem Ipsum?",
        answer: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. \n\n It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        id: 1,
        bucket: 0,
        turnsPassed: 0
    }])
)

colourfulDeck.changeToggleAddButtonBackgroundColour("wheat")
colourfulDeck.changeToggleAddButtonTextColour("darkblue")

colourfulDeck.changeDeleteFlashcardButtonBackgroundColour("chartreuse")
colourfulDeck.changeDeleteFlashcardButtonTextColour("crimson")

colourfulDeck.changeCorrectButtonBackgroundColour("tomato")
colourfulDeck.changeCorrectButtonTextColour("yellow")

colourfulDeck.changeIncorrectButtonBackgroundColour("turquoise")
colourfulDeck.changeIncorrectButtonTextColour("chocolate")

colourfulDeck.changeAddFlashcardButtonBackgroundColour("lightblue")
colourfulDeck.changeAddFlashcardButtonTextColour("darkorange")

colourfulDeck.changeAnswerContainerBackgroundColour("lightgoldenrodyellow")
colourfulDeck.changeAnswerContainerTextColour("magenta")

// Example 4: Adding/removing flashcards with API functions
const apiDeckDesc = document.createElement("div")
apiDeckDesc.innerHTML = `
    <h3>4) Adding/removing flashcards with API functions</h3>
    <div style="border: 1px solid black; padding: 5px 20px 5px 20px; margin-bottom: 20px;">
        <p>const apiDeck = FlashcardSet("apiDeck")</p>
        <p>apiDeck.addFlashcard("This question will be deleted", "This answer will be deleted")</p>
        <p>apiDeck.addFlashcard("This question is what will be shown", "This answer is what will be shown")</p>
        <p>apiDeck.removeFlashcard(1)</p>
    </div>
`
apiDeckDesc.style.marginTop = "50px"

body.append(apiDeckDesc)

const apiDeck = FlashcardSet("apiDeck")

apiDeck.addFlashcard(
    "This question will be deleted",
    "This answer will be deleted"
)

apiDeck.addFlashcard(
    "This question is what will be shown",
    "This answer is what will be shown"
)

apiDeck.removeFlashcard(1)