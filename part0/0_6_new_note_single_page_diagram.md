```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser executes the JavaScript code that adds the new note into the list

    Note right of browser: The Javascript code also redraws the list

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
```