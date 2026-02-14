export const commonMethods = {
  getIcon(str) {
    if (str.includes("linkedin.com")) {
      return ["fab", "linkedin"];
    } else if (str.includes("github.com")) {
      return ["fab", "github"];
    } else if (str.includes("facebook.com") || str.includes("fb.com")) {
      return ["fab", "facebook"];
    } else if (str.includes("x.com")) {
      return ["fab", "x-twitter"];
    } else {
      return "globe";
    }
  },
  breakDownWebsite(str) {
    if (
      str.includes("linkedin.com") ||
      str.includes("github.com") ||
      str.includes("facebook.com") ||
      str.includes("fb.com") ||
      str.includes("x.com")
    ) {
      const splittedString = str.split("/");
      const lastString = splittedString[splittedString.length - 1];
      return "/" + lastString;
    } else if (str.length > 23) {
      return "Website";
    } else {
      return str;
    }
  },
  convertDate(date) {
    if (date == "Present") {
      return date;
    }
    let d = new Date(date);
    return d.getMonth() + 1 + "/" + d.getFullYear();
  },
};
