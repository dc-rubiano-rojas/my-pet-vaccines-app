import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "@/constants";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: COLORS.gray,
    borderRadius: 45,

    marginHorizontal: 24,

    marginVertical: 20,
    width: "87.5%",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderColor: COLORS.secondary,
    borderBottomLeftRadius: 75,
    borderTopRightRadius: 75,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 75,
    borderTopRightRadius: 75,
  },
  pageInfo: {
    flex: 1,
    flexDirection: "column",
  },
  pageTitleContainer: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 10,
    flexGrow: 1,
  },
  textTitle: {
    fontSize: SIZES.large,
    paddingLeft: 10,
    paddingTop: 5,
    fontWeight: '600'
  },
  virusIcon: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  pageBodyContainer: {
    flex: 1,
    flexDirection: "column",
    flexGrow: 4
  },
  textDates: {
    fontSize: SIZES.medium,
    marginLeft: 10,
    marginTop: 10,
  },
});

export default styles;
