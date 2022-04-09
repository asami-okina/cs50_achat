import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView,Text } from 'react-native';
import { fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount, fetchFriendList, fetchFriendCount } from '../api/api'
import { Footer } from '../components/common/footer'

// constantsStyles
import { constantsStyles } from '../constants/styles'

export function Chats({navigation}) {

	return (
		<View>
			<Text>Chats</Text>
			{/*フッター */}
			<Footer navigation={navigation}/>
		</View>
	);
}
