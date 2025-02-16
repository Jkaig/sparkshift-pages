import { Suspense } from 'react';
import SubscriptionVerify from '@/components/subscription-verify';

export default function VerifyPage() {
  return (
    <div className="container py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <SubscriptionVerify />
      </Suspense>
    </div>
  );
}
