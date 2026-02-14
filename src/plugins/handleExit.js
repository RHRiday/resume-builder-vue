import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { Dialog } from "@capacitor/dialog";

export function setupBackButton(router) {
  if (!Capacitor.isNativePlatform()) return;

  const exitRoutes = ["/"];

  App.addListener("backButton", ({ canGoBack }) => {
    if (canGoBack && !exitRoutes.includes(router.currentRoute.value.path)) {
      router.back();
    } else {
      Dialog.confirm({
        title: "Confirm exit",
        message: "Do you want to exit RHResume?",
        okButtonTitle: "Yes",
        cancelButtonTitle: "No",
      }).then(({ value }) => {
        if (value) {
          App.exitApp();
        }
      });
    }
  });
}
