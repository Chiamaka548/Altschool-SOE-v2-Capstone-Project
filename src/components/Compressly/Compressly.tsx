import React, { useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import QRCode from 'qrcode.react';
import './Compressly.css'

const URLShortener: React.FC = () => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);

    const shortenUrl = async () => {
        try {
            const response = await axios.post('https://tinyurl.com/api-create.php', { url: originalUrl });
            setShortenedUrl(response.data);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    const downloadQRCode = () => {
        const canvas = document.getElementById('qrcode') as HTMLCanvasElement;
        if (canvas) {
            canvas.toBlob((blob) => {
                if (blob) {
                    saveAs(blob, 'qrcode.png');
                } else {
                    console.error('Failed to save QR code.');
                }
            });
        }
    };

    const shareQRCode = () => {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shortenedUrl)}`);
    };

    return (
        <div className='compressly-container'>
            <div className="compressly-form">
                <div className='compressly-box'>
                    <input type='text' className="url-input" value={originalUrl} onChange={(e) => setOriginalUrl(e.target.value)} placeholder='Paste URL here...' />
                    <div className="compressly-inputs">
                        <select className="select-domain">
                                <option value="" className="compressly-domain">Choose Domain</option>
                                <option>Domain 1</option>
                                <option>Domain 2</option>
                                <option>Domain 3</option>
                                <option>Domain 4</option>
                        </select>
                        <input type="text" className="alias-input" placeholder="Alias" />
                    </div>
                    <button onClick={shortenUrl} className="trim-btn" >Trim URL</button>
                    <div className="compressly-footer">
                        <p>
                        By clicking Trim URL, I agree to the <b>Terms of Service</b>, <b>Privacy Policy</b> and Use of Cookies.
                        </p>
                    </div>
                    {shortenedUrl && (
                        <div className="shortened">
                            <p>Trimmed URL: <a href={shortenedUrl} target='_blank'>{shortenedUrl}</a></p>
                            <button onClick={() => setShowQRCode(!showQRCode)} className='qr-btn'>Generate QR Code</button>
                            {showQRCode && (
                                <div className='qr-container'>
                                    <QRCode value={shortenedUrl} />
                                    <div className='qr-btns'>
                                        <button onClick={downloadQRCode} className='qr-btn'>Download QR Code</button>
                                        <button onClick={shareQRCode} className='qr-btn'>Share QR Code</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
                    };
export default URLShortener;