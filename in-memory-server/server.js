// ------------------------------------------------
// 検証中の約束
const pcAsami = {
  email: "pcAsami@g.com",
  password: "pcAsami",
  userId: "pcAsami",
};

const smartPhone = {
  email: "spAsami@g.com",
  password: "spAsami",
  userId: "spAsami",
};
// ------------------------------------------------

// libs
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("../assets"));

// websocket
const server = require("ws").Server;
const s = new server({ port: 8000 });

s.on("connection", (ws) => {
  // クライアントからサーバに送られてきたメッセージ
  ws.on("message", (message) => {
    const parseMessage = JSON.parse(message.toString());
    // メッセージ送信
    if (parseMessage[0]?.type === "sendMessage") {
      // メッセージ送信
      if (parseMessage[0]?.type === "sendMessage") {
        // クライアントの中で、送るべきユーザーIDが一致するユーザーにのみメッセージ送信
        // parseMessage[0]?.sendUserId: 送るべきユーザーID
        parseMessage[0]?.sendUserIds.forEach((userId) => {
          s.clients.forEach((client) => {
            if (userId === client.userId) {
              client.send(JSON.stringify(parseMessage));
            }
          });
        });
      }
    } else {
      // クライアントにユーザーID情報の追加
      ws.userId = parseMessage[0]?.userId;
    }
  });
});

let _count = 0;
function _id() {
  return _count++;
}

let pc_profileInfo = {
  userId: "pcAsami",
  nickName: "あさみん",
  profileImage:
    "https://pbs.twimg.com/profile_images/1257586310077796352/XWNIr3Fr_400x400.jpg",
  searchFlag: true,
};

let sp_profileInfo = {
  userId: "spAsami",
  nickName: "あさみん",
  profileImage:
    "https://pbs.twimg.com/profile_images/1522452340611358720/8AqTz3iz_400x400.jpg",
  searchFlag: true,
};

let pc_friends = [
  {
    direct_chat_room_id: "friend 1",
    friend_use_id: sp_profileInfo.userId,
    friend_profile_image: sp_profileInfo.profileImage,
    friend_nickname: "spAsami",
  },
];

let sp_friends = [
  {
    direct_chat_room_id: "friend 1",
    friend_use_id: pc_profileInfo.userId,
    friend_profile_image: pc_profileInfo.profileImage,
    friend_nickname: "pcAsami",
  },
];

let groups = [
  {
    group_chat_room_id: "group 1",
    group_name: "group 1",
    group_image:
      "https://pbs.twimg.com/media/E16OXztUYAIpisv?format=jpg&name=large",
    group_member_user_id: ["pcAsami", "spAsami"],
  },
];

// 個別のメッセージ履歴
let temporaryMessages_friend1 = [
  {
    _id: 1,
    createdAt: "2022-04-27T02:10:29.189Z",
    user: {
      _id: "pcAsami",
      name: "pcAsami",
      avatar: pc_profileInfo.profileImage,
    },
    // sent: true,
    // received: true,
    image: "https://placeimg.com/140/140/any",
  },
  {
    _id: 2,
    createdAt: "2022-04-27T02:10:29.189Z",
    user: {
      _id: "spAsami",
      name: "spAsami",
      avatar: sp_profileInfo.profileImage,
    },
    // sent: true,
    // received: true,
    image: "https://placeimg.com/140/140/any",
  },
  {
    _id: 3,
    text: "いいよん",
    createdAt: "2022-04-27T02:08:10.189Z",
    user: {
      _id: "spAsami",
      name: "spAsami",
      avatar: sp_profileInfo.profileImage,
    },
    // sent: true,
    // received: true
  },
];

let temporaryMessages_friend11 = [];

let temporaryMessages_group1 = [
  {
    _id: 30,
    createdAt: "2022-04-27T02:10:29.189Z",
    user: {
      _id: "pcAsami",
      name: "pcAsami",
      avatar: pc_profileInfo.profileImage,
    },
    // sent: true,
    // received: true,
    image: "https://placeimg.com/140/140/any",
  },
  {
    _id: 31,
    text: "Hello developer",
    createdAt: "2022-04-27T02:08:10.189Z",
    user: {
      _id: "spAsami",
      name: "spAsami",
      avatar: sp_profileInfo.profileImage,
    },
    // sent: true,
    // received: true
  },
  {
    _id: 32,
    text: "we are not friend",
    createdAt: "2022-04-27T02:08:10.189Z",
    user: {
      _id: "spAsami",
      name: "spAsami",
      avatar: sp_profileInfo.profileImage,
    },
    // sent: true,
    // received: true
  },
];

