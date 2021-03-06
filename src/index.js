import React from 'react'
import PropsTypes from 'prop-types'
import { connect } from 'react-redux'
import {
	addNavigationHelpers,
	StackNavigator
} from 'react-navigation'

import SplashScreen from './pages/splash'
import LoginScreen from './pages/login'
import RegisterScreen from './pages/login/register'
import CabangScreen from './pages/login/cabang'
import HomeManagerScreen from './routes/homeManager'
import HomeAdminScreen from './routes/homeAdmin'
import HomeScreen from './routes/home'
import ScanQRScreen from './pages/sale/scanQR'
import ProductScreen from './pages/inventory/product'
import IngredientsScreen from './pages/inventory/ingredients'
import BahanBakuScreen from './pages/inventory/bahanBaku'
import SearchScreen from './pages/sale/search'


const StackNavigatorConfig = {
	// headerMode: 'none'
}


export const AppNavigator = StackNavigator({
	Splash: {
		screen: SplashScreen,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: LoginScreen,
		navigationOptions: {
			header: null
		}
	},
	Register: {
		screen: RegisterScreen,
		navigationOptions: {
			// header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	Cabang: {
		screen: CabangScreen,
		navigationOptions: {
			// header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	HomeManager: {
		screen: HomeManagerScreen,
		navigationOptions: {
			header: null
		}
	},
	HomeAdmin: {
		screen: HomeAdminScreen,
		navigationOptions: {
			header: null
		}
	},
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			header: null
		}
	},
	ScanQR: {
		screen: ScanQRScreen,
		navigationOptions: {
			header: null
		}
	},
	Product: {
		screen: ProductScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	Ingredients: {
		screen: IngredientsScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	BahanBaku: {
		screen: BahanBakuScreen,
		navigationOptions: {
			// header: null
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	},
	Search: {
		screen: SearchScreen,
		navigationOptions: {
			header: null,
			headerTintColor: 'white',
			headerStyle: {
				backgroundColor: '#6ecbe0'
			}
		}
	}
}, StackNavigatorConfig)


module.exports = AppNavigator

/*const AppWithNavigationState = ({ dispatch, nav }) => (
	<AppNavigator navigation = { addNavigationHelpers({ dispatch, state: nav })}/>
)*/

/*AppWithNavigationState.propsTypes = {
	dispatch: PropsTypes.func.isRequired,
	nav: PropsTypes.object.isRequired
}*/

/*const mapStateToProps = state => ({
	nav: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)*/