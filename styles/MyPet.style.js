import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "@/constants";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 250,
    padding: SIZES.xLarge,
    backgroundColor: selectedJob === item.job_id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  logoContainer: (selectedJob, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedJob === item.job_id ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "70%",
    height: "70%",
  },
  companyName: {
    fontSize: SIZES.medium,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.bold,
    color: selectedJob === item.job_id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
  page: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.gray,
    borderRadius: 45,

    paddingHorizontal: 15,
    marginHorizontal: 24,

    marginVertical: 20,
    paddingBottom: 20,
    width: '87.5%'
  },
  pageTitle: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "center",
  },
  imageContainer: {
    width: 312,
    height: 280,
    borderBottomLeftRadius: 75,
    borderTopRightRadius: 75,
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 75,
    borderTopRightRadius: 75,
  },
  petInfoContainer: {
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
  },
  dogInfoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 10,
  },
  dogInfoText: {
    fontSize: SIZES.small,
    paddingRight: 8,
    flexBasis: "33.33%",
    paddingVertical: 3,
  },
  dogInfoTextBold: {
    fontWeight: "800",
  },
  textTitle: {
    fontSize: SIZES.xxLarge,
    paddingHorizontal: 20,
    
  },
  pagerView: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});

export default styles;
