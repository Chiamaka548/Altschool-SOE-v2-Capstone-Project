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



// import React, { useState } from "react";
// import QRCodeGen from "./QRCodeGen"
// import "./Compressly.css";

// type CustomDomain = "domain1" | "domain2" | "domain3" | "domain4";

// interface FormState {
//     url: string;
//     customDomain: CustomDomain | null;
//     alias: string;
// }

// interface CompresslyProps {
//     value: string;
// }

// const Compressly: React.FC<CompresslyProps> = () => {
//     const [formState, setFormState] = useState<FormState>({
//         url: "",
//         customDomain: null,
//         alias: "",
//     });

//     const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
//     const [showQRCode, setShowQRCode] = useState(false);
//     const [downloaded, setDownload] = useState(false);

//     const handleCloseButton = () => {
//         setShortenedUrl(null);
//         setShowQRCode(false);
//     };

//     const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = event.target;
//         setFormState((prevState) => ({ ...prevState, [name]: value }));
//     };

//     const handleTrimClick = () => {
//         const { url, alias } = formState;
//         if (url) {
//             const trimmedUrl = url.substring(0, 10) + ".trim";
//             const aliasUrl = alias.substring(0, 8) + ".trim";
//             const shortUrl = alias ? aliasUrl : trimmedUrl;
//             setShortenedUrl(shortUrl);
//             setShowQRCode(true);
//         }
//     };

//     const handleDownloadClick = () => {
//         if (shortenedUrl) {
//             navigator.clipboard.writeText(shortenedUrl).then(() => {
//                 console.log("Downloaded");
//                 setDownload(true);
//                 setTimeout(() => {
//                     setDownload(false);
//                 }, 1000);
//             }).catch((error) => {
//                 console.error("Error downloading URL", error);
//             });
//         }
//     };

//     const handleShareClick = () => {
//         if (shortenedUrl) {
//             console.log("Sharing URL:", shortenedUrl);
//         }
//     };


