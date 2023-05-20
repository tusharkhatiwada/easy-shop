import { Slot } from "expo-router";
import { Provider } from "../context/auth";

export default function Root() {
  return (
    <Provider>
      <Slot />
    </Provider>
  );
}
