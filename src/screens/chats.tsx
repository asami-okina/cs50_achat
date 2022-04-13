import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, KeyboardAvoidingView,Text } from 'react-native';
import { fetchNickNameOrGroupNameBySearchForm, fetchGroupList, fetGroupCount, fetchFriendList, fetchFriendCount } from '../api/api'
import { Footer } from '../components/common/footer'

// constantsCommonStyles
import { constantsCommonStyles } from '../constants/styles/commonstyles'

export function Chats({navigation}) {

	return (
		<View>
			<Text>Chats</Text>
			{/*フッター */}
			<Footer navigation={navigation}/>
		</View>
	);
}
