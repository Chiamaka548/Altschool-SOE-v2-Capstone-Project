import React, { useState } from 'react';
import './Compressly.css';

type CustomDomain = "domain1" | "domain2" | "domain3" | "domain4";

interface FormState {
    url: string;
    customDomain: CustomDomain | null;
    alias: string;
}
interface CompresslyProps {
    value: string;
}

const Compressly: React.FC<CompresslyProps> = () => {
    const [formState, setFormState] = useState<FormState>({
        url: "",
        customDomain: null,
        alias: "",
    });

    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
    const [showQRCode, setShowQRCode] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCloseButton = () => {
        setShortenedUrl(null);
        setShowQRCode(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleTrimClick = () => {
        const { url, alias } = formState;
        if (url) {
            const trimmedUrl = url.substring(0, 10) + ".lnk";
            const aliasUrl = alias.substring(0, 8) + ".lnk";
            const shortUrl = alias ? aliasUrl : trimmedUrl;
            setShortenedUrl(shortUrl);
            setShowQRCode(true);
        }
    };

    const handleCopyClick = () => {
        if (shortenedUrl) {
            navigator.clipboard.writeText(shortenedUrl).then(() => {
                console.log("Copied to clipboard");
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 1000);
            }).catch((error) => {
                console.error("Error copying URL to clipboard:", error);
            });
        }
    };

    const handleShareClick = () => {
        if (shortenedUrl) {
            console.log("Sharing URL:", shortenedUrl);
        }
    };

    return (
        <div className="compressly-container">
            <form>
                <div className='compressly-box'>
                    <input type='text' name='url' className="url-input" value={formState.url} onChange={handleInputChange} placeholder='Enter URL' />
                    <div className="compressly-inputs">
                        <select name="customDomain" className="select-domain" value={formState.customDomain || undefined} onChange={handleInputChange}>
                            <option value="" className="compressly-domain">Choose Domain</option>
                            <option value="domain1">Domain 1</option>
                            <option value="domain2">Domain 2</option>
                            <option value="domain3">Domain 3</option>
                            <option value="domain4">Domain 4</option>
                        </select>
                        <input type="text" name="alias" className="alias-input" value={formState.alias} onChange={handleInputChange} placeholder="Alias" />
                    </div>
                    <button type="button" className="trim-btn" onClick={handleTrimClick}>
                        Trim URL
                    </button>
                    <div className="compressly-footer">
                        <p>
                        By clicking Trim URL, I agree to the <b>Terms of Service</b>, <b>Privacy Policy</b> and Use of Cookies.
                        </p>
                    </div>
                </div>
            </form>

            {shortenedUrl && (
                <div className="compressly-overlay">
                    <div className="compressly-qrcode-container">
                    <div className="compressly-qrcode-close-btn">
                        <button onClick={handleCloseButton}>Close</button>
                    </div>
                    <p>{shortenedUrl}</p>
                    {showQRCode && (
                        <div>
                            <Compressly value={shortenedUrl} />
                            <div className="compressly-qrcode-btn">
                                <div className="compressly-qrcode-btn">
                                    <button type="button" onClick={handleCopyClick}>
                                        Copy
                                    </button>
                                    {copied && <span className="compressly-copied-message">Copied!</span>}
                                    <button type="button" onClick={handleShareClick}>
                                        Share
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            )}
        </div>
    );
};

export default Compressly;
// interface ShortenedUrl {
//     originalUrl: string;
//     shortenedUrl: string;
// }

// const Shortener: React.FC = () => {
//     const [longUrl, setLongUrl] = useState<string>('');
//     const [shortenedUrls, setShortenedUrls] = useState<ShortenedUrl[]>([]);

//     const handleShortenUrl = async () => {
//         try {
//             const response = await fetch('YOUR_BACKEND_URL', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ url: longUrl }),
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 setShortenedUrls([
//                     ...shortenedUrls, 
//                     { originalUrl: longUrl, shortenedUrl: data.shortenedUrl },
//                 ]);
//                 setLongUrl('');
//             } else {
//                 console.error('Failed to shorten URL');
//             }
//         } catch (error) {
//             console.error('Error occurred:', error);
//         }
//     };

//     return (
//         <div>
//             <input
//             type="text"
//             placeholder="Paste long URL here"
//             value={longUrl}
//             onChange={(e) => setLongUrl(e.target.value)}
//             />
//             <button onClick={handleShortenUrl}>Shorten</button>
//             <div>
//                 {shortenedUrls.map((url, index) => (
//                     <div key={index}>
//                         <p>Original URL: {url.originalUrl}</p>
//                         <p>Shortened URL: {url.shortenedUrl}</p>
//                         {/* Add QR code generation and analytics display here */}
//             </div>
//             ))}
//         </div>
//         </div>
//     );
// };

// export default Shortener;