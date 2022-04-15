import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CONTENT_WIDTH } from '../../constants/layout'

import { AddFriendListItem } from './_addFriendList/addFriendListItem'

export function AddFriendList({
	selectedFriendList
}) {
	// refの生成
	const scrollViewRef = useRef<any>();
	return (
		<View style={styles.wrapperStyle}>
			<View style={styles.containerStyle}>
				{/* 横スクロールで常に右端に自動スクロール */}
				<ScrollView
					ref={scrollViewRef}
					onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
					horizontal={true} // スクロールバーを水平方向にする
					showsHorizontalScrollIndicator={false} // 水平スクロールバー非表示
				>
					{selectedFriendList.length !== 0 && selectedFriendList !== undefined && selectedFriendList.map((list) => {
						return <AddFriendListItem list={list} key={list.key} />
					})}
				</ScrollView>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapperStyle: {
		flex: 1,
		alignItems: "center",
		marginBottom: 10,
		minHeight: 80,
	},
	containerStyle: {
		width: CONTENT_WIDTH,
		marginTop: 5,
		height: 80,
		flexDirection: "row",
		alignItems: "center",
	},
})
