import React, { useRef } from 'react';
import {QRCodeSVG} from 'qrcode.react';

interface QRCodeProps {
    url: string;
}

const QRCodeGen: React.FC<QRCodeProps> = ({ url }) => {
    const codeRef = useRef<HTMLDivElement>(null);

    const qRCodeDownload = () => {
        if (codeRef.current) {
            const canvas = codeRef.current.querySelector("canvas");
            if (canvas) {
                const pngUrl = canvas
                    .toDataURL("image/png")
                    .replace("image/png", "image/octet-stream");

                const linkDownload = document.createElement("a");
                linkDownload.href = pngUrl;
                linkDownload.download = "qrcode.png";
                document.body.appendChild(linkDownload);
                linkDownload.click();
                document.body.removeChild(linkDownload);
            }
        }
    };

    return (
        <div className="">
            <div ref={codeRef}>
            <QRCodeSVG value="={url}" />
            </div>

            <button onClick={() => window.open(url, "_blank")} className="">
            <a onClick={qRCodeDownload}>Download QR Code</a>
            </button>
        </div>
    );
};
export default QRCodeGen;