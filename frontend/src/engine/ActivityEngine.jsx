import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ActivityRegistry from "./ActivityRegistry";

export default function ActivityEngine() {
  const { activeActivity } = useContext(AppContext);

  if (!activeActivity) return null;

  const entry = ActivityRegistry[activeActivity];
  if (!entry || !entry.component) {
    console.warn("Unknown activity:", activeActivity);
    return null;
  }

  const ActivityComponent = entry.component;
  return <ActivityComponent />;
}
