export const PATHS = {
    HOME: "/",
    INTRODUCTION: "/introduction",
    CARDS: "/cards",
    GAMEPLAY: "/gameplay",
};

export const NAV_PATHS = Object.values(PATHS).filter((p) => p !== PATHS.HOME);
