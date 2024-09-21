// USER SIDE APIS //
//export const BASE_URL = 'http://192.168.0.101:3000/api'; //local server
// export const BASE_URL = 'https://fejora-api-prod.herokuapp.com/api' //production server
export const BASE_URL = 'https://fejora-api-6861fb0c9a3a.herokuapp.com/api/v1'; //staging server
export const LOGIN_URL = "/user/trader/login";
export const REGISTER_URL = "/user/trader/sign-up";
export const VERIFY_OTP = "/user/trader/verify-otp";
export const RESEND_OTP = "/user/trader/resend-otp";
export const GET_HOME_SCREEN_DATA = "/user/trader/home-screen";
export const GET_NEWS = "/get-news";
export const GET_CARDLIST = "/user/trader/get-cards";
export const GET_STARTING_CODES_OF = "/get-starting-codes?title=";
export const POST_CHECK_CARD_RATE = "/user/trader/check-rate";
export const POST_USER_TRADE = "/user/trader/add-trade";
export const GET_TRADES_BY_STATUS_AND_PAGE_NO = "/user/trader/get-trades?";
export const POST_CHANGE_PASSWORD = "/user/change-password";
export const GET_PROFILE = "/user/trader/get-profile";
export const GET_BANK_NAMES = "/user/trader/fetch-banks";
export const POST_EDIT_BANK_DETAILS = "/user/trader/edit-bank-details";
export const GET_SETTINGS = "/get-settings";
export const POST_WITHDRAW_AMOUNT = "/user/trader/create-withdrawal";
export const GET_WITHDRAWAL_TRANSACTIONS = "/user/trader/get-withdrawal-transactions";
export const GET_TRANSACTION_HISTORY = "/user/trader/get-transactions";
export const POST_RETRY_CARD = "/user/trader/retry-giftcard";
export const GET_DATA_AIRTIME_BUNDLE = "/user/trader/fetch-data-billers";
export const GET_GOTV_DSTV_PLANS = "/user/trader/fetch-dstv-gotv-billers";
export const POST_CREATE_DSTV_GOTV_BILL = "/user/trader/create-dstv-gotv-bill";
export const POST_CREATE_DATA_AIRTIME_BILL = "/user/trader/create-data-airtime-bill";
export const USER_LOGOUT = '/user/trader/logout'


export const SIGN_URL = BASE_URL + '/users/register';
export const GET_WALLET_URL = BASE_URL + '/wallet'; //to get user wallet
export const UPDATE_WALLET_BAL = BASE_URL + '/wallet/updatewallet';
export const UPDATE_WALLET_BALANCE_ON_TRADE =
  BASE_URL + '/wallet/updatewalletontrade';
export const GET_USER_DETAILS_URL = BASE_URL + '/users';
export const EDIT_BANK_DETAILS_URL = BASE_URL + '/users/bank-update';
export const EDIT_USER_DETAILS_URL = BASE_URL + '/users/update';
export const GET_BONUS_LIST_URL = BASE_URL + '/bonus';
export const DISPLAY_BONUS_LIST = BASE_URL + '/bonus/displaybonus';
export const GET_NEWS_URL = BASE_URL + '/news';
export const ADD_NEWS_URL = BASE_URL + '/news';
export const DELETE_NEWS_URL = BASE_URL + '/news';
export const CREATE_TRANSACTION = BASE_URL + '/transaction';
export const CREATE_TRADE = BASE_URL + '/trade';
export const GIFTCARD_URL = BASE_URL + '/giftcard';
export const GET_TRADE = BASE_URL + '/trade/getTrade';
export const UPDATE_STATS = BASE_URL + '/stats'; //for updating the stats
export const GET_STATS = BASE_URL + '/stats'; //for getting the stats
export const UPDATE_ON_RETRY = BASE_URL + '/trade/onretryupdate';
export const UPDATE_ON_SWITCH = BASE_URL + '/trade/onswitchupdate';
export const GET_TRANSACTION_BY_ID = BASE_URL + '/transaction/history';
export const GET_TRANS_COUNT = BASE_URL + '/transaction/getTransCount';
export const GET_PENDING_WITHDRAWAL_COUNT =
  BASE_URL + '/transaction/getPendingCount';
export const GET_DECLINED_WITHDRAWAL_COUNT =
  BASE_URL + '/transaction/getDeclinedCount';
export const GET_COMPLETED_WITHDRAWAL_COUNT =
  BASE_URL + '/transaction/getCompletedCount';

export const GET_PENDING_WITHDRAWAL_COUNT_USER =
  BASE_URL + '/transaction/getPendingCountUser';

export const GET_DECLINED_WITHDRAWAL_COUNT_USER =
  BASE_URL + '/transaction/getDeclinedCountUser';

export const GET_PENDING_WITHDRAWAL =
  BASE_URL + '/transaction/pendingwithdrawalhistory';

export const GET_ALL_PENDING_WITHDRAWALS_BY_ID =
  BASE_URL + '/transaction/pendingwithdrawals';

export const GET_ALL_PENDING_WITHDRAWAL =
  BASE_URL + '/transaction/getallpending';

export const CREATE_WITHDRAW = BASE_URL + '/transaction/withdrawal';

export const GET_GIFTCARD_BY_ID = BASE_URL + '/giftcard/getbyid';
export const CHANGE_PASSWORD = BASE_URL + '/users/update-password';

export const AIRTIME_AND_DATA_PAYMENTS =
  BASE_URL + '/transaction/airtime-data-payments';

export const DSTV_GOTV_PAYMENTS = BASE_URL + '/transaction/dstv-gotv-payments';

export const GET_BILLERS = BASE_URL + '/transaction/getbillers';

export const GET_CABLE_BILLERS = BASE_URL + '/transaction/getdstv-gotv-billers';

