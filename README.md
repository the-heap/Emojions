# Emojions

Welcome to one of THE HEAP's open projects! For the month of May We're building an embeddeable emoji bar. This project aims to be as accessible as possible to people who want to contribute to open source code! We've got a few things to go over, so if you're new to Github, or contributing to open source software, take a breather and then read on! You got this. 👌

Before we get into the project itself, let's get to know our collaborative environment:
- Most of the activity regarding the project's status happens _right here_ on github, especially on the [issues](https://github.com/the-heap/Emojions/issues) page. Here you can see a [roadmap](https://github.com/the-heap/Emojions/issues/1) for our project, pick out issues, and keep an eye on conversations.
- The Heap will also be making videos to document the process (live coding, demonstrations, "office hours" and so on). Subscribe to the [Youtube Channel](https://www.youtube.com/channel/UCIaeBxFZOzLA20sSAUENXRg). 
- The Heap has a [Twitter account to tweet](https://twitter.com/theheap_) both about projects and programming (and life, the universe...). Follow us to stay in the loop

Our goal is to create an _embeddable emoji bar_ that users on any website can interact with. This was blatantly inspired by Github issues, and Slack. This is an example image from a Github issue page:

![inspriation image](docs/images/inspiration.png)

The above is an example of what I call a "reaction bar" — an interactive page element in which users can click on an emoji and increment it's respective counter.

# Getting Started

To contribute successfully to this project it might take a bit of time to setup and become aquainted with both the project itself and how you can best add your contributions. The following steps will inform the code you write and help you make good pull requests.

1. Understanding the [project / product](https://github.com/the-heap/Emojions/issues/1)
2. Understanding how to [contribute](./CONTRIBUTING.md)
3. Read Project Components below, for getting setup.

# Project Setup

**Snippet** : 

```sh
cd snippet
npm install
```

To run the snippet and see it working, you'll need to open the `example.html` page in the build folder to test.

**Client**

// Todo

**Api**

// Todo


# Terminology

If you are a bit lost, the following terminology might help to clarify some aspects of the project. 

**Emoji-bar**: A container with emojis (:wave:) in it, and the corresponding number of time they have been clicked (think, facebook, slack, github isues etc).

**Snippet**: The embeddable script that allows an end user to add an "emoji bar" to their website

**Client** : Where a user can go to customize their snippet (the emoji's that show up.)

**Api** : A wrapper for the database — it allows a user of the emoji bar to store the click count ... somewhere, and then retrieve that amount when desired

# Other

- Thanks for being you
- Follow The Heap on [twitter](https://twitter.com/theheap_) and subscribe to our [youtube channel](https://www.youtube.com/channel/UCIaeBxFZOzLA20sSAUENXRg)
