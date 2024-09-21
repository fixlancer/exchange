import React, { Component } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../ui/screens/LandingScreen/LandingScreen';
import SignInScreen from '../ui/screens/SignInScreen/SignInScreen';
import CreateAccountScreen from '../ui/screens/CreateAccountScreen/CreateAccountScreen';
import ForgetPasswordScreen from '../ui/screens/ForgetPasswordScreen/ForgetPasswordScreen';
import TransactionHistory from '../ui/screens/TransactionHistoryScreen/Index';

import UserMenu from '../ui/screens/OtherScreen/UserMenu/UserMenu';
import OurRate from '../ui/screens/OtherScreen/OurRate/OurRate';
import ChangePassword from '../ui/screens/OtherScreen/ChangePassword/ChangePassword';
import EditProfile from '../ui/screens/OtherScreen/EditProfile/EditProfile';
import RetryCard from '../ui/screens/RetryCard/RetryCard';

import EditModal from '../ui/screens/UploadGiftCard/EditCard/EditModal';
import EditGiftCard from '../ui/screens/UploadGiftCard/EditCard/EditGiftCard';

import UploadGiftCard from '../ui/screens/UploadGiftCard/Index';
import WithdrawStatus from '../ui/screens/Withdrawal/WithdrawStatus';
import Withdrawal from '../ui/screens/Withdrawal/Withdrawal';

import PastBonus from '../ui/screens/DashBoard/PastBonusList';
import BonusDash from '../ui/screens/DashBoard/BonusDash';

import DashBoard from '../ui/screens/DashBoard/Dashboard';
import FirstTimer from '../ui/screens/DashBoard/FirstTimer';
// import NavigatorScreen from '../ui/screens/NavigatorScreen/NavigatorScreen';
import SelectGiftCard from '../ui/screens/SelectGiftCard/SelectGiftCard';
import AirtimeData from '../ui/screens/AirtimeData/AirtimeData';
import DstvData from '../ui/screens/DstvData/DstvData';
import TradeSuccessfull from '../ui/screens/TradeSuccessfull/TradeSuccessfull';
import TradeSuccesfullScreen2 from '../ui/screens/TradeSuccesfullScreen2/TradeSuccesfullScreen2';
import SellBitcoinScreen1 from '../ui/screens/SellBitcoinScreen/SellBitcoinScreen1';
import SellBitcoin from '../ui/screens/SellBitcoin/Index';
import BtcTransactions from '../ui/screens/BtcTransactions/BtcTransactions';
import Trades from '../ui/screens/Trades/Trades';
import tradeCardDetails from '../ui/screens/Trades/CardDetails/Index';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TransDetails from '../ui/screens/TransactionHistoryScreen/CardDetails/Index';
import ResetCode from '../ui/screens/ForgetPasswordScreen/ResetCode';
import ResetPassword from '../ui/screens/ForgetPasswordScreen/ResetPassword';


import Settings from '../ui/screens/Settings/Index';
import HelpCenter from '../ui/screens/Settings/HelpCenter';
import Security from '../ui/screens/Settings/Security';
import SwapCrypto from '../ui/screens/Crypto/Swap/Index';
import Deposit from '../ui/screens/Crypto/Deposit/Deposit';
import WithdrawCrypto from '../ui/screens/Crypto/Deposit/Withdraw';
import PairChart from '../ui/screens/Crypto/PairChart';
import Success from '../ui/screens/Success/Index';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

const Routes = ({}) => {
  return (
    <Stack.Navigator
      // initialRouteName="SplashScreen"
      initialRouteName="DashBoard"
      screenOptions={{
        headerShown: false,
      }}>
        
      {/* <Stack.Screen name="NavigatorScreen" component={NavigatorScreen} /> */}
      <Stack.Screen name="LandingScreen" component={LandingScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
      />
      <Stack.Screen
        name="ForgetPasswordScreen"
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name="ResetPassword"
        component={ResetPassword} />
      <Stack.Screen name="ResetCode"
        component={ResetCode} />
      <Stack.Screen
        name="TransactionHistory"
        component={TransactionHistory}
      />
      <Stack.Screen
        name="BtcTransactions"
        component={BtcTransactions}
      />
      <Stack.Screen name='TransDetails' component={TransDetails} />
      <Stack.Screen name="UserMenu" component={UserMenu} />
      <Stack.Screen
        name="OurRate"
        component={OurRate}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="WithdrawStatus" component={WithdrawStatus} />
      <Stack.Screen name="Withdrawal" component={Withdrawal} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen name="SelectGiftCard" component={SelectGiftCard} />
      <Stack.Screen name="PastBonus" component={PastBonus} />
      <Stack.Screen name="BonusDash" component={BonusDash} />
      <Stack.Screen name="DashBoard" component={DashBoard} />

      
      <Stack.Screen name="Settings" component={Settings} /> 
      <Stack.Screen name="SwapCrypto" component={SwapCrypto} /> 
      <Stack.Screen name="PairChart" component={PairChart} /> 
      <Stack.Screen name="Deposit" component={Deposit} /> 
      <Stack.Screen name="WithdrawCrypto" component={WithdrawCrypto} /> 
      <Stack.Screen name="HelpCenter" component={HelpCenter} />	  
      <Stack.Screen name="Security" component={Security} />	
      <Stack.Screen name="Success" component={Success} />	


	  
      <Stack.Screen name="FirstTimer" component={FirstTimer} />
      <Stack.Screen name="AirtimeData" component={AirtimeData} />

      <Stack.Screen name="DstvData" component={DstvData} />
      <Stack.Screen name="TradeSuccessfull" component={TradeSuccessfull} />

      <Stack.Screen
        name="TradeSuccesfullScreen2"
        component={TradeSuccesfullScreen2}
      />
	  
      <Stack.Screen name="SellBitcoinScreen1" component={SellBitcoinScreen1} />

      <Stack.Screen name="EditModal" component={EditModal} />
      <Stack.Screen name="EditGiftCard" component={EditGiftCard} />
      <Stack.Screen name="RetryCard" component={RetryCard} />
      <Stack.Screen name="UploadGiftCard" component={UploadGiftCard} />
      <Stack.Screen name="SellBitcoin" component={SellBitcoin} />
      <Stack.Screen name="Trades" component={Trades} />
      <Stack.Screen name="tradeCardDetails" component={tradeCardDetails} />

    </Stack.Navigator>
  );
};
export default Routes;