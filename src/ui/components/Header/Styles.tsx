import { StyleSheet, Dimensions, Platform } from 'react-native';
import { scale, moderateScale, verticalScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('screen');



const newStyle = (theme) => {
    return StyleSheet.create({
    container: {
        backgroundColor: theme.dark ? '#343434' : '#fff',
        width: '100%',
        height: height,
        flex: 1,
        //#7E178E
    },

    header: {
        height: 'auto',
        width: '100%',
        paddingTop: 20,
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
        // borderBottomColor:'#ddd',
        // borderBottomWidth: StyleSheet.hairlineWidth,
    },


    newModalHeader: {
        width: '100%', height: 'auto', paddingTop: 10, paddingBottom: 10, marginBottom: 0, paddingHorizontal: 15,
    },

    modalHeader: {
        justifyContent: 'center', alignItems: 'center', width: '100%', height: 'auto', paddingBottom: 10, marginBottom: 10
    },

    modalHeader2: {
        paddingHorizontal: 15, paddingTop: 20, paddingBottom: 0,
    },


    modalLine: {
        height: 4, width: 30, borderRadius: 8, backgroundColor: '#ddd', marginBottom: 15, alignSelf: 'center'
    },

    lineBottomLight: {
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    lineBottomDark: {
        borderBottomColor: '#ddd',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },


    borderWidthLight: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#f2f2f2',
    },

    borderWidthDark: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#ddd',
    },

    borderDark: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor:  theme.dark ? '#333333' : '#b0b0b0',
    },

    bgScroll: {
        width: '100%', height: '100%', backgroundColor: '#fff',
        //  borderTopLeftRadius:30, borderTopRightRadius: 30,

    },

    bgCurve: {
        width: '100%', height: 15, borderTopLeftRadius: 30, borderTopRightRadius: 30,
    },


    bgGrey: {
        backgroundColor: '#f3f5f9',
    },

    bgGreen: {
        backgroundColor: '#1cc88a',
    },

    bgWhite: {
        backgroundColor: theme.dark ? '#1c1c1c' : '#fff',
    },

    bgLightGrey: {

        backgroundColor: '#fafafa',
    },


    Row: {
        flexDirection: 'row',
    },

    RowB: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    textCenter: {
        textAlign: 'center',
    },

    textRight: {
        textAlign: 'right',
    },

    textWhite: {
        color: '#fff',
    },

    textDark: {
        color: theme.dark ? '#ffffff' : '#343434'
    },

    textGrey: {
        color: '#808080',
    },
    textRed: {
        color: '#ff0000',
    },

    textGreen: {
        color: '#1cc88a',
    },

    alignCenter: {
        justifyContent: 'center', alignItems: 'center'
    },




    /*PADDING & MARGN **/
    p20: {
        padding: 10
    },

    p15: {
        padding: 15
    },

    p10: {
        padding: 10
    },

    p5: {
        padding: 5
    },

    mb40: {
        marginBottom: 40,
    },

    mb30: {
        marginBottom: 30,
    },

    mb20: {
        marginBottom: 20,
    },

    mb15: {
        marginBottom: 15,
    },
    mb10: {
        marginBottom: 10,
    },
    mb5: {
        marginBottom: 5,
    },
    mt20: {
        marginTop: 20,
    },
    mt15: {
        marginTop: 15,
    },
    mt10: {
        marginTop: 10,
    },
    mt8: {
        marginTop: 8,
    },
    mt5: {
        marginTop: 5,
    },
    pt30: {
        paddingTop: 30,
    },

    pt15: {
        paddingTop: 15,
    },

    pt11: {
        paddingTop: 11,
    },

    pt10: {
        paddingTop: 10,
    },

    pt5: {
        paddingTop: 5,
    },
    pv15: {
        paddingVertical: 15,
    },
    pv10: {
        paddingVertical: 10,
    },
    pv5: {
        paddingVertical: 5,
    },


    newPH: {
        width: width - 68
    },

    pb15: {
        paddingBottom: 15,
    },

    pb10: {
        paddingBottom: 10,
    },

    pb5: {
        paddingBottom: 5,
    },

    ph20: {
        paddingHorizontal: 20
    },

    ph15: {
        paddingHorizontal: 15
    },

    ph10: {
        paddingHorizontal: 10
    },

    ph5: {
        paddingHorizontal: 5
    },

    pl15: {
        paddingLeft: 15,
    },

    pl10: {
        paddingLeft: 10,
    },

    pl5: {
        paddingLeft: 5,
    },

    mr5: {
        marginRight: 5
    },

    mr10: {
        marginRight: 10
    },

    mr15: {
        marginRight: 15,
    },

    mr20: {
        marginRight: 20
    },

    mr30: {
        marginRight: 30,
    },


    /* END OF PADDING **/



    /* BORDERS */

    b5: {
        borderRadius: 5,
    },
    b8: {
        borderRadius: 10,
    },
    b20: {
        borderRadius: 20,
    },
    b30: {
        borderRadius: 30,
    },



    /*** TEXT LABEL */

    extraLabel: {
        fontSize: moderateScale(19),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-SemiBold',
    },

    moreLabel: {
        fontSize: moderateScale(13),
        textAlign: 'left',
        color: '#7E178E',
        fontFamily: 'Nunito-SemiBold',
        textDecorationLine: 'underline',
    },

    noLabel: {
        fontSize: moderateScale(12),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-Regular',
        textDecorationLine: 'line-through'
    },

    mediumLabel: {
        fontSize: moderateScale(12),
        textAlign: 'center',
        fontFamily: 'Nunito-Regular',
        color: theme.dark ? '#fff' : '#343434'
    },


    largeLabel: {
        fontSize: moderateScale(17),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-SemiBold',
    },

    largeLabel2: {
        fontSize: moderateScale(15),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-SemiBold',
    },

    largeLabel3: {
        fontSize: moderateScale(14),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-SemiBold',
    },

    userLabel: {
        fontSize: moderateScale(13),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-SemiBold',
    },

    titleLabel: {
        fontSize: moderateScale(12),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-Regular'
    },

    subLabel: {
        fontSize: moderateScale(13),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-Regular'
    },

    thinLabel: {
        fontSize: moderateScale(8),
        textAlign: 'left',
        color: '#808080',
        fontFamily: 'Nunito-Regular',
    },

    tinyLabel: {
        fontSize: moderateScale(11),
        textAlign: 'left',
        color: '#808080',
        // marginTop:2,
        //  marginBottom:5,
        fontFamily: 'Nunito-Regular',
        // width: (width - 60) / 1,
    },


    tinyDark: {
        fontSize: moderateScale(11),
        textAlign: 'left',
        color: theme.dark ? '#fff' : '#343434',
        fontFamily: 'Nunito-Regular',
        // width: (width - 60) / 1,
    },



    /*** END OF MARGIN & PADDING */

    /* FONT WEIGHT */
    fontRegular: {
        fontFamily: 'Nunito-Regular',
    },

    fontSemi: {
        fontFamily: 'Nunito-SemiBold',
    },

    fontBold: {
        fontWeight: 'bold'
    },

    font100: {
        fontWeight: '100'
    },



    /** TEXT SIZE */


    fontSize8: {
        fontSize: moderateScale(8),
    },

    fontSize9: {
        fontSize: moderateScale(9),
    },

    fontSize10: {
        fontSize: moderateScale(10),
    },

    fontSize11: {
        fontSize: moderateScale(11),
    },

    fontSize12: {
        fontSize: moderateScale(12),
    },

    fontSize13: {
        fontSize: moderateScale(13),
    },

    fontSize14: {
        fontSize: moderateScale(14),
    },

    fontSize15: {
        fontSize: moderateScale(15),
    },

    fontSize17: {
        fontSize: moderateScale(17),
    },
    fontSize20: {
        fontSize: moderateScale(20),
    },

    fontSize22: {
        fontSize: moderateScale(22),
    },

    fontSize23: {
        fontSize: moderateScale(23),
    },

    fontSize24: {
        fontSize: moderateScale(24),
    },

    fontSize25: {
        fontSize: moderateScale(25),
    },

});
}

export default newStyle;