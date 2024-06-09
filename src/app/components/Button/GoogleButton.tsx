import { signIn } from "@/app/auth"

export function GoogleButton() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google", {redirectTo: "/admin/dashboard"})
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
} 