//     return (
//         <div className="compressly-container">
//             <form className="compressly-form">
//                 <div className='compressly-box'>
//                     <input className="individual-input" type="text" name="url" value={formState.url} onChange={handleInputChange} placeholder="Paste URL here..." />
//                     <div className="compressly-inputs">
//                         <select name="customDomain" className="select-domain" value={formState.customDomain || undefined} onChange={handleInputChange}>
//                             <option value="" className="compressly-domain">Choose CustomLink</option>
//                             <option value="Link1">Domain 1</option>
//                             <option value="Link2">Domain 2</option>
//                             <option value="Link3">Domain 3</option>
//                             <option value="Link4">Domain 4</option>
//                         </select>
//                         <input type="text" name="alias" className="alias-input" value={formState.alias} onChange={handleInputChange} placeholder="Alias" />
//                     </div>
//                 </div>
//                 <button type="button" className="trim-btn" onClick={handleTrimClick}>
//                     Trim URL
//                     <div>
//                         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9.45883 8.31606C9.43987 8.54147 9.11187 8.59847 9.00637 8.39468L8.4383 7.29755C8.40156 7.22646 8.3267 7.17895 8.24205 7.1728L6.9348 7.07797C6.69196 7.06037 6.63057 6.75589 6.85011 6.65794L8.03191 6.13061C8.10844 6.09645 8.15973 6.02703 8.16628 5.94842L8.26845 4.73482C8.28741 4.50941 8.61541 4.45241 8.7209 4.6562L9.28897 5.75334C9.32571 5.82443 9.40048 5.87195 9.48523 5.87808L10.7925 5.97291C11.0353 5.99051 11.0967 6.29499 10.8772 6.39294L9.69536 6.92027C9.61874 6.95445 9.56755 7.02385 9.56099 7.10247L9.45883 8.31606Z" fill="white" />
//                             <path d="M5.70599 9.1442C5.67434 9.25336 5.50749 9.25336 5.47583 9.1442L5.30536 8.55649C5.29435 8.51841 5.26227 8.48867 5.22127 8.47842L4.58821 8.32018C4.4706 8.29079 4.4706 8.13591 4.58821 8.10652L5.22127 7.94828C5.26227 7.93802 5.29435 7.90828 5.30536 7.87021L5.47583 7.28249C5.50749 7.17333 5.67434 7.17333 5.70599 7.28249L5.87646 7.87021C5.88747 7.90828 5.91951 7.93802 5.96055 7.94828L6.59362 8.10652C6.71122 8.13591 6.71122 8.29079 6.59362 8.32018L5.96055 8.47842C5.91951 8.48867 5.88747 8.51841 5.87646 8.55649L5.70599 9.1442Z" fill="white" />
//                             <path d="M7.88781 12.5199C7.85615 12.6291 7.68931 12.6291 7.65765 12.5199L7.48718 11.9322C7.47617 11.8941 7.44409 11.8644 7.40309 11.8541L6.77002 11.6959C6.65242 11.6665 6.65242 11.5116 6.77002 11.4822L7.40309 11.324C7.44409 11.3138 7.47617 11.284 7.48718 11.2459L7.65765 10.6582C7.68931 10.5491 7.85615 10.5491 7.88781 10.6582L8.05828 11.2459C8.06929 11.284 8.10132 11.3138 8.14237 11.324L8.77544 11.4822C8.89304 11.5116 8.89304 11.6665 8.77544 11.6959L8.14237 11.8541C8.10132 11.8644 8.06929 11.8941 8.05828 11.9322L7.88781 12.5199Z" fill="white" />
//                             <path d="M6.03127 11.1969C6.01016 11.2697 5.89893 11.2697 5.87783 11.1969L5.76418 10.8051C5.75684 10.7797 5.73545 10.7599 5.70812 10.7531L5.28608 10.6476C5.20767 10.628 5.20767 10.5247 5.28608 10.5052L5.70812 10.3997C5.73545 10.3928 5.75684 10.373 5.76418 10.3476L5.87783 9.9558C5.89893 9.88303 6.01016 9.88303 6.03127 9.9558L6.14491 10.3476C6.15225 10.373 6.17361 10.3928 6.20097 10.3997L6.62302 10.5052C6.70142 10.5247 6.70142 10.628 6.62302 10.6476L6.20097 10.7531C6.17361 10.7599 6.15225 10.7797 6.14491 10.8051L6.03127 11.1969Z" fill="white" />
//                             <path d="M11.1222 9.84666C11.1011 9.91944 10.9898 9.91944 10.9687 9.84666L10.8551 9.45485C10.8478 9.42947 10.8264 9.40964 10.799 9.40281L10.377 9.29731C10.2986 9.27772 10.2986 9.17447 10.377 9.15487L10.799 9.04938C10.8264 9.04254 10.8478 9.02272 10.8551 8.99733L10.9687 8.60552C10.9898 8.53275 11.1011 8.53275 11.1222 8.60552L11.2358 8.99733C11.2432 9.02272 11.2645 9.04254 11.2919 9.04938L11.7139 9.15487C11.7923 9.17447 11.7923 9.27772 11.7139 9.29731L11.2919 9.40281C11.2645 9.40964 11.2432 9.42947 11.2358 9.45485L11.1222 9.84666Z" fill="white" />
//                             <path d="M18.3182 18.003L17.5909 18.6782M8.15778 9.04228L19.9624 19.0877C20.2555 19.3371 20.2654 19.7629 19.9843 20.0239V20.0239C19.7043 20.2839 19.2496 20.2777 18.9805 20.008C14.9047 15.9231 7.72842 8.70747 8.15778 9.04228Z" stroke="white" />
//                         </svg>
//                     </div>
//                 </button>
//                 <p>
//                     By clicking TrimURL, I agree to the <strong> Terms of Service,<br /> Privacy Policy</strong> and Use of Cookies.
//                 </p>
//             </form>

//             {/* {shortenedUrl && (
//                 <div className="compressly-overlay">
//                     <div className="compressly-qrcode-container">
//                         <div className="compressly-qrcode-close-btn">
//                             <button onClick={handleCloseButton}>Close</button>
//                         </div>
//                         <p>{shortenedUrl}</p>
//                         {showQRCode && (
//                             <div>
//                                 <Compressly value={shortenedUrl} />
//                                 <div className="compressly-qrcode-btn">
//                                     <div className="compressly-qrcode-btn">
//                                         <button type="button" onClick={handleDownloadClick}>
//                                             Download
//                                         </button>
//                                         {downloaded && <span className="compressly-copied-message">Downloaded!</span>}
//                                         <button type="button" onClick={handleShareClick}>
//                                             Share
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )} */}
//         </div>
//     );
// };

// export default Compressly;
// type CustomDomain = "domain1" | "domain2" | "domain3" | "domain4";

