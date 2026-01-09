'use client';

export default function DiagnosticPage() {
    const checkLocalStorage = () => {
        const items = ['authToken', 'currentUser', 'users', 'products', 'properties', 'cart', 'wishlist'];
        const results: any = {};

        items.forEach(key => {
            const value = localStorage.getItem(key);
            if (value) {
                try {
                    const parsed = JSON.parse(value);
                    results[key] = { status: 'OK', type: typeof parsed, length: Array.isArray(parsed) ? parsed.length : 'N/A' };
                } catch (e) {
                    results[key] = { status: 'CORRUPTED', error: String(e) };
                }
            } else {
                results[key] = { status: 'MISSING' };
            }
        });

        console.log('LocalStorage Diagnostic:', results);
        alert(JSON.stringify(results, null, 2));
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Diagnostic Tools</h1>

                <div className="space-y-3">
                    <button
                        onClick={checkLocalStorage}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Check localStorage
                    </button>

                    <button
                        onClick={() => {
                            localStorage.clear();
                            alert('localStorage cleared!');
                            window.location.href = '/login';
                        }}
                        className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600"
                    >
                        Clear All & Go to Login
                    </button>

                    <button
                        onClick={() => window.location.href = '/home'}
                        className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
}
