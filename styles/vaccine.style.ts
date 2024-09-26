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
  pageTitle: {
    flex: 1,
    flexDirection: "row",
  },
  textTitle: {
    fontSize: SIZES.large,
    paddingLeft: 10,
    paddingTop: 5
  },
  virusIcon: {
    paddingTop: 5,
    paddingLeft: 5
  }
});

export default styles;
