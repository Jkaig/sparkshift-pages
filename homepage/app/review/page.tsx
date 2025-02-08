// File: app/review/page.tsx

'use client';
export const dynamic = 'force-dynamic';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ReviewContent() {
  const searchParams = useSearchParams();
  const evaluationId = searchParams.get('evaluationId');

  useEffect(() => {
    if (evaluationId) {
      // Attempt to open the app using a custom URI scheme
      window.location.href = `sparkshift://review?evaluationId=${evaluationId}`;
    }
  }, [evaluationId]);

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      {evaluationId ? (
        <>
          <h1>Your review is ready!</h1>
          <p>If the app does not open automatically, click the button below.</p>
          <button
            onClick={() =>
              (window.location.href = `sparkshift://review?evaluationId=${evaluationId}`)
            }
            style={{ padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
          >
            Open in Sparkshift App
          </button>
        </>
      ) : (
        <p>Evaluation ID not found. Please check your link.</p>
      )}
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewContent />
    </Suspense>
  );
}