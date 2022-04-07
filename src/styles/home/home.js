import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // ヘッダー
      containerStyle: {
          flex: 1,
          backgroundColor: "#1B1C56",
      },
			mainWrapperStyle: {
				flex: 1,
			},
      headContainerStyle: {
        width: "100%",
        height: "10%",
        height: 40,
        backgroundColor: "#1B1C56",
      },
      headMessageContainerStyle: {
          backgroundColor: "#feffff",
          alignItems: 'center',
      },
      headMessageTextStyle: {
        fontSize: 50,
        fontFamily: "AlfaSlabOne_400Regular",
        color: "#1B1C56",
        marginBottom: 32,
      },
      // main部分
      mainContainerStyle: {
          height: 100,
          backgroundColor: "#feffff",
          borderTopLeftRadius: 50,
          alignItems: 'center',
      },
      // 検索フォーム
      searchBoxStyle: {
        flex: 1,
        backgroundColor: "#feffff",
      },
      searchWrapperStyle: {
          flex: 1,
          alignItems: "center",
          paddingBottom: 10,

      },
      searchContainerStyle: {
				marginTop: 32,
      },
      searchTitleStyle: {
          fontFamily: "ABeeZee_400Regular_Italic",
          color: "#262626",
          marginBottom: 5,
      },
      searchIconStyle: {
          width: 24,
          height: 24,
          marginRight: 10,
          marginLeft: 10,
      },
      searchViewStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F6F7FB',
          borderWidth: 0.5,
          height: 60,
          borderRadius: 5,
          width: 300,
          borderColor: "#F6F7FB",
      },
      searchContentStyle: {
				paddingLeft: 10,
        flex: 1
      },
      // 入力が間違っている場合のフォーム枠線の色
      inputIncorrectBorderColorStyle:{
        borderWidth: 2,
        borderColor: "#ED195E",
      },
      // キーボードに「完了」を表示
      completeBoxStyle: {
          width: 60,
          alignItems: "center",
          padding: 10,
      },
      completeTextStyle: {
          fontSize: 18,
          fontWeight: "bold",
          color: "hsl(210, 100%, 60%)"
      },
      // パスワードアイコンの表示/非表示
      passwordIconStyle: {
        marginRight: 10
      },
      // 説明文
      descriptionBoxStyle:{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#feffff",
        paddingBottom: 10,
      },
      descriptionWrapperStyle: {
      },
      descriptionContainerStyle: {
        flexDirection: "row",
        width: 300,
      },
      descriptionTextStyle: {
        color: "#262626",
        fontSize: 12,
        overflow: "visible"
      },
      // 共通説明文のアイコンの大きさ
      descriptionIconStyle:{
        marginRight: 10,
        width: 12,
        height: 12,
      },
      // 画面下部分
      bottomStyle: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        backgroundColor: "#feffff",
      },
      buttonContainerStyle: {
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B1C56",
          width: 300,
          height: 60,
          borderRadius: 10,
          fontSize: 18,
      },
      buttonContainerInvalidStyle:{
        backgroundColor: "#C5C5C7",
      },
      buttonTextStyle: {
          color: "#feffff",
          fontFamily: "ABeeZee_400Regular_Italic",
      },
      toLoginStyle: {
          marginTop: 10,
          height: "5%",
          flexDirection: "row"
      },
      toLoginTextStyle: {
          fontFamily: "ABeeZee_400Regular_Italic",
      },
      toLoginTextLinkStyle: {
          color: "#ED195E",
          marginLeft: 10,
      },
			groupAndFriendWrapperStyle: {
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#feffff"
			},
			groupAndFriendContainerStyle: {
				display: "flex",
				justifyContent: "center",
				backgroundColor: "#feffff",
				width: 300,
			},
			topContainerStyle: {
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "space-between",
			},
			iconsBoxStyle: {
				flexDirection: "row",
				justifyContent: "space-between",
				width: "40%",
			},
			plusIconStyle: {
				width: 24,
				height: 24,
			},
			openIconStyle: {
				width: 24,
				height: 24,
			},
			titleStyle: {
				fontFamily: "MPLUS1p_700Bold",
				fontSize: 36,
			},
			countStyle: {
				fontFamily: "MPLUS1p_400Regular",
				fontSize: 36,
			},
			listWrapperStyle: {
				height: 60,
				width: 300,
				display: "flex",
				justifyContent: "center",
				marginBottom: 5,
			},
			listItemContainerStyle: {
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			},
			profileImageStyle: {
				width: 50,
				height: 50,
				borderRadius: 50
			},
			listItemNameStyle: {
				fontFamily: "ABeeZee_400Regular",
				marginLeft: 12,
			},
			footerStyle: {
				height: 60,
				backgroundColor: "#1B1C56",
				backgroundColor: "red",
				flexDirection: "row"
			},
			footerItemStyle:{
				flex: 1,
				backgroundColor: "#1B1C56",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			},
			footerTextStyle: {
				fontFamily: "ABeeZee_400Regular",
				color: "#feffff"
			},
			paddingStyle: {
				flex: 1,
				backgroundColor: "yellow"
			}
  });
