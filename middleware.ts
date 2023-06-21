import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/","/about","/contact","/renting-portal"]
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)","/api/uploadthing"],
};
