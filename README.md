# Name
I created a chat app for iOS using React Native Expo , Mock Service Worker.
The name "A-Chat" is an acronym for "Active" and "A" for the creator, Asami.

# Features
There are four main functions.
1. Sign-up and login functions
2. Friends and group list display/operation function
3. Friends, group chat function (main)
4. Ability to update profile information

# Specific Features
The following is a screen-by-screen explanation.

1. Sign up and login functions on Sign Up and Log In screens
	- validation
	- Show/hide password

2. Display of friends and group list on the Home screen
	- Switching friends, groups, and retrieving counts
	- Search function for friends and groups
	- Add a friend
	- Create a new group
	- Group leave function
	- 友達、グループをクリックするとチャットに遷移

3. Individual and group chat function on Chats screen
  - Message Search
	- Hiding or deleting messages
	- Sending and receiving messages
	- Send, receive and share images
	- Sending and receiving pictograms
	- Read, unread
	- [Group chat screen only] Adding members after creating a group

4. Ability to update profile information on the Profile screen
	- Update profile picture, nickname, and friend search permission flag ON/OFF

# Installation

```bash
git clone https://github.com/asami-kawasaki/cs50_achat.git
cd cs50_achat
yarn install
expo start
```

# Usage

```bash
expo start
```

# Author
Kawasaki Asami

# License
"A-Chat" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
