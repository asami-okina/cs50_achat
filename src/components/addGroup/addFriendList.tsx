import React, { useEffect, useRef, useLayoutEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { CONTENT_WIDTH } from '../../constants/layout'

import { AddFriendListItem } from './_addFriendList/addFriendListItem'

export function AddFriendList({
	selectedFriendList
}) {
	return (
		<View style={styles.wrapperStyle}>
			<View style={styles.containerStyle}>
				{/* 横スクロールで常に右端に自動スクロール */}
				<ScrollView horizontal={true} ref={ref => { this.scrollView = ref }} onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
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
