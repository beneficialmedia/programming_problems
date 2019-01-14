/* Use an IFFE to load functions depending on the html page in view */
(function () {

    /* Prints 'Hello World' in the UI */
    var helloworld = function() {
        var titleElement = document.getElementsByClassName('c-content__content-title')[0];
        titleElement.innerHTML = 'Hello World!';
    }

    /* Prints a hello message to the user or to Alice or Bob only depending on the url of the page */
    /* User needs to type a name into an input text box and click the go button to see the printed text. */
    var whatsYourName = function(url) {
        var inputTextElement = document.getElementsByClassName('c-content__input__text')[0];
        var buttonElement = document.getElementsByClassName('c-content__input__button')[0];
        var greetingTextElement = document.getElementsByClassName('c-content__greeting__proper')[0];
        var promptTextElement = document.getElementsByClassName('c-content__greeting__prompt')[0];
        var unrecognizedTextElement = document.getElementsByClassName('c-content__greeting__unrecognized')[0];
        var errorTextElement = document.getElementsByClassName('c-content__greeting__error')[0];
        var nameSpanElement = document.getElementsByClassName('c-content__greeting-name')[0];

        let contentElementsToDisplay = [];

        if (url === 'whatsyourname') {
            contentElementsToDisplay = [promptTextElement, greetingTextElement, errorTextElement];
        } else {
            contentElementsToDisplay = [promptTextElement, greetingTextElement, unrecognizedTextElement, errorTextElement];
        }

        /* Hides/Shows input placeholder text so it's easier to use. */
        inputTextElement.addEventListener('focus', function() { inputTextElement.setAttribute('placeholder', ''); }, true);
        inputTextElement.addEventListener('blur', function() { inputTextElement.setAttribute('placeholder', 'Type your name here.'); }, true);

        /* Accessibility keyboard listener so when user presses enter on input focus the go function will execute */
        inputTextElement.addEventListener('keydown', function(event) { keyboard(event, url); }, true);

        /* Button click event listener that executes a go function to show and hide text in the UI */
        buttonElement.addEventListener('click', function() { go(url); }, true);

        var go = function(url) {

            /* Iterate through content elements via the contentElementsToDisplay array of Elements */
            for (var i = 0; i < contentElementsToDisplay.length; ++i) {
                /* First, hide the elements */
                contentElementsToDisplay[i].style.display = 'none';

                /* Display an element that's conditional on input value. */
                if (url === 'whatsyourname') {
                    if (inputTextElement.value === '') {
                        contentElementsToDisplay[0].style.display = 'block';
                        continue;
                    } else if (inputTextElement.value !== '' &&
                               inputTextElement.value.length <= 50) {
                        contentElementsToDisplay[1].style.display = 'block';
                        nameSpanElement.innerHTML = inputTextElement.value;
                        continue;
                    } else if (inputTextElement.value.length > 50) {
                        contentElementsToDisplay[2].style.display = 'block';
                        continue;
                    }
                } else {
                    if (inputTextElement.value === '') {
                        contentElementsToDisplay[0].style.display = 'block';
                        continue;
                    } else if (inputTextElement.value.toLowerCase() === 'alice' ||
                               inputTextElement.value.toLowerCase() === 'bob') {
                        contentElementsToDisplay[1].style.display = 'block';
                        nameSpanElement.innerHTML = inputTextElement.value;
                        continue;
                    } else if (inputTextElement.value !== '' &&
                               (inputTextElement.value.toLowerCase() !== 'alice' ||
                                inputTextElement.value.toLowerCase() !== 'bob') &&
                               inputTextElement.value.length <= 50) {
                        contentElementsToDisplay[2].style.display = 'block';
                        continue;
                    } else if (inputTextElement.value.length > 50) {
                        contentElementsToDisplay[3].style.display = 'block';
                        continue;
                    }
                }
            }
        }

        var keyboard = function(event, url) {
            if (event.keyCode == 13) {
                go(url);
            }
        }
    }

    /* Prints the sum of the numbers 1 to n */
    var numberSum = function(url) {
        var inputNumberElement = document.getElementsByClassName('c-content__input__text--number')[0];
        var buttonElement = document.getElementsByClassName('c-content__input__button--number')[0];
        var sumTextElement = document.getElementsByClassName('c-content__sum')[0];
        var errorTextElement = document.getElementsByClassName('c-content__error')[0];
        var sumTextInputNumberElement = document.getElementsByClassName('c-content__sum__input')[0];
        var sumTextNumberElement = document.getElementsByClassName('c-content__sum__number')[0];

        var contentElementsToDisplay = [sumTextElement, errorTextElement];;

        /* Hides/Shows input placeholder text so it's easier to use. */
        inputNumberElement.addEventListener('focus', function() { inputNumberElement.setAttribute('placeholder', ''); }, true);
        inputNumberElement.addEventListener('blur', function() { inputNumberElement.setAttribute('placeholder', 'Type a number here.'); }, true);

        /* Accessibility keyboard listener so when user presses enter on input focus the sumTotal function will execute */
        inputNumberElement.addEventListener('keydown', function(event) { keyboard(event, url); }, true);

        /* Button click event listener that executes the sumTotal function to show and hide text in the UI */
        buttonElement.addEventListener('click', function() { sumTotal(url); }, true);

        var sumTotal = function(url)  {
            var n = inputNumberElement.value;
            var total = 0;

            /* Give the user a hint if the input is empty */
            if (inputNumberElement.value === '') {
                errorTextElement.style.display = 'block';
                return;
            }

            /* Iterate through content elements via the contentElementsToDisplay array of Elements */
            for (var i = 0; i < contentElementsToDisplay.length; ++i) {
                /* Hide the elements in case there was an error or contain older values. */
                contentElementsToDisplay[i].style.display = 'none';
            }

            /* Calculate the sum of all numbers between 1 to n. */
            if (url === 'numbersum') {
                for (var i = 1; i <= n; ++i) {
                    total += i;
                }
            } else {

                /* Only multiples of three or five are considered in the sum, e.g. 3, 5, 6, 9, 10, 12, 15 for n = 17. */
                for (var i = 0; i < n; ++i) {
                    if (i % 3 === 0) {
                        total += i;
                        continue;
                    }
                    if (i % 5 === 0) {
                        total += i;
                    }
                }
            }

            /* Show the element displaying the new values */
            sumTextInputNumberElement.innerHTML = n;
            sumTextNumberElement.innerHTML = total;
            sumTextElement.style.display = 'block';
        }

        var keyboard = function(event, url) {
            if (event.keyCode == 13) {
                sumTotal(url);
            }
        }
    }

    /* Look at the url of the page */
    var route = window.location.href;

    /* Use a simple conditional statement (poor man's state machine) to load pages mapped to functions that do stuff. */
    if (route.indexOf('helloworld') > -1) {
        helloworld();
    } else if (route.indexOf('whatsyourname') > -1) {
        whatsYourName('whatsyourname');
    } else if (route.indexOf('greetspecificpeople') > -1) {
        whatsYourName('greetspecificpeople');
    } else if (route.indexOf('numbersum') > -1) {
        numberSum('numbersum');
    } else if (route.indexOf('sumofthreeorfive') > -1) {
        numberSum('sumofthreeorfive');
    } else if (route.indexOf('sumorproduct') > -1) {
        sumOrProduct();
    }
})();