let temporaryMessages_group6 = [];

// Chats一覧に表示する、最終メッセージ一覧
function pcGetChats() {
  return [
    {
      direct_chat_room_id: "friend 1",
      friends_user_id: "spAsami",
      friends_nick_name: "spAsami",
      friends_profile_image: sp_profileInfo.profileImage,
      friends_last_message_content: temporaryMessages_friend1[0].text
        ? temporaryMessages_friend1[0].text
        : temporaryMessages_friend1[0].image,
      friends_last_message_creation_date: "2022/3/20",
      unread_count: 3,
    },
    {
      group_chat_room_id: "group 1",
      group_name: "group 1",
      group_image:
        "https://pbs.twimg.com/media/E16OXztUYAIpisv?format=jpg&name=large",
      group_last_message_content: temporaryMessages_group1[0].text
        ? temporaryMessages_group1[0].text
        : temporaryMessages_group1[0].image,
      group_last_message_creation_date: "2022/3/19",
      group_member_user_id: ["pcAsami", "spAsami"],
      unread_count: 2,
    },
  ];
}

function spGetChats() {
  return [
    {
      direct_chat_room_id: "friend 1",
      friends_user_id: "pcAsami",
      friends_nick_name: "pcAsami",
      friends_profile_image: pc_profileInfo.profileImage,
      friends_last_message_content: temporaryMessages_friend1[0].text
        ? temporaryMessages_friend1[0].text
        : temporaryMessages_friend1[0].image,
      friends_last_message_creation_date: "2022/3/20",
      unread_count: 3,
    },
    {
      group_chat_room_id: "group 1",
      group_name: "group 1",
      group_image:
        "https://pbs.twimg.com/media/E16OXztUYAIpisv?format=jpg&name=large",
      group_last_message_content: temporaryMessages_group1[0].text
        ? temporaryMessages_group1[0].text
        : temporaryMessages_group1[0].image,
      group_last_message_creation_date: "2022/3/19",
      group_member_user_id: ["pcAsami", "spAsami"],
      unread_count: 2,
    },
  ];
}

