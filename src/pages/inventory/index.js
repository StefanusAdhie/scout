import React from 'react'
import {
	Alert,
	AsyncStorage,
	Dimensions,
	Keyboard,
	Modal,
	View,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native'
const { width, height } = Dimensions.get('window')

import { connect } from 'react-redux'
import {
	localStorage,
	addCategory,
	deleteCategory
} from '../../redux/actions'

import {
	Button,
	ButtonIcons,
	MyModal,
	Touchable
} from '../../components'


class InventoryScreen extends React.Component {
	static navigationOptions = ({ navigation }) => ({
		headerLeft: (
			<ButtonIcons
				onPress = { () => { navigation.navigate('DrawerOpen') }}
				name = 'md-menu'
				color = 'white'
				size = { 30 }/>
		)
	})

	state = {
		keyboard: false,
		modalVisible: false,

		category: null
	}

	_addCategory() {
		this._setModalVisible(false)
		this.props.dispatchAddCategory(this.state.category)
		this.setState({ category: null })
	}

	_deleteCategory(content, index) {
		Alert.alert(null, 'Anda yakin akan menghapus category '+ content.category,
			[
				{ text: 'Yakin', onPress: () => this.props.dispatchDeleteCategory(index) },
				{ text: 'Batal' }
			])
	}

	render() {
		return(
			<View style = { styles.container }>
				<MyModal
					visible = { this.state.modalVisible }
					onRequestClose = { this._setModalVisible.bind(this, false) }>
					<View style = {{ flex: 1, width: width - 20, height: height / 4, padding: 5, borderRadius: 5, backgroundColor: 'white' }}>
						<View style = { styles.content }>
							<View style = {{ flex: 2 }}>
								<TextInput
									autoCapitalize = 'words'
									returnKeyType = 'done'
									onChangeText = { (text) => this.setState({ category: text })}
									onSubmitEditing = { this._addCategory.bind(this) }
									placeholder = 'category'
									value = {this.state.category}/>
							</View>
						</View>
						
						<View style = { styles.content }>
							<View style = { styles.row }>
								<Button
									onPress = { () => this.setState({ category: null })}
									name = 'Clear'/>

								<Button
									onPress = { this._addCategory.bind(this) }
									name = 'Add'/>
							</View>
						</View>
					</View>
				</MyModal>

				<ScrollView style = {{ flex: 1 }}>
					{this.props.category.map((content, index) => {
						return (
							<View
								key = { index }
								style = { styles.category }>
								<Touchable
									style = {{ flex: 1, flexDirection: 'row' }}
									onPress = { () => this.props.navigation.navigate('Category', { index: index, content: content }) }>
									<Text> {index + 1}. </Text>
									<Text> {content.category} </Text>
								</Touchable>

								<Touchable
									style = {{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center' }}
									onPress = { this._deleteCategory.bind(this, content, index) }>
									<Text> X </Text>
								</Touchable>
							</View>
						)
					})}
				</ScrollView>

				<View style = {{height: 45 }}/>

				{this.state.keyboard ?
					null
					:
					<View style = { styles.stickyBottom }>
						<Button
							onPress = { this._setModalVisible.bind(this, true) }
							name = 'Add Category'/>
					</View>
				}
			</View>
		)
	}

	_setModalVisible(visible) {
		this.setState({
			modalVisible: visible
		})
	}

	_keyboardDidShow() {
		this.setState({
			keyboard: true
		})
	}

	_keyboardDidHide() {
		this.setState({
			keyboard: false
		})
	}

	componentWillMount() {
		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow.bind(this))
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide.bind(this))
	}

	componentDidMount() {
		AsyncStorage.getItem('@Data', (err, resData) => {
			if(err) {
				return state
			}

			if(resData == null) {
				return true
			} else {
				this.props.dispatchLocalStorage(JSON.parse(resData))
			}
		})
	}

	componentWillUnmount() {
		this.keyboardDidShowListener.remove()
		this.keyboardDidHideListener.remove()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 5,
		backgroundColor: 'white'
	},
	content: {
		flex: 1,
		justifyContent: 'center'
	},
	row: {
		flexDirection: 'row'
	},
	stickyBottom: {
		position: 'absolute',
		left: 5,
		right: 5,
		bottom: 5
	},
	category: {
		flex: 1,
		flexDirection: 'row',
		padding: 5,
		marginTop: 2.5,
		marginBottom: 2.5,
		borderRadius: 5,
		borderWidth: 0.5,
		borderColor: 'darkgrey',
		backgroundColor: '#ccc'
	}
})


function mapStateToProps (state) {
	return {
		category: state.category.data
	}
}

function mapDispatchToProps (dispatch) {
	return {
		dispatchLocalStorage: (data) => dispatch(localStorage(data)),
		dispatchAddCategory: (data) => dispatch(addCategory(data)),
		dispatchDeleteCategory: (data) => dispatch(deleteCategory(data))
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(InventoryScreen)