import { create } from "zustand";

interface PopupState {
  loginPopupVisible: boolean;
  showLoginPopup: () => void;
  hideLoginPopup: () => void;
}

export const usePopupStore = create<PopupState>((set) => ({
  loginPopupVisible: false,
  showLoginPopup: () => set({ loginPopupVisible: true }),
  hideLoginPopup: () => set({ loginPopupVisible: false }),
}));