// 会員登録
app.post("/api/signup", (req, res, ctx) => {
  const userId = req.param("userId");
  const mail = req.param("mail");
  const password = req.param("password");
  return res.status(200).send(
    JSON.stringify({
      userId: userId,
    })
  );
});
// userIdがあれば、登録するユーザーIDが使用可能かどうかチェック
app.get(
  "/api/signup/isAvailableUserIdValidation",
  (req, res, ctx) => {
    const userId = req.param("userId");
    // 登録するユーザーIDが使用可能かどうかチェック
    return res.status(200).send(
      JSON.stringify({
        isAvailableUserId: true,
      })
    );
  }
);
// mailがあれば、登録するmailが使用可能かどうかチェック
app.get("/api/signup/isAvailableMailValidation", (req, res, ctx) => {
  const mail = req.param("mail");
  // 登録するmailが使用可能かどうかチェック
  return res.status(200).send(
    JSON.stringify({
      isAvailableMail: true,
    })
  );
});
// ログイン認証
app.post("/api/login", (req, res, ctx) => {
  const mail = req.param("mail");
  const password = req.param("password");
  let userId;
  if (mail === "pcAsami@g.com") {
    userId = "pcAsami";
  }
  if (mail === "spAsami@g.com") {
    userId = "spAsami";
  }
  return res.status(200).send(
    JSON.stringify({
      certificationResult: true,
      userId: userId,
    })
  );
});
// ニックネームまたはグループ名の検索でヒットするユーザーまたはグループ情報の取得
app.get(`/api/users/:user_id/home`, (req, res, ctx) => {
  // userIdの取得
  const userId = req.param("userId");
  // search文言の取得
  const searchText = req.params.search;

  const result = [
    {
      friend: [],
    },
    {
      group: [],
    },
  ];
  let friends;
  if (userId === "pcAsami") {
    friends = pc_friends;
  }
  if (userId === "spAsami") {
    friends = sp_friends;
  }
  for (let i = 0; i < friends.length; i++) {
    if (
      friends[i].friend_nickname &&
      friends[i].friend_nickname.trim().indexOf(searchText.trim()) >
        -1
    ) {
      result[0].friend.push(friends[i]);
    }
  }
  for (let i = 0; i < groups.length; i++) {
    if (
      groups[i].group_name &&
      groups[i].group_name.trim().indexOf(searchText.trim()) > -1
    ) {
      result[1].group.push(groups[i]);
    }
  }
  return res.status(200).send(
    JSON.stringify(
      result
      // [
      // 	{
      // 		"friend": [
      // 			{
      // 				"direct_chat_room_id": "1",
      // 				"friend_use_id": "asami111",
      // 				"friend_profile_image": null,
      // 				"friend_nickname": "検索結果name"
      // 			}
      // 		]
      // 	},
      // 	{
      // 		"group": [
      // 			{
      // 				"group_chat_room_id": "12",
      // 				"group_name": "検索結果グループ",
      // 				"group_image": null)
      // 			}
      // 		]
      // 	}
      // ]
    )
  );
});
// ユーザが所属するグループ一覧
app.get("/api/users/:user_id/groups", (req, res, ctx) => {
  const userId = req.param("userId");
  return res.status(200).send(JSON.stringify(groups));
});
// グループから脱退
app.delete("/api/users/:user_id/groups/leave", (req, res, ctx) => {
  const userId = req.param("userId");
  const groupChatRoomId = req.param("groupChatRoomId");
  return res.status(200).send("");
});
// グループ追加
app.post("/api/users/:user_id/groups/add", (req, res, ctx) => {
  const groupImage = req.param("groupImage");
  const groupName = req.param("groupName");
  const groupMemberUserIds = req.param("groupMemberUserIds");

  // groupChatRoomIdはバックエンドで生成する！
  const groupChatRoomId = _id();

  groups.push({
    group_chat_room_id: "group 6",
    group_name: groupName,
    group_image: groupImage,
    group_member_user_id: groupMemberUserIds,
  });

  return res.status(200).send(
    JSON.stringify({
      group_chat_room_id: groupChatRoomId,
    })
  );
});
// ユーザーの所属するグループ数
app.get("/api/users/:user_id/group-count", (req, res, ctx) => {
  const userId = req.param("userId");
  return res.status(200).send(`${groups.length}`);
});
// ユーザの友達数
app.get("/api/users/:user_id/friend-count", (req, res, ctx) => {
  const userId = req.param("userId");
  let friends;
  if (userId === "pcAsami") {
    friends = pc_friends;
  }
  if (userId === "spAsami") {
    friends = sp_friends;
  }
  return res.status(200).send(`${friends.length}`);
});
// ユーザーの友達一覧
app.get("/api/users/:user_id/friends", (req, res, ctx) => {
  const userId = req.param("userId");
  let friends;
  if (userId === "pcAsami") {
    friends = pc_friends;
  }
  if (userId === "spAsami") {
    friends = sp_friends;
  }
  return res.status(200).send(JSON.stringify(friends));
});
// 友達追加
app.post("/api/users/:user_id/friends", (req, res, ctx) => {
  const friendUserId = req.param("friendUserId");
  const ownUserId = req.param("ownUserId");
  // mock用
  if (ownUserId === "pcAsami") {
    pc_friends.push({
      direct_chat_room_id: "friend 11",
      friend_use_id: "friend 11",
      friend_profile_image:
        "https://pbs.twimg.com/media/EYY7o7FVcAUJRDG?format=jpg&name=large",
      friend_nickname: "friend 11",
    });
  }
  if (ownUserId === "spAsami") {
    sp_friends.push({
      direct_chat_room_id: "friend 11",
      friend_use_id: "friend 11",
      friend_profile_image:
        "https://pbs.twimg.com/media/EYY7o7FVcAUJRDG?format=jpg&name=large",
      friend_nickname: "friend 11",
    });
  }
  return res.status(200).send(
    JSON.stringify({
      direct_chat_room_id: "friend 11",
      friend_use_id: "friend 11",
      friend_profile_image:
        "https://pbs.twimg.com/media/EYY7o7FVcAUJRDG?format=jpg&name=large",
      friend_nickname: "friend 11",
    })
  );
});
// ユーザーIDに紐づくニックネーム、プロフィール画像の取得
app.get(`/api/users/:user_id/profile`, (req, res, ctx) => {
  // userIdの取得
  const userId = req.param("userId");
  if (userId === "pcAsami") {
    return res.status(200).send(JSON.stringify(pc_profileInfo));
  }
  if (userId === "spAsami") {
    return res.status(200).send(JSON.stringify(sp_profileInfo));
  }
});
// プロフィールの更新
app.post("/api/users/:user_id/profile", (req, res, ctx) => {
  const nickName = req.param("nickName");
  const profileImage = req.param("profileImage");

  // 検索可能フラグの引数が存在するかどうか
  const isSetSearchFlag = req.param("isSetSearchFlag");
  const searchFlag = req.param("searchFlag");

  //　ニックネームの更新
  if (nickName) {
    profileInfo.nickName = nickName;
    return res.status(200).send(
      JSON.stringify({
        nickName: nickName,
      })
    );
  }
  // プロフィール画像の更新
  if (profileImage) {
    profileInfo.profileImage = profileImage;
    return res.status(200).send(
      JSON.stringify({
        profileImage: profileImage,
      })
    );
  }
  // 検索可能フラグの更新
  if (isSetSearchFlag) {
    profileInfo.searchFlag = searchFlag;
    return res.status(200).send(
      JSON.stringify({
        searchFlag: searchFlag,
      })
    );
  }
  return res.status(200).send("");
}),
  // ユーザーID検索にヒットしたユーザー情報(プロフィール画像、ニックネーム)
  app.get("/api/users/:user_id/user", (req, res, ctx) => {
    const searchUserId = req.params.searchUserId;
    const userId = req.param("userId");

    // 既に友達になっている場合
    if (searchUserId === "1") {
      return res.status(400).send(
        JSON.stringify({
          already_follow_requested: true,
          exist: true,
          friend_use_id: "pcAsami",
          friend_profile_image: sp_profileInfo.profileImage,
          friend_nickname: "pcAsami",
        })
      );
    } else if (searchUserId === "bb") {
      // 該当ユーザーIDが存在しない場合
      return res.status(400).send(
        JSON.stringify({
          already_follow_requested: false,
          exist: false,
          friend_use_id: null,
          friend_profile_image: null,
          friend_nickname: null,
        })
      );
    } else {
      // まだ友達になっていない場合
      return res.status(200).send(
        JSON.stringify({
          already_follow_requested: false,
          exist: true,
          friend_use_id: "friend 11",
          friend_profile_image: null,
          friend_nickname: "friend 11",
        })
      );
    }
  });
