import { Button } from '@/shared/freamwork/shadcn/ui/button';
import { Loader2Icon } from 'lucide-react';
import GoogleIcon from '@/shared/freamwork/components/icons/google';
import { useGoogleProvider } from '../hooks/useGoogleProvider';
import { useAuthentificate } from '../hooks/useAuthentificate';
import { LoadingAuthentification } from './loading-authentification.page';

export default function AuthentificationPage() {
  const { isLoading: isLoadingGoogleProvider, handleGoogleProviderLogin } = useGoogleProvider()
  const {isLoading: isLoadingAuthentificate} = useAuthentificate()

  if(isLoadingAuthentificate) return <LoadingAuthentification />

  return (
    <section className="flex min-h-screen gap-6 justify-center items-center p-4">
      <article className='space-y-8 w-full max-w-md'>

        <header className='space-y-2'>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
            Create Your Open-Source Collaborative Space
          </h1>
          <p className="text-muted-foreground text-sm">
            Connect, chat, and share with your team in this fully self-hosted, customizable Gather clone.
          </p>
        </header>

        <Button
          onClick={handleGoogleProviderLogin}
          disabled={isLoadingGoogleProvider}
          variant="outline"
          className="flex items-center justify-center gap-2"
        >
          {isLoadingGoogleProvider && (
            <Loader2Icon className="animate-spin h-4 w-4" />
          )}
          <GoogleIcon />
          Continue with Google
        </Button>

      </article>
    </section>
  );
}
