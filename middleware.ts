import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
    publicRoutes: [
        "/",
        "/about",
        "/contact",
        "/how",
        "/renting-portal",
        "/api/uploadthing",
    ],
});

export const config = {
    matcher: [
        "/((?!.*\\..*|_next).*)",
        "/",
        "/(api|trpc)(.*)",
        "/api/uploadthing",
    ],
};