// チャットルーム一覧取得
app.get("/api/users/:user_id/chatRoom", (req, res, ctx) => {
  const searchText = req.params.searchText;
  const userId = req.param("userId");
  const result = [];
  let chats;
  if (userId === "pcAsami") {
    chats = pcGetChats();
  }
  if (userId === "spAsami") {
    chats = spGetChats();
  }
  // ニックネームまたはグループ名の検索でヒットするチャット情報取得
  // 以下はmock甩に、仮配列から検索結果を出力
  if (searchText) {
    for (let i = 0; i < chats.length; i++) {
      if (
        chats[i].friends_nick_name &&
        chats[i].friends_nick_name.indexOf(searchText) > -1
      ) {
        result.push(chats[i]);
      }
      if (
        chats[i].group_name &&
        chats[i].group_name.indexOf(searchText) > -1
      ) {
        result.push(chats[i]);
      }
    }
    return res.status(200).send(JSON.stringify(result));
  }
  // ユーザーIDに紐づくチャットルーム一覧を取得
  if (!searchText) {
    if (userId === "pcAsami") {
      return res.status(200).send(JSON.stringify(pcGetChats()));
    }
    if (userId === "spAsami") {
      chats = spGetChats();
    }
  }
});
// チャットの表示/非表示、削除API
app.post("/api/users/:user_id/chatRoom", (req, res, ctx) => {
  const userId = req.param("userId");
  const directChatRoomId = req.param("directChatRoomId");
  const groupChatRoomId = req.param("groupChatRoomId");
  const update_type = req.param("update_type"); // update_typeに更新
  if (update_type === "Hidden") {
    return res.status(200).send("");
  }
  if (update_type === "Delete") {
    return res.status(200).send("");
  }
});
// チャット履歴取得
app.get("/api/users/:user_id/message", (req, res, ctx) => {
  const chat_room_type = req.param("chat_room_type");
  const chat_room_id = req.param("chat_room_id");

  // 友達とのチャットの場合
  if (chat_room_type === "DirectChatRoomId") {
    if (chat_room_id === "friend 1") {
      return res
        .status(200)
        .send(JSON.stringify(temporaryMessages_friend1));
    }
    if (chat_room_id === "friend 11") {
      return res
        .status(200)
        .send(JSON.stringify(temporaryMessages_friend11));
    }
  }
  // グループチャットの場合
  if (chat_room_type === "GroupChatRoomId") {
    if (chat_room_id === "group 1") {
      return res
        .status(200)
        .send(JSON.stringify(temporaryMessages_group1));
    }
    if (chat_room_id === "group 6") {
      return res
        .status(200)
        .send(JSON.stringify(temporaryMessages_group6));
    }

    return res.status(404).send("not found");
  }
});
// チャット送信
app.post("/api/users/:user_id/message", (req, res, ctx) => {
  const userId = req.param("userId");
  const chat_room_type = req.param("chat_room_type"); // DirectChatRoomId or GroupChatRoomId
  const chat_room_id = req.param("chat_room_id");
  const content_type = req.param("content_type");
  const content = req.param("content");
  const sender_user_id = req.param("sender_user_id");
  // // mockserviceworker甩に以下保持(Rust用にallを削除)
  // const all = req.param("all")

  // // 配列の最初に追加
  // // 本番時は、バックエンドにて詳細実装する
  // if (directChatRoomId === "friend 1") {
  // 	temporaryMessages_friend1 = [all, ...temporaryMessages_friend1]
  // }
  // if (directChatRoomId === "friend 11") {
  // 	temporaryMessages_friend11 = [all, ...temporaryMessages_friend11]
  // }
  // if (groupChatRoomId === "group 1") {
  // 	temporaryMessages_group1 = [all, ...temporaryMessages_group1]
  // }
  // if (groupChatRoomId === "group 6") {
  // 	temporaryMessages_group6 = [all, ...temporaryMessages_group6]
  // }
  // return res.status(200).send("")
});
// 最終既読日時の更新
app.post("/api/users/:user_id/last-read-time", (req, res, ctx) => {
  const user_id = req.param("user_id");
  const chat_room_id = req.param("chat_room_id");
  const content_type = req.param("content_type");
  return res.status(200).send("");
});
// グループメンバーの追加
app.post("/api/users/:user_id/group-member", (req, res, ctx) => {
  const groupChatRoomId = req.param("groupChatRoomId");
  const adduserIds = req.param("adduserIds");
  let newData = [];
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].group_chat_room_id === groupChatRoomId) {
      // 既存のグループメンバーユーザーID配列に新規に追加したメンバーのユーザーIDを追加
      newData = groups[i].group_member_user_id.concat(adduserIds);
      groups[i].group_member_user_id = newData;
    }
  }

  return res.status(200).send(
    JSON.stringify({
      adduserIds: adduserIds,
    })
  );
});
// 該当友達とのdirectChatRoomIdを取得
app.get("/api/users/:user_id/friend", (req, res, ctx) => {
  const friend_user_id = req.params.friend_user_id;
  const userId = req.param("userId");
  // mock甩にfriends配列から取得
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].friend_use_id === friend_user_id)
      return res.status(200).send(
        JSON.stringify({
          direct_chat_room_id: friends[i].direct_chat_room_id,
          already_friend: true, // すでに友達かどうか
        })
      );
  }
  return res.status(200).send(
    JSON.stringify({
      direct_chat_room_id: null,
      already_friend: false,
    })
  );
});
// directChatRoomId/groupChatRoomIdに紐づくメンバーのユーザーIDを取得(自分も含む)
app.get("/api/users/:user_id/chat", (req, res, ctx) => {
  const chat_room_type = req.param("chat_room_type"); // DirectChatRoomId or GroupChatRoomId
  const chat_room_id = req.param("chat_room_id");
  const userId = req.param("userId");
  // グループの場合
  if (chat_room_type === "GroupChatRoomId") {
    let user_ids = [];
    groups.forEach((group) => {
      if (group.group_chat_room_id === chat_room_id) {
        return res.status(200).send(
          JSON.stringify({
            user_ids: group.group_member_user_id,
          })
        );
      }
    });
  }
  // 友達の場合
  if (chat_room_type === "DirectChatRoomId") {
    // 携帯の場合
    if (userId === "pcAsami") {
      pc_friends.forEach((friend) => {
        if (friend.direct_chat_room_id === chat_room_id) {
          return res.status(200).send(
            JSON.stringify({
              user_ids: [friend.friend_use_id, userId],
            })
          );
        }
      });
    }
    // スマホの場合
    if (userId === "spAsami") {
      sp_friends.forEach((friend) => {
        if (friend.direct_chat_room_id === directChatRoomId) {
          return res.status(200).send(
            JSON.stringify({
              user_ids: [friend.friend_use_id, userId],
            })
          );
        }
      });
    }
  }
});

app.listen(3000, function () {
  console.log("A-Chat app listening on port 3000!");
});
