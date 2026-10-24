/** Shared easing: a long, soft deceleration (expo-out). */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Default viewport config: animate once, slightly before the element is centred. */
export const IN_VIEW = { once: true, margin: "0px 0px -12% 0px" } as const;
