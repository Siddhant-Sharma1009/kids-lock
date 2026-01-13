let last = null;

const activities = [
  "ColorChange",
  "BubblePop",
  "IllusionLines",
  "SoundPlay",
];

const randomActivity = () => {
  let next = last;

  while (next === last) {
    next = activities[Math.floor(Math.random() * activities.length)];
  }

  last = next;
  return next;
};

export default randomActivity;
