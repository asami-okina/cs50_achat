// libs
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View, Image, Pressable } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

// layouts
import { CONTENT_WIDTH, PROFILE_IMAGE_SIZE, STANDARD_FONT, MAIN_WHITE_COLOR, MAIN_PINK_COLOR, PROFILE_IMAGE_BORDER_RADIUS, MAIN_NAVY_COLOR, MAIN_GRAY_COLOR } from '../../../constants/layout'

export default function ChatBasic({ chatRoomList, setDeleteModalVisible, clickedDeleteCancelMordal, setClickedDeleteCancelMordal, clickedDeleteOkMordal, setClickedDeleteOkMordal, setHiddenModalVisible, clickedHiddenCancelMordal, setClickedHiddenCancelMordal, clickedHiddenOkMordal, setClickedHiddenOkMordal }) {
	// ユーザーID(今後は認証から取得するようにする)
	const userId = "asami11"

	// 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
	const [rowMap, setRowMap] = useState('')
	const [key, setkey] = useState('')
	const [groupChatRoomId, setGroupChatRoomId] = useState('')
	const [directChatRoomId, setDirectChatRoomId] = useState('')

	// HiddenかDeleteどちらをクリックされたか
	const [clickedType, setClickedType] = useState('')

	// 一覧のリストを作成
	const [listData, setListData] = useState(
		chatRoomList.map((_, i) => ({ ..._, key: `${i}` }))
	);

	// chatRoomListの更新
	useEffect(() => {
		if (chatRoomList) {
			setListData(chatRoomList.map((_, i) => ({ ..._, key: `${i}` })))
		}
	}, [chatRoomList])


	// スワップされた該当行をデフォルト状態に戻す
	const closeRow = (rowMap, rowKey) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	// 全体リストから該当のリストを削除
	// rowMap: オブジェクト , rowKey: 削除するindex
	const deleteRow = (rowMap, rowKey) => {
		closeRow(rowMap, rowKey);
		// Reactの差異を比較するのは、オブジェクト同士。そのため、新しくオブジェクトを作成する必要がある
		const newData = [...listData];
		// findIndex: 配列内の指定されたテスト関数に合格する要素がない場合を含め、それ以外は-1を返す
		const prevIndex = listData.findIndex(item => item.key === rowKey);
		newData.splice(prevIndex, 1);
		setListData(newData);
	};

	const renderItem = data => (
		<>
			{/* 友達の場合 */}
			{data.item.friends_user_id && (
				<Pressable style={styles.listWrapperStyle} onPress={() => { console.log("友達押したよ") }}>
					<View style={styles.imageContainerStyle}>
						{data.item.friends_profile_image ? (
							<Image source={data.item.friends_profile_image} style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE, borderRadius: PROFILE_IMAGE_BORDER_RADIUS }} />
						) :
							<View style={styles.circleStyle}></View>
						}
					</View>
					<View style={styles.listSeparateWrapperStyle}>
						<View style={[styles.listSeparateContainer, styles.listSeparateTopContainerStyle]}>
							<Text style={[styles.textStyle, styles.nameStyle]}>{data.item.friends_nick_name}</Text>
							<Text style={[styles.textStyle, styles.lastMessageCreationDateStyle]}>{data.item.friends_last_message_creation_date}</Text>
						</View>
						<View style={styles.listSeparateContainer}>
							<Text style={styles.textStyle}>{data.item.friends_last_message_content}</Text>
							<View style={data.item.unread_count !== 0 ? styles.circleWithUnReadCountContainerStyle : null}>
								<Text style={[styles.textStyle, styles.circleWithUnReadCountStyle]}>{data.item.unread_count}</Text>
							</View>
						</View>
						<View>
						</View>
					</View>
				</Pressable>
			)}
			{/* グループの場合 */}
			{data.item.group_chat_room_id && (
				<Pressable style={styles.listWrapperStyle} onPress={() => { console.log("友達押したよ") }}>
					<View style={styles.imageContainerStyle}>
						{data.item.group_image ? (
							<Image source={data.item.group_image} style={{ width: PROFILE_IMAGE_SIZE, height: PROFILE_IMAGE_SIZE, borderRadius: PROFILE_IMAGE_BORDER_RADIUS }} />
						) :
							<View style={styles.circleStyle}></View>
						}
					</View>
					<View style={styles.listSeparateWrapperStyle}>
						<View style={[styles.listSeparateContainer, styles.listSeparateTopContainerStyle]}>
							<Text style={[styles.textStyle, styles.nameStyle]}>{data.item.group_name}</Text>
							<Text style={[styles.textStyle, styles.lastMessageCreationDateStyle]}>{data.item.group_last_message_creation_date}</Text>
						</View>
						<View style={styles.listSeparateContainer}>
							<Text style={styles.textStyle}>{data.item.group_last_message_content}</Text>
							<View style={data.item.unread_count !== 0 ? styles.circleWithUnReadCountContainerStyle : null}>
								<Text style={[styles.textStyle, styles.circleWithUnReadCountStyle]}>{data.item.unread_count}</Text>
							</View>
						</View>
					</View>
				</Pressable>
			)}
		</>
	);

	// スワップできるようにする
	const renderHiddenItem = (data, rowMap) => (
		<View style={styles.rowBackStyle}>
			{/* deleteボタン */}
			<TouchableOpacity
				style={[styles.backRightBtnStyle, styles.backRightBtnRightStyle]}
				onPress={() => {
					// 確認モーダルを表示
					setDeleteModalVisible(true)
					// 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
					setRowMap(rowMap)
					setkey(data.item.key)
					if (data.item.group_chat_room_id) {
						setGroupChatRoomId(data.item.group_chat_room_id)
					}
					if (data.item.direct_chat_room_id) {
						setDirectChatRoomId(data.item.direct_chat_room_id)
					}
					setClickedType('Delete')
				}}
			>
				<Text style={styles.backTextWhiteStyle}>Delete</Text>
			</TouchableOpacity>
			{/* Hiddenボタン */}
			<TouchableOpacity
				style={[styles.backRightBtn, styles.backRightBtnLeft]}
				onPress={() => {
					// 確認モーダルを表示
					setHiddenModalVisible(true)
					// 削除時のモーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
					setRowMap(rowMap)
					setkey(data.item.key)
					if (data.item.group_chat_room_id) {
						setGroupChatRoomId(data.item.group_chat_room_id)
					}
					if (data.item.direct_chat_room_id) {
						setDirectChatRoomId(data.item.direct_chat_room_id)
					}
					setClickedType('Hidden')
				}}
			>
				<Text style={styles.backTextWhiteStyle}>Hidden</Text>
			</TouchableOpacity>
		</View>
	);

	// 削除時の確認モーダルでCancleの時は該当リストをデフォルト状態に戻す、Okの場合は該当リストを削除する甩に使用
	useEffect(() => {
		// Cancelを押された場合
		if (clickedDeleteCancelMordal || clickedHiddenCancelMordal) {
			// スワイプされた行をデフォルト状態に戻す
			rowMap[key].closeRow();
			// 初期化
			setRowMap('')
			setkey('')
			setClickedDeleteCancelMordal(false)
			setClickedHiddenCancelMordal(false)
			setGroupChatRoomId('')
			setDirectChatRoomId('')
		}
		if (clickedDeleteOkMordal || clickedHiddenOkMordal) {
			// スワイプされた行を削除
			if (clickedType === "Delete") {
				deleteRow(rowMap, key)
				setClickedDeleteOkMordal(false)
				// チャットの削除API実行
			}
			if (clickedType === "Hidden") {
				deleteRow(rowMap, key)
				setClickedHiddenOkMordal(false)
				// チャットの非表示API実行
			}
			// 初期化
			setRowMap('')
			setkey('')
			setGroupChatRoomId('')
			setDirectChatRoomId('')
			setClickedType('')
		}
	}, [clickedDeleteCancelMordal, clickedDeleteOkMordal, clickedHiddenCancelMordal, clickedHiddenOkMordal])

	// グループから脱退
	async function _leaveGroup(userId, groupChatRoomId) {
		try {
			// APIリクエスト
			const bodyData = {
				"groupChatRoomId": groupChatRoomId
			}
			const response = await fetch(`https://a-chat/api/users/${userId}/groups`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(bodyData),
			})
		} catch (e) {
			console.error(e)
		}
	}

	return (
		<View style={styles.containerStyle}>
			<SwipeListView
				data={listData}
				renderItem={renderItem}
				renderHiddenItem={renderHiddenItem}
				rightOpenValue={-150}
				disableRightSwipe={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: MAIN_WHITE_COLOR,
	},
	backTextWhiteStyle: {
		color: MAIN_WHITE_COLOR,
	},
	rowFrontStyle: {
		alignItems: 'center',
		backgroundColor: MAIN_WHITE_COLOR,
		justifyContent: 'center',
	},
	rowBackStyle: {
		alignItems: 'center',
		backgroundColor: MAIN_WHITE_COLOR,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtnStyle: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnRightStyle: {
		backgroundColor: MAIN_PINK_COLOR,
		right: 0,
	},
	listWrapperStyle: {
		flexDirection: "row",
		backgroundColor: MAIN_WHITE_COLOR,
		height: 60,
	},
	circleStyle: {
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		borderRadius: PROFILE_IMAGE_BORDER_RADIUS,
		backgroundColor: MAIN_NAVY_COLOR,
	},
	listSeparateWrapperStyle: {
		marginLeft: 12,
	},
	listSeparateContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		height: 50 / 2,
		width: CONTENT_WIDTH - PROFILE_IMAGE_SIZE - 12, // marginLeftの分引く
	},
	listSeparateTopContainerStyle: {
		alignItems: "flex-end",
	},
	textStyle: {
		fontFamily: STANDARD_FONT,
		color: MAIN_NAVY_COLOR,
		fontSize: 10,
	},
	nameStyle: {
		fontSize: 13,
	},
	lastMessageCreationDateStyle: {
		fontSize: 10,
		color: MAIN_GRAY_COLOR,
	},
	circleWithUnReadCountContainerStyle: {
		height: 20,
		width: 20,
		borderRadius: 50,
		lineHeight: 50,
		backgroundColor: MAIN_NAVY_COLOR,
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	circleWithUnReadCountStyle: {
		color: MAIN_WHITE_COLOR,
	},
	imageContainerStyle: {
		justifyContent: "center",
		alignItems: "center",
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75,
	},
	backRightBtnLeft: {
		backgroundColor: "#A3A3A3",
		right: 75,
	},
	backTextWhite: {
		color: '#FFF',
	},
});
