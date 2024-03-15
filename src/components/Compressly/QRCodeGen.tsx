import React, { useState } from "react";
import axios from "axios";
import QRCode from 'qrcode.react';
import "./Compressly.css";

const QRCodeGen: React.FC = () => {
    const [url, setUrl] = useState<string>('');
    const [shortenedUrl, setShortenedUrl] = useState('');

    const generateQRCode = async () => {
        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${url}`);
            setShortenedUrl(response.data);
        } catch (error) {
            console.error('Error shortening URL:', error);
        }
    };

    return (
        <div>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter URL"/>
            <button onClick={generateQRCode}>Generate QR Code</button>
            {shortenedUrl && (
                <div>
                    <p>Shortened URL: {shortenedUrl}</p>
                    <QRCode value={shortenedUrl} />
                </div>
            )}
        </div>
    );
};
            
export default QRCodeGen;