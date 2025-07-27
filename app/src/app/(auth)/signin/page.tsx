import { MeshGradient } from '@/components/shaders/mesh-gradient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in | Authenticator',
};

export default function SignInPage() {
  return (
    <main className="h-full relative">
      <MeshGradient className="fixed inset-0 -z-1 pointer-events-none" colors={['#93b450', '#30502f', '#30502f', '#327330']} distortion={0.35} swirl={0.1} speed={1} quality={0.1}/>
    </main>
  );
}
