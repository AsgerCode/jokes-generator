
# Enklare Technical Assignment




## How to run


Run the following commands on your terminal/cmd inside the cloned project folder:

```bash
  npm install
  npm start
```

After running these commands, you should be presented with a message with a url (default is localhost:8080). Navigate to this page to use the app.
    



## How to run on a docker container


Run the following commands on your terminal/cmd inside the cloned project folder:

```bash
  docker build . -t <your username>/enklare-technical-assignment
  docker run -p 49160:8080 -d <your username>/enklare-technical-assignment
  docker ps
```

After running these commands, you should be presented with a list of running docker processes. Under ports you can see the docker port mapping. Navigate on your browser to the port you mapped 8080 to (if you followed everything correctly, localhost:49160).

To stop the process, run:

```bash
    docker kill <container id>
```


## Questionnaire Answers

**1. What is, to your knowledge, the main differences between a relational database and a NoSQL database, and when would you prefer the latter.**

Relational databases store data in a table like format with a structure that is defined beforehand on a schema. This makes it so that data is related to each other.
On non-relational databases like NoSQL, the data is unstructured and doesn't follow a table. They scale much better when handling a lot of data or many connections/real time connections.

**2. Explain the difference between the keywords Implements and Extends when designing classes.**

Implements signifies that a class is implementing an interface, which is a collection of methods that define the behavior of a class. When implementing an interface, we have to write the implementation for all methods of said interface.
Extends is used to indicate that the class is inheriting from another class. When a class extends another class, it inherits all properties and behaviors of the parent class, taking in its implementation as well. This can be overridden.

**3. Name some reasons why javascript applications use asynchronous code (Promises)**

The main reasons for asynchronous code are: better performance by not hanging code during execution while tasks run, better user experience for the same reason and support for functional programming.

**4. What is the difference between === and == when comparing two variables?**

== compares two values without comparing their type. === also compares its type. The latter is safer and usually the one to use.

**5. What are the differences between the javascript keywords const, var and let?**

They are all used to daclare variables, differing in their scope rules and mutability. A const variable can't be reassigned after declaration. var and let are the same except for the fact that let can only be accessed on the block where it is declared, and var is function-scoped.

**6. Write a simple function that takes an array of strings, and returns an array of numbers representing the length of those strings, ex: [“a”,”foo”,”b”,”foobar”] returns [1,3,1,6]**

```bash
  function stringLengths(arr) {
    const lengths = [];

    for (let i = 0; i < arr.length; i++) {
      lengths.push(arr[i].length);
    }

    return lengths;
  }
```

**7. When we import the following file, why is it only printing the “Hello World” text and not the others?**

Because only the second function is being invoked. The others are just declared.

**8. Which one/ones of #1, #2 or #3 is the correct way to use the promise defined in the top of this file?**

Code #2 is the correct way. Code #1 doesn't wait for the promise to be resolved, so on the print it will show a promise object. On code #2 we wait for the promise to resolve to then print the txt, which we can see by the use of the .then(). On code #3 we should get an error as this is not a valid way to use the resolve method.