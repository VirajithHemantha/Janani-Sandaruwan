import React, { useState } from 'react';

const PREFIXES = [
  "Mr. & Mrs.",
  "Mr.",
  "Mrs.",
  "Ms.",
  "Miss",
  "Dr.",
  "Prof.",
  "Rev.",
  "Mr. & Family",
  "Mrs. & Family",
  "Family of",
];

export default function Admin() {
  const [prefix, setPrefix] = useState(PREFIXES[0]);
  const [guestName, setGuestName] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!guestName.trim()) {
      alert("Please enter a guest name.");
      return;
    }
    const params = new URLSearchParams();
    params.set('prefix', prefix);
    params.set('name', guestName.trim());
    
    const baseUrl = window.location.origin; // Assuming root is the invitation page
    const link = `${baseUrl}/?${params.toString()}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center p-6 text-umber">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-sand/30">
        <h1 className="text-3xl font-serif text-sage mb-6 text-center">Link Generator</h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-taupe mb-2">
              Prefix
            </label>
            <select
              value={prefix}
              onChange={(e) => setPrefix(e.target.value)}
              className="w-full rounded-xl border border-sage/30 bg-white/60 px-4 py-3 text-sm text-umber outline-none focus:border-sage focus:ring-1 focus:ring-sage"
            >
              {PREFIXES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold uppercase tracking-wider text-taupe mb-2">
              Guest Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full rounded-xl border border-sage/30 bg-white/60 px-4 py-3 text-sm text-umber outline-none focus:border-sage focus:ring-1 focus:ring-sage"
            />
          </div>

          <button
            onClick={handleGenerate}
            className="w-full bg-sage text-white py-3 rounded-xl text-sm uppercase tracking-widest font-bold hover:bg-umber transition-colors mt-4"
          >
            Generate Link
          </button>

          {generatedLink && (
            <div className="mt-6 space-y-3 pt-6 border-t border-sand/30">
              <label className="block text-sm font-semibold uppercase tracking-wider text-taupe">
                Generated Link
              </label>
              <div className="p-3 bg-sand/10 rounded-xl break-all text-xs text-umber/80 border border-sand/30">
                {generatedLink}
              </div>
              <button
                onClick={handleCopy}
                className={`w-full py-3 rounded-xl text-sm uppercase tracking-widest font-bold transition-colors border ${
                  copied 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-white text-sage border-sage/30 hover:bg-sage/5'
                }`}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