// interface FormState {
//     url: string;
//     customDomain: CustomDomain | "";
//     alias: string;
// }

// const UrlShortener: React.FC = () => {
//     const [formState, setFormState] = useState<FormState>({
//         url: "",
//         customDomain: "",
//         alias: "",
//     });
// import React, { useState } from "react";
// import { GiBoltCutter } from "react-icons/gi";
// import { LuCopy } from "react-icons/lu";
// import { AiOutlineCloseCircle } from "react-icons/ai";

// type CustomDomain = "domain1" | "domain2" | "domain3" | "domain4";

// interface FormState {
//   url: string;
//   customDomain: CustomDomain | "";
//   alias: string;
// }

// const UrlShortener: React.FC = () => {
//   const [formState, setFormState] = useState<FormState>({
//     url: "",
//     customDomain: "",
//     alias: "",
//   });

//   const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
//   const [showQRCode, setShowQRCode] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [showContainer, setShowContainer] = useState(false);

 
//   const closeButton = () => {
// setShortenedUrl(null);
// setShowQRCode(false);
// setShowContainer(false);
 
// }
  

//   const handleInputChange = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = event.target;
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleTrimClick = () => {
//     const { url, alias } = formState;
//     if (url) {
//       // Add your own URL shortening logic here
//       const trimmedUrl = url.substring(0, 10) + ".lnk";
//       const aliasUrl =  alias.substring(0, 8) + ".lnk";
//       const shortUrl = alias ? aliasUrl : `${trimmedUrl}`;

//       // Update state with the shortened URL
//       setShortenedUrl(shortUrl);
//       setShowQRCode(true);
//       setShowContainer(true);
//     }
//   };

//   const handleCopyClick = () => {
//     if (shortenedUrl) {
//       navigator.clipboard
//         .writeText(shortenedUrl)
//         .then(() => {
//           console.log("Copied to clipboard");
//           setCopied(true);
//         })
//         .catch((error) => {
//           console.error("Error copying URL to clipboard:", error);
//         });
//         setTimeout(() => {
//           setCopied(false);
//         }, 1000);
        
//     }
//   };

//   const handleShareClick = () => {
//     // Implement your share functionality here
//     // This can include sharing the URL through various channels like email, social media, etc.
//     if (shortenedUrl) {
//       console.log("Sharing URL:", shortenedUrl);
//     }
//   };

//   return (
//     <div className="" id='url'>
//       <div>
//         <img src="./assets/shortener_image1.png" alt="" className="" />
//         <img src="./assets/shortener_image2.png" alt="" className="" />
//       </div>
//       <div className="">
//       <form className="">
     
//         <div>
//           <input
//             type="text"
//             name="url"
//             value={formState.url}
//             onChange={handleInputChange}
//             placeholder="Paste URL here ..."
//           />
//         </div>
//         <div className="">
//         <div>
//           <select
//             name="customDomain"
//             value={formState.customDomain}
//             onChange={handleInputChange}
//           >
//             <option value="" className="">Choose Domain</option>
//             <option value="domain1">Domain 1</option>
//             <option value="domain2">Domain 2</option>
//             <option value="domain3">Domain 3</option>
//             <option value="domain4">Domain 4</option>
//           </select>
//         </div>
//         <div>
//           <input
//             type="text"
//             name="alias"
//             value={formState.alias}
//             onChange={handleInputChange}
//             placeholder="Type Alias here"
//           />
//         </div>
//         </div>
//         <button type="button" onClick={handleTrimClick} >
//           Trim URL <GiBoltCutter />
//         </button>
//         <div className="">
//           <p>
//             By clicking TrimURL, I agree to the <span>Terms of Service</span>,
//             <span>Privacy Policy</span> and
//             <span> Use of Cookies</span>.
//           </p>
//         </div>
       
//       </form>
//       </div>
// {showContainer && (
//   <div className="overlay">

//       {shortenedUrl && (
//         <div className="">
//           <div className="">
//             <AiOutlineCloseCircle onClick={closeButton} /></div>
//           <p>{shortenedUrl}</p>
//           {showQRCode && (
//             <div>
//               <QRCodeGen value={shortenedUrl} />
//               <div className="">
//                 <button type="button" onClick={handleCopyClick}>
//                 <LuCopy />
//                 </button>
//                 {copied && <span className="">Copied!</span>}

//                 <button type="button" onClick={handleShareClick}></button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}
      
//     </div>
//     )}
//     </div> 
//   );
// };

// export default UrlShortener;
// import React, { useState } from "react";
// import "./Compressly.css";

// interface ShortFormProps {
//     onSubmit: (url: string) => void;
//     onFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
//     alias: string;
// }

// const Compressly: React.FC<ShortFormProps> = ({ onSubmit, onFocus, alias }) => {
//     const [formState, setFormState] = useState("");


//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         onSubmit(formState);
//     };

//     const handleLinkFocus = () => {
//         console.log("Link is focused", onFocus);
//     };

//     const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);
//     const [showQRCodeGen, setShowQRCodeGen] = useState(false);
//     const [copied, setCopied] = useState(false);
//     const [showContainer, setShowContainer] = useState(false);

//     const handleCloseButton = () => {
//         setShortenedUrl(null);
//         setShowQRCodeGen(false);
//         setShowContainer(false);
//     }

//     const handleInputChange = (
//         event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//     ) => {
//         const { name, value } = event.target;
//         setFormState((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     };

//     const handleTrimClick = () => {
//         const { url, alias } = formState;
//         if (url) {
//             const trimmedUrl = url.substring(0, 10) + ".lnk";
//             const aliasUrl =  alias.substring(0, 8) + ".lnk";
//             const shortUrl = alias ? aliasUrl : `${trimmedUrl}`;

//             setShortenedUrl(shortUrl);
//             setShowQRCodeGen(true);
//             setShowContainer(true);
//         }
//     };

//     const handleCopyClick = () => {
//         if (shortenedUrl) {
//             navigator.clipboard
//             .writeText(shortenedUrl)
//             .then(() => {
//                 console.log("Copied to clipboard");
//                 setCopied(true);
//             })
//             .catch((error) => {
//                 console.error("Error copying URL to clipboard:", error);
//             });
//             setTimeout(() => {
//                 setCopied(false);
//             }, 1000);
//         }
//     };

//     const handleShareClick = () => {
//         if (shortenedUrl) {
//             console.log("Sharing URL:", shortenedUrl);
//         }
//     };

//     return (
//         <div className="compressly-container">
//             <form className="compressly-form">
//                 <div className='compressly-box'>
//                     <input className="individual-input" type="text" name="url" value={formState} onChange={handleInputChange} placeholder="Paste URL here..." />
//                     <div className="compressly-inputs">
//                         <select name="customDomain" className="select-domain" value={formState || undefined} onChange={handleInputChange}>
//                             <option value="" className="compressly-domain">Choose CustomLink</option>
//                             <option value="Link1">Link 1</option>
//                             <option value="Link2">Link 2</option>
//                             <option value="Link3">Link 3</option>
//                             <option value="Link4">Link 4</option>
//                         </select>
//                         <input type="text" name="alias" className="alias-input" value={formState} onChange={handleInputChange} placeholder="Alias" />
//                     </div>
//                 </div>
//                 <button type="button" className="trim-btn" onClick={handleTrimClick}>
//                     Trim URL
//                     <div>
//                         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M9.45883 8.31606C9.43987 8.54147 9.11187 8.59847 9.00637 8.39468L8.4383 7.29755C8.40156 7.22646 8.3267 7.17895 8.24205 7.1728L6.9348 7.07797C6.69196 7.06037 6.63057 6.75589 6.85011 6.65794L8.03191 6.13061C8.10844 6.09645 8.15973 6.02703 8.16628 5.94842L8.26845 4.73482C8.28741 4.50941 8.61541 4.45241 8.7209 4.6562L9.28897 5.75334C9.32571 5.82443 9.40048 5.87195 9.48523 5.87808L10.7925 5.97291C11.0353 5.99051 11.0967 6.29499 10.8772 6.39294L9.69536 6.92027C9.61874 6.95445 9.56755 7.02385 9.56099 7.10247L9.45883 8.31606Z" fill="white" />
//                             <path d="M5.70599 9.1442C5.67434 9.25336 5.50749 9.25336 5.47583 9.1442L5.30536 8.55649C5.29435 8.51841 5.26227 8.48867 5.22127 8.47842L4.58821 8.32018C4.4706 8.29079 4.4706 8.13591 4.58821 8.10652L5.22127 7.94828C5.26227 7.93802 5.29435 7.90828 5.30536 7.87021L5.47583 7.28249C5.50749 7.17333 5.67434 7.17333 5.70599 7.28249L5.87646 7.87021C5.88747 7.90828 5.91951 7.93802 5.96055 7.94828L6.59362 8.10652C6.71122 8.13591 6.71122 8.29079 6.59362 8.32018L5.96055 8.47842C5.91951 8.48867 5.88747 8.51841 5.87646 8.55649L5.70599 9.1442Z" fill="white" />
//                             <path d="M7.88781 12.5199C7.85615 12.6291 7.68931 12.6291 7.65765 12.5199L7.48718 11.9322C7.47617 11.8941 7.44409 11.8644 7.40309 11.8541L6.77002 11.6959C6.65242 11.6665 6.65242 11.5116 6.77002 11.4822L7.40309 11.324C7.44409 11.3138 7.47617 11.284 7.48718 11.2459L7.65765 10.6582C7.68931 10.5491 7.85615 10.5491 7.88781 10.6582L8.05828 11.2459C8.06929 11.284 8.10132 11.3138 8.14237 11.324L8.77544 11.4822C8.89304 11.5116 8.89304 11.6665 8.77544 11.6959L8.14237 11.8541C8.10132 11.8644 8.06929 11.8941 8.05828 11.9322L7.88781 12.5199Z" fill="white" />
//                             <path d="M6.03127 11.1969C6.01016 11.2697 5.89893 11.2697 5.87783 11.1969L5.76418 10.8051C5.75684 10.7797 5.73545 10.7599 5.70812 10.7531L5.28608 10.6476C5.20767 10.628 5.20767 10.5247 5.28608 10.5052L5.70812 10.3997C5.73545 10.3928 5.75684 10.373 5.76418 10.3476L5.87783 9.9558C5.89893 9.88303 6.01016 9.88303 6.03127 9.9558L6.14491 10.3476C6.15225 10.373 6.17361 10.3928 6.20097 10.3997L6.62302 10.5052C6.70142 10.5247 6.70142 10.628 6.62302 10.6476L6.20097 10.7531C6.17361 10.7599 6.15225 10.7797 6.14491 10.8051L6.03127 11.1969Z" fill="white" />
//                             <path d="M11.1222 9.84666C11.1011 9.91944 10.9898 9.91944 10.9687 9.84666L10.8551 9.45485C10.8478 9.42947 10.8264 9.40964 10.799 9.40281L10.377 9.29731C10.2986 9.27772 10.2986 9.17447 10.377 9.15487L10.799 9.04938C10.8264 9.04254 10.8478 9.02272 10.8551 8.99733L10.9687 8.60552C10.9898 8.53275 11.1011 8.53275 11.1222 8.60552L11.2358 8.99733C11.2432 9.02272 11.2645 9.04254 11.2919 9.04938L11.7139 9.15487C11.7923 9.17447 11.7923 9.27772 11.7139 9.29731L11.2919 9.40281C11.2645 9.40964 11.2432 9.42947 11.2358 9.45485L11.1222 9.84666Z" fill="white" />
//                             <path d="M18.3182 18.003L17.5909 18.6782M8.15778 9.04228L19.9624 19.0877C20.2555 19.3371 20.2654 19.7629 19.9843 20.0239V20.0239C19.7043 20.2839 19.2496 20.2777 18.9805 20.008C14.9047 15.9231 7.72842 8.70747 8.15778 9.04228Z" stroke="white" />
//                         </svg>
//                     </div>
//                 </button>
//                 <p>
//                     By clicking TrimURL, I agree to the <strong> Terms of Service,<br /> Privacy Policy</strong> and Use of Cookies.
//                 </p>
//             </form>

//                 <div className="overlay">
//                     {shortenedUrl && 
//                     showContainer && (
//                         <div className="compressly-overlay">
//                             <div className="compressly-qrcode-container">
//                                 <div className="compressly-qrcode-close-btn">
//                                     <button onClick={handleCloseButton}>Close</button>
//                                 </div>
//                                 <p>{shortenedUrl}</p>
//                                 {showQRCodeGen && (
//                                 <div>
//                                     <Compressly value = {shortenedUrl} />
//                                     <div className="compressly-qrcode-btn">
//                                         <div className="compressly-qrcode-btn">
//                                             <button type="button" onClick={handleCopyClick}>
//                                                 Copy
//                                             </button>
//                                             {copied && <span className="compressly-copied-message">Copied!</span>}
//                                             <button type="button" onClick={handleShareClick}>
//                                                 Share
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//         </div>
//     )
//                             };


// export default Compressly;