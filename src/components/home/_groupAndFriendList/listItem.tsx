// libs
import React, { useState } from 'react';
import {
	StyleSheet,
	View,
} from 'react-native';

// childComponents
import Basic from './examples/basic';

// constantsLayout
import { CONTENT_WIDTH, PROFILE_IMAGE_SIZE } from '../../../constants/layout'

export function ListItem({ groupListProps, friendListProps, type }) {
	return (
		<View style={styles.containerStyle}>
			{/* groupの場合 */}
			{groupListProps?.groupList.length !== 0 && groupListProps?.groupList !== undefined && (
				<Basic groupList={groupListProps?.groupList} friendList={null} type={type} />
			)}
			{/* friendの場合 */}
			{friendListProps?.friendList.length !== 0 && friendListProps?.friendList !== undefined && (
				<Basic groupList={null} friendList={friendListProps?.friendList} type={type} />
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: '#feffff',
		marginTop: 12,
	}
});
