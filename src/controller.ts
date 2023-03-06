import * as dotenv from 'dotenv';

dotenv.config();
const host = process.env.HOST;
const port = process.env.SERVER_PORT;

export const home = () => {
    return `
        <html>
            <head>
            <script src="https://cdn.tailwindcss.com"></script>
                <header class="bg-gray-800 shadow">
                    <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                        <h1 class="text-3xl font-bold tracking-tight text-white">Jokes Generator</h1>
                    </div>
                </header>
            </head>
            <body>
            <div class="m-10">
                <label id="quantityLabel" for="quantity" class="block text-sm font-medium leading-6 text-gray-900">How many jokes do you want to generate? (Minimum: 5, Maximum: 10)</label><br>
                <div id="quantityError" class="block text-m font-medium leading-6 text-red-900">Please select an appropriate number. (Minimum: 5, Maximum: 10)</div><br>
                <input type="number" id="quantity" name="quantity" min="5" max="10" value="10" class="block text-sm font-medium leading-6 text-gray-900"><br>
                <p/>
                <label for="type" class="block text-sm font-medium leading-6 text-gray-900">Choose the type of joke you want to generate:</label>
                <select name="type" id="type" class="mt-2 block rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <option value="any">Any</option>
                    <option value="single">Single Line</option>
                    <option value="twopart">Two Part</option>
                </select>
                <p/>
                <button id="generateButton" class="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 mt-10">Generate Jokes</button>
            </div>
                <script>
                document.getElementById("quantityError").style.display = 'none';
                document.getElementById("generateButton").onclick = function () {
                    if(document.getElementById("quantity").value >= 5 && document.getElementById("quantity").value <= 10) {
                        window.location = "/generate?quantity=" + document.getElementById("quantity").value + "&types=" + document.getElementById("type").value;
                    } else {
                        document.getElementById("quantityError").style.display = 'block';
                    }
                };
                </script>
            </body>
        </html>
        `
};

export const generateJokes = async (params: string) => {
    const paramsParse = {
        quantity: params.split('&')[0].split('=')[1],
        type: params.split('&')[1].split('=')[1]
    }

    const jokesCall = await fetch(`https://v2.jokeapi.dev/joke/Programming,Pun?safe-mode&amount=${paramsParse.quantity}&type=${paramsParse.type}`);
    const jokesJson = await jokesCall.json();
    const jokesArray = jokesJson.jokes;
    const formattedJokes: [{ category: string, joke: string }] = jokesArray.map((joke: { category: string, type: string; joke: string; setup: string; delivery: string; }) => {
        return joke.type == "single" ? { category: joke.category, joke: joke.joke } : { category: joke.category, joke: joke.setup + " " + joke.delivery }
    });

    const buildTable = () => {
        var html: string = '';
        formattedJokes.forEach(element => {
            html += `<tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"><td class="px-6 py-4">${element.category}</td><td class="px-6 py-4">${element.joke}</td></tr>`;
        });

        return html;
    }

    const buildAnalytics = () => {
        var allJokesString: string = '';
        
        formattedJokes.forEach(element => {
            allJokesString += element.joke
        });

        const totalCharacterCount = new Map();
        for (const ch of allJokesString.replace(/[^a-zA-Z]+/g, '').toLowerCase()) {
            const count = totalCharacterCount.get(ch) ?? 0;
            totalCharacterCount.set(ch, count + 1);
        }

        var mostCommonLetter: {ch: string, count: number } = { ch: "a", count: 0 };

        for (const [ch, count] of totalCharacterCount) {
            if(count > mostCommonLetter.count) {
                mostCommonLetter.ch = ch;
                mostCommonLetter.count = count;
            }
        }

        const thirdLetterInLastJoke: string = formattedJokes[formattedJokes.length - 1].joke.replace(/[^a-zA-Z]+/g, '').toLowerCase().charAt(2)
        var thirdLetterInLastJokeCount: number = totalCharacterCount.get(thirdLetterInLastJoke);

        const categoryCount = new Map();
        for (const joke of formattedJokes) {
            const count = categoryCount.get(joke.category) ?? 0;
            categoryCount.set(joke.category, count + 1);
        }

        const calculateCategoryText = () => {
            if(categoryCount.get('Programming') && categoryCount.get('Programming') > categoryCount.get('Pun') || !categoryCount.get('Pun')) {
                return `The dominant category is Programming. ${(categoryCount.get('Programming') / formattedJokes.length * 100).toFixed(0)}% of jokes belong to it.`
            };

            if(categoryCount.get('Pun') && categoryCount.get('Pun') > categoryCount.get('Programming') || !categoryCount.get('Programming')) {
                return `The dominant category is Pun. ${(categoryCount.get('Pun') / formattedJokes.length * 100).toFixed(0)}% of jokes belong to it.`
            };

            if(categoryCount.get('Pun') == categoryCount.get('Programming')) {
                return `The jokes generated belong to the Programming and Pun categories 50/50. There is no dominant category.`
            };
        }

        const htmlText = `Total amount of characters: ${allJokesString.length}, 
        Most common letter: ${mostCommonLetter.ch.toUpperCase()}, 
        The third letter at the last joke is ${thirdLetterInLastJoke.toUpperCase()} and it appeared ${thirdLetterInLastJokeCount} times, 
        ${calculateCategoryText()}`;

        return htmlText;
    }

    return `
        <html>
        <head>
            <script src="https://cdn.tailwindcss.com"></script>
            <header class="flex bg-gray-800 shadow">
                <div class="mx-5 max-w-200 py-6 px-4 sm:px-6 lg:px-8">
                    <h1 class="text-3xl font-bold tracking-tight text-white">Results</h1>
                    <a href="/" class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">Back Home</a>
                </div>
                <div class="text-l font-bold tracking-tight text-white mx-5 max-w-200 py-6 px-4 sm:px-6 lg:px-8">Analytics - ${buildAnalytics()}</div>
            </header>
        </head>
            <body>
                <table class="table-auto w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">Category</th>
                            <th scope="col" class="px-6 py-3">Joke</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${buildTable()}
                    </tbody>
                </table>
            </body>
        </html>
        `
};