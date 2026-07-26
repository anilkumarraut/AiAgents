import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// `/choose-organization` hosts the `choose-organization` session task. A session
// with a pending task counts as signed-out for `auth.protect()`, so protecting it
// would bounce the user back to sign-in and loop.
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/choose-organization(.*)",
])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)){
    await auth.protect
  }
})

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
}
