import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ActivityRegistry from "./ActivityRegistry";

/**
 * Renders current activity (game / illusion)
 */
export default function ActivityEngine() {
  const { activeActivity } = useContext(AppContext);

  // No active activity → render nothing
  if (!activeActivity) return null;

  const entry = ActivityRegistry[activeActivity];

  // Safety check
  if (!entry || !entry.component) {
    console.warn("Unknown activity:", activeActivity);
    return null;
  }

  const ActivityComponent = entry.component;

  return <ActivityComponent />;
}