export const GET_BANKS = BASE_URL + '/transaction/getBanks';

export const VERIFY_BANK_ACCOUNT = BASE_URL + '/transaction/resolvebankaccount';

export const GET_STATUS = BASE_URL + '/users/getstatus';

export const GET_OUR_RATES = BASE_URL + '/giftcard/getourrates';

export const RESET_PASSWORD = BASE_URL + '/users/reset-pass';
export const VERIFY_CODE = BASE_URL + '/users/verify-code';
export const SET_NEW_PASS = BASE_URL + '/users/set-newpass';

export const ONGOING_COUNT = BASE_URL + '/trade/ongoingcount';
export const COMPLETED_COUNT = BASE_URL + '/trade/completedcount';
// ADMIN SIDE APIS //

export const GET_ALL_USERS_URL = BASE_URL + '/users/all';
export const DELETE_USER_URL = BASE_URL + '/users/delete';
export const BAN_USER_URL = BASE_URL + '/users/ban-user';
export const REMOVE_FCM = BASE_URL + '/users/removefcm';
export const SET_FCM = BASE_URL + '/users/setfcm';

export const UNBAN_USER_URL = BASE_URL + '/users/unban-user';
export const GET_WITHDRAWAL_URL = BASE_URL + '/transaction/getalltransactions';
export const EDIT_USER_ROLE = BASE_URL + '/users/edit-role';
export const ADD_BONUS_LIST_URL = BASE_URL + '/bonus';
export const UPDATE_BONUS_STATUS = BASE_URL + '/bonus/updatestatus';
export const SETTING_DETAILS = BASE_URL + '/settings/createupdatesettings';
export const SETTING_TOGGLE = BASE_URL + '/settings/toggleothers';
export const GET_SETTING = BASE_URL + '/settings';

export const GIVEAWAY_SETTING_URL = BASE_URL + '/giveaway';
export const USER_TRANSACTION_URL = BASE_URL + '/users/transcationlist';
export const CHANGE_TRANSACTION_STATUS_URL = BASE_URL + '/transaction';
export const USER_STATISTICS_URL = BASE_URL + '/users/tradingstack';
export const SEND_NOTIFICATION_URL = BASE_URL + '/notification';
export const GET_NOTIFICATION_URL = BASE_URL + '/notification';
export const RATE_URL = BASE_URL + '/rate';
export const GET_RATE_BY_ID = BASE_URL + '/rate';
export const RATE_STATUS = BASE_URL + '/rate/updateratestatus';
export const ADD_RATE_TO_EXISTING = BASE_URL + '/rate/addratetoexisting';
export const CARD_URL = BASE_URL + '/card';
export const TRADE_URL = BASE_URL + '/trade/getall'; //get all trades
export const ALL_TRADES_STATS = BASE_URL + '/trade/alltradesforstats'; //get all trades
export const GET_USER_ID = BASE_URL + '/users'; //get users by id

export const DELETE_RATE_FROM_CARD = BASE_URL + '/rate/deleteratefromcard';

export const UPDATE_TRADE = BASE_URL + '/trade'; //updates the status of the card inside the trade.

export const UPDATE_TRADESTATUS = BASE_URL + '/trade/updatetradestatus';

export const UPDATE_MODERATORSTATUS = BASE_URL + '/trade/updatemoderatorstatus';

export const UPDATE_DECLINE_STATUS = BASE_URL + '/trade/updatedeclinestatus';

export const UPDATE_DISABLE = BASE_URL + '/card/updatecardstatus';

export const GET_CARDS_BY_ID = BASE_URL + '/card/getcardsbyid';

export const ADD_CODES = BASE_URL + '/cardcodes';

export const GET_CODES = BASE_URL + '/cardcodes';

export const DELETE_ALL_GIFTCARDS = BASE_URL + '/giftcard/oncanceldelete';

export const DELETE_ADMIN_CARD = BASE_URL + '/card/deletecardadmin';

export const GET_TRADE_COUNTER = BASE_URL + '/tradecounters';

export const GET_ALL_TRADE_COUNTER = BASE_URL + '/tradecounters/getallcounters';

export const UPDATE_TRADE_COUNTER =
  BASE_URL + '/tradecounters/updatecounterwithbonusid';

export const UPDATE_COUNTER_AUTO = BASE_URL + '/tradecounters/updateauto';

export const UPDATE_TRADE_COUNTER_VALUE =
  BASE_URL + '/tradecounters/updatecounterswithvalue';

export const UPDATE_ADMIN_NAME = BASE_URL + '/transaction/updateprocessedby';

export const ADD_TOP_RATE = BASE_URL + '/toprates';
export const GET_TOP_RATE = BASE_URL + '/toprates';
export const UPDATE_TOP_RATE = BASE_URL + '/toprates/update';
export const GET_ALL_WALLETS = BASE_URL + '/wallet/getallwallets';

export const GET_BY_trade_id = BASE_URL + '/trade/getbytradeid';

export const CUSTOMER_SUPPORT_GUEST = BASE_URL + '/users/contactsupportguest';

export const GET_ALL_COMPLETED = BASE_URL + '/trade/allcompletedcount';
export const GET_ALL_ONGOING = BASE_URL + '/trade/allongoingcount';
export const GET_MODERATOR_ONGOING =
  BASE_URL + '/trade/getmoderatorongoingcount';
export const GET_ALL_PENDING = BASE_URL + '/trade/allpendingcount';

export const GET_BONUS_USERS_REACHED =
  BASE_URL + '/tradecounters/getpastbonusreached';
export const GET_BONUS_USERS_SELECTED =
  BASE_URL + '/tradecounters/getpastbonusselected';

export const SEARCH_USER_BY_USERNAME = BASE_URL + '/users/searchByUsername';
