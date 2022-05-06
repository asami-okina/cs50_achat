# Name
I created a chat app for iOS using React Native Expo , Mock Service Worker.
The name "A-Chat" is an acronym for "Active" and "A" for the creator, Asami.

# Table of Contents
- [Name](#Name)
- [Features](#Features)
- [SpecificFeatures](#SpecificFeatures)
- [Installation](#Installation)
- [Usage](#Usage)
- [directoryStructure](#directoryStructure)
- [TechnologyUsed](#TechnologyUsed)
- [Author](#Author)
- [License](#License)

# Features
There are four main functions.
1. Sign-up and login functions
2. Friends and group list display/operation function
3. Friends, group chat function (main)
4. Ability to update profile information

# SpecificFeatures
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
	- Clicking on a friend or group will take you to the chat

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
**Downloading and installing steps**
1. Clone this repository
```bash
git clone https://github.com/asami-kawasaki/cs50_achat.git
```

2. Go into the repository
```bash
cd cs50_achat
```

3. Install dependencies
```bash
yarn install
```

4. Run the app
```bash
expo start
```

# Usage
```bash
expo start
```

# directoryStructure
```bash
images
src
├─ components
│  ├─ addFriend
│  │  ├─ existFriend.tsx
│  │  └─ notExistFriend.tsx
│  ├─ addGroup
│  │  ├─ _addFriendList
│  │  │  └─ addFriendListItem.tsx
│  │  ├─ _friendList
│  │  │  └─ friendListItem.tsx
│  │  ├─ addFriendList.tsx
│  │  ├─ addGroupTitle.tsx
│  │  └─ friendList.tsx
│  ├─ addGroupSetting
│  │  └─ selectedFriendSpace.tsx
│  ├─ chat
│  │  ├─ _clickedFriendIcon
│  │  │  ├─ _alreadyFriendModal
│  │  │  │  └─ header.tsx
│  │  │  ├─ alreadyFriendModal.tsx
│  │  │  └─ notFriendModal.tsx
│  │  ├─ addGroupMember.tsx
│  │  └─ messages.tsx
│  ├─ chats
│  │  ├─ _chatsList
│  │  │  ├─ _chatBasic
│  │  │  │  ├─ hiddenListItem.tsx
│  │  │  │  └─ listItem.tsx
│  │  │  └─ chatBasic.tsx
│  │  └─ chatsList.tsx
│  ├─ common
│  │  ├─ _topAreaContainer
│  │  │  ├─ groupImageAndGroupName.tsx
│  │  │  ├─ mainTitle.tsx
│  │  │  └─ searchForm.tsx
│  │  ├─ aChatLogo.tsx
│  │  ├─ addButton.tsx
│  │  ├─ button.tsx
│  │  ├─ confirmModal.tsx
│  │  ├─ footer.tsx
│  │  ├─ friendOrGroupSelectTab.tsx
│  │  ├─ headTitle.tsx
│  │  ├─ smallButton.tsx
│  │  ├─ toSignUpOrLoginTextArea.tsx
│  │  └─ topAreaWrapper.tsx
│  ├─ home
│  │  ├─ _friendAndGroupList
│  │  │  ├─ examples
│  │  │  │  └─ basic.tsx
│  │  │  └─ listItem.tsx
│  │  └─ friendAndgroupList.tsx
│  ├─ logIn
│  │  ├─ authErrorText.tsx
│  │  ├─ forgotPasseword.tsx
│  │  ├─ mailForm.tsx
│  │  └─ passwordForm.tsx
│  ├─ profile
│  │  ├─ _profileInfo
│  │  │  ├─ _editNickName
│  │  │  │  ├─ buttonContainer.tsx
│  │  │  │  ├─ nickNameStringCount.tsx
│  │  │  │  └─ textInputForm.tsx
│  │  │  └─ editNickName.tsx
│  │  ├─ profileImage.tsx
│  │  └─ profileInfo.tsx
│  └─ signUp
│     ├─ _description
│     │  ├─ mailFormDescription.tsx
│     │  ├─ passwordFormDescription.tsx
│     │  └─ userIdFormDescription.tsx
│     ├─ mailForm.tsx
│     ├─ passwordForm.tsx
│     └─ userIdForm.tsx
├─ constants
│  ├─ styles
│  │  ├─ formDescriptionStyles.js
│  │  ├─ sameStyles.js
│  │  ├─ searchStyles.js
│  │  └─ selectedFriendStyles.js
│  ├─ api.ts
│  └─ layout.tsx
├─ hooks
│  ├─ useIsMounted.tsx
│  └─ useTogglePasswordVisibility.tsx
├─ mocks
│  ├─ handlers.js
│  └─ native.js
└─ screens
   ├─ addFriend.tsx
   ├─ addGroup.tsx
   ├─ addGroupSetting.tsx
   ├─ chat.tsx
   ├─ chats.tsx
   ├─ home.tsx
   ├─ logIn.tsx
   ├─ profile.tsx
   ├─ signUp.tsx
   └─ welcome.tsx
```

# TechnologyUsed
This software uses the following open source packages:
- React Native Expo
- Mock Service Worker

# Author
Kawasaki Asami

# License
"A-Chat" is under [MIT license](https://en.wikipedia.org/wiki/MIT_License).
