# Emojions
An embeddeable emoji bar.

# The Project 
Our goal is to create an open source embeddable emoji bar in which users on a website can interact with. This was blatantly inspired by Github issues, and Slack:

![inspriation image](docs/images/inspiration.png)

A "reaction bar" in which users can click on an emoji and increment it's respective counter.

# Getting Started

1. Understanding the [project / product](https://github.com/the-heap/Emojions/issues/1)
2. Understanding how to [contribute](./CONTRIBUTING.md)
3. Read Project Components below, for getting setup.

# Terminology

**Emoji-bar**: A container with emojis in it, and the corresponding number of time they have been clicked (think, facebook, slack, github isues etc).

**Snippet**: The embeddable script that allows an end user to add an "emoji bar" to their website

**Client** : Where a user can go to customize their snippet (the emoji's that show up.)

**Api** : A wrapper for the database — it allows a user of the emoji bar to store the click count ... somewhere, and then retrieve those amount when they like. 

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

