import Link from "next/link";
import { TopBar } from "@/components/SiteHeader";

export default function CreateAccountPage() {
  return (
    <main className="page">
      <TopBar
        crumbs={
          <>
            <Link href="/account">account</Link> / create
          </>
        }
      />
      <div className="panel">
        <h1 className="page-title">Create an account</h1>
        <p>
          Your account is a pseudonymous identity. We generate a handle (like{" "}
          <code className="mono">anon_4f2a</code>) and an encryption key for you. No email, no
          password, no personal data.
        </p>
        <p>
          <strong>Your recovery phrase:</strong>
        </p>
        <div className="recovery">
          apple bridge castle dragon eagle forest garden harbor island jasmine knight lantern
          meadow nest ocean pearl quartz river sunset thunder umbrella valley waterfall
        </div>
        <p className="warning">
          Write this down. If you lose it, you lose access to your account and all messages. We
          cannot recover it for you.
        </p>
        <div>
          <button type="button" className="btn btn-primary">
            I saved my recovery phrase — create my account
          </button>
        </div>
      </div>
    </main>
  );
}
