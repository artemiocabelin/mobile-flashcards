# Mobile Flashcards

To launch this app:

```
npm install
npm start

or

yarn install
yarn start
```
---
## Platforms Tested
* iOS

* Android

---
## Structure and Behaviors
---
#### [0] DeckNav 
  * TabNavigator bar to switch between *[1] Deck list View* and *[2] New Deck View*

---

#### [1] Deck List View
  * displays title of each Deck
  * displays the number of cards in each deck
    #### Behaviors
    * clicking on a deck will go to *[3] Individual Deck View*

---

#### [2] New Deck View
  * displays an option to enter a title for the new deck
  * displays an option to submit a new deck title
    #### Behaviors
    * an empty title will display an Error Messsage on submit
    * clicking on submit will redirect to *[1] Deck List View*

---

#### [3] Individual Deck View
  * displays the title of the Deck
  * displays the number of cards in the deck
  * displays an option to **start** a quiz on this specific deck
  * displays an option to **add** a new question to the deck
    #### Behaviors
    *  clicking on Start Quiz will go to *[4] Quiz View*
    *  clicking on Add Card will go to *[5] New Question View*

---

#### [4] Quiz View
  * displays a card question
  * displays an option to view the answer(**flips** the card)
  * displays a 'Correct' button
  * displays an 'Incorrect' button
  * displays the number of cards left in the quiz
  * displays the percentage correct *once the quiz is complete*
      #### Behaviors
    *  clicking on Answer will **flip card** to reveal the answer
    *  clicking on Question will **flip card** to reveal the question
    *  clicking on Correct will increase number of correct answers
    *  clicking on Incorrect will increase number of incorrect answers
    *  on completion, app will calculate percentage correct, then display the results and the options to restart or finish quiz.
    * clicking on Restart will restart the quiz
    * clicking on Finish Quiz will redirect to [3] Individual Deck View

---

#### [5] New Question View
  * displays an option to enter a new question
  * displays an option to enter an answer
  * displays an option to submit the new question
      #### Behaviors
    * an empty question or answer will display an Error Messsage on submit
    * clicking on submit will add to Current Deck's card list then redirect to *[3] Individual Deck View*
  ---

  ---

  ## Data Structure

   Deck List Example:
  ```javascript
  {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
}
  ```

  Quiz Session Example:
  ```javascript
  {
    title: 'React',
    questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
    ],
    status: {
        activeQuestionIndex: 1,
        correctAns: 1,
        incorrectAns: 0,
        finished: false,
        percentage: 0
    }
  }
  ```