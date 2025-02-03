// File: app/review/page.tsx

'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ReviewPage() {
    const searchParams = useSearchParams();
    const evaluationId = searchParams.get('evaluationId');

    useEffect(() => {
        if (evaluationId) {
            // Attempt to open the app via a deep linking URL scheme here.
            window.location.href = `sparkshift://review?evaluationId=${evaluationId}`;
        }
    }, [evaluationId]);

    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            {evaluationId ? (
                <>
                    <h1>Your review is ready!</h1>
                    <p>If the app does not open automatically, click the button below.</p>
                    <button onClick={() => window.location.href = `sparkshift://review?evaluationId=${evaluationId}`}>
                        Open in Sparkshift App
                    </button>
                </>
            ) : (
                <p>Evaluation ID not found. Please check your link.</p>
            )}
        </div>
    );